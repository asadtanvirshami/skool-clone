"use client";
import React, { useState, useRef } from "react";

const GRID_SIZE = 150; // Base grid size
const GRID_PADDING = 10; // Padding between notes
const DEFAULT_COLORS = ["#FFD700", "#FF5733", "#33FF57", "#337BFF", "#FF33C4"]; // Default colors
const NOTE_SIZES = {
  small: { width: 150, height: 150 },
  medium: { width: 200, height: 200 },
  large: { width: 220, height: 220 },
};

const StickyNotesGrid = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [hoveredGrid, setHoveredGrid] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const draggedNoteRef = useRef<string | null>(null);
  const getNextPosition = () => {
    let x = 0;
    let y = 0;

    while (notes.some((note) => note.x === x && note.y === y)) {
      x += GRID_SIZE + GRID_PADDING;
      if (x + GRID_SIZE > window.innerWidth - 50) {
        x = 0;
        y += GRID_SIZE + GRID_PADDING;
      }
    }

    return { x, y };
  };

  const addNote = () => {
    const { x, y } = getNextPosition();

    const newNote = {
      id: `note-${counter}`,
      content: "New Note",
      x,
      y,
      color: DEFAULT_COLORS[counter % DEFAULT_COLORS.length],
      size: "medium", // Default size
    };

    setNotes([...notes, newNote]);
    setCounter(counter + 1);
  };

  const deleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    noteId: string
  ) => {
    draggedNoteRef.current = noteId;
    e.dataTransfer.setData("text/plain", noteId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const gridRect = gridRef.current?.getBoundingClientRect();
    if (!gridRect) return;

    const gridX =
      Math.floor((e.clientX - gridRect.left) / GRID_SIZE) * GRID_SIZE;
    const gridY =
      Math.floor((e.clientY - gridRect.top) / GRID_SIZE) * GRID_SIZE;

    setHoveredGrid({ x: gridX, y: gridY });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedNoteRef.current || !hoveredGrid) return;

    let { x, y } = hoveredGrid;

    // Check if the target position is occupied, find the next available spot
    while (notes.some((note) => note.x === x && note.y === y)) {
      x += GRID_SIZE + GRID_PADDING;
      if (x + GRID_SIZE > window.innerWidth - 50) {
        x = 0;
        y += GRID_SIZE + GRID_PADDING;
      }
    }

    // Update the dragged note's position
    const updatedNotes = notes.map((note) =>
      note.id === draggedNoteRef.current ? { ...note, x, y } : note
    );

    setNotes(updatedNotes);
    setHoveredGrid(null);
    draggedNoteRef.current = null;
  };

  const handleColorChange = (noteId: string, color: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === noteId ? { ...note, color } : note))
    );
  };

  const handleSizeChange = (noteId: string, newSize: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, size: newSize } : note
      )
    );
  };

  return (
    <div
      ref={gridRef}
      className="p-4 h-screen relative "
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <button
        onClick={addNote}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow-md mb-4"
      >
        Add Note +
      </button>

      {hoveredGrid && (
        <div
          style={{
            position: "absolute",
            left: hoveredGrid.x,
            top: hoveredGrid.y,
            width: GRID_SIZE,
            height: GRID_SIZE,
            borderRadius: "8px",
            border: "2px dashed rgba(255, 215, 0, 0.7)",
            background: "rgba(255, 215, 0, 0.2)",
          }}
          className="transition-all duration-200"
        />
      )}

      {notes.map((note) => {
        const { width, height } = NOTE_SIZES[note.size];

        return (
          <div
            key={note.id}
            draggable
            onDragStart={(e) => handleDragStart(e, note.id)}
            style={{
              position: "absolute",
              left: note.x,
              top: note.y,
              width,
              height,
              backgroundColor: note.color,
            }}
            className="p-4 rounded-lg shadow-md flex flex-col cursor-move transition-all"
          >
            <textarea
              value={note.content}
              onChange={(e) => {
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, content: e.target.value } : n
                  )
                );
              }}
              className="flex-grow bg-transparent border-none resize-none focus:outline-none text-black"
            />

            {/* Color Picker */}
            <input
              type="color"
              value={note.color}
              onChange={(e) => handleColorChange(note.id, e.target.value)}
              className="w-full cursor-pointer"
            />

            {/* Size Selector */}
            <select
              value={note.size}
              onChange={(e) => handleSizeChange(note.id, e.target.value)}
              className="w-min mt-1 p-1 bg-white border border-gray-300 rounded cursor-pointer"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>

            <button
              onClick={() => deleteNote(note.id)}
              className="self-end text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default StickyNotesGrid;
