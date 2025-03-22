"use client";
import { EllipsisVertical, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { Checkbox, ColorPicker, Dropdown, Popconfirm, Radio } from "antd";
import type { MenuProps } from "antd";
import moment from "moment";
const GRID_SIZE = 150; // Base grid size
const GRID_PADDING = 10; // Padding between notes
const DEFAULT_COLORS = ["#FFD700", "#FF5733", "#33FF57", "#337BFF", "#FF33C4"]; // Default colors
const NOTE_SIZES = {
  small: { width: 150, height: 150 },
  medium: { width: 200, height: 200 },
  large: { width: 220, height: 220 },
};

const StickyNotesGrid = ({ limit }: { limit: number }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);
  const [hoveredGrid, setHoveredGrid] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [noteSettings, setNoteSettings] = useState<any | null>({
    size: "medium",
    layout: "none",
  });

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
    if (notes.length >= limit) return;
    const { x, y } = getNextPosition();

    const newNote = {
      id: `note-${counter}`,
      content: "New Note",
      x,
      y,
      color: DEFAULT_COLORS[counter % DEFAULT_COLORS.length],
      size: noteSettings.size,
      layout: noteSettings.layout,
      date: moment().format("MMMM Do YYYY"),
      time: moment().format("h:mm a"),
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

  return (
    <React.Fragment>
      <button
        onClick={addNote}
        disabled={notes.length >= limit}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow-md mb-4"
      >
        Add Note +
      </button>
      <div
        ref={gridRef}
        className="p-4 h-[400px] overflow-hidden relative shadow-lg rounded-md"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
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
              className="p-4 rounded-lg shadow-md flex flex-col cursor-move transition-all "
            >
              <StickyHeader
                note={note}
                setNoteSettings={setNoteSettings}
                setNotes={setNotes}
                deleteNote={deleteNote}
              />
              <textarea
                value={note.content}
                onChange={(e) => {
                  setNotes((prevNotes) =>
                    prevNotes.map((n) =>
                      n.id === note.id ? { ...n, content: e.target.value } : n
                    )
                  );
                }}
                className="flex-grow bg-transparent border-none resize-none font-[family-name:var(--font-excali)] focus:outline-none text-black"
              />
              <div className="flex justify-end">
                {note.time && (
                  <span className="text-black font-sans text-[11.8px]">
                    {(note.layout === "TimeOnly" || note.layout === "Both") &&
                      `${note.time}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default StickyNotesGrid;

import type { ColorPickerProps, GetProp } from "antd";
type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  string | { cleared: any }
>;
const StickyHeader = ({
  note,
  deleteNote,
  setNotes,
  setNoteSettings,
}: {
  note: any;
  setNotes: React.Dispatch<React.SetStateAction<any[]>>;
  deleteNote: (id: string) => void;
  setNoteSettings: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [openOption, setOpenOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [colorValue, setColorValue] = useState<Color>(note.color);
  const plainOptions = ["TimeOnly", "DateOnly", "Both", "None"];

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
    setNoteSettings((note) => ({ ...note, size: newSize }));
  };

  const handleLayoutChange = (noteId: string, newLayout: Array<string>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              layout: newLayout[0],
            }
          : note
      )
    );
    setNoteSettings((note) => ({ ...note, layout: newLayout[0] }));
  };

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    deleteNote(note.id);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Color",
      children: [
        {
          key: "1-1",
          label: (
            <ColorPicker
              value={note.color}
              onChange={(color) =>
                handleColorChange(note.id, color.toHexString())
              }
              className="w-full cursor-pointer"
            />
          ),
        },
      ],
    },
    {
      key: "2",
      label: "Canvas Size",
      children: [
        {
          key: "2-1",
          label: (
            <Radio.Group
              value={note.size}
              style={{ flex: 1, display: "block" }}
              onChange={(e) => handleSizeChange(note.id, e.target.value)}
              options={[
                { value: "small", label: "small" },
                { value: "medium", label: "medium" },
                { value: "large", label: "large" },
              ]}
            />
          ),
        },
      ],
    },
    {
      key: "3",
      label: "Layout",
      children: [
        {
          key: "3 -1",
          label: (
            <Checkbox.Group
              value={note.layout}
              style={{ flex: 1, width: "20%" }}
              onChange={(e) =>
                handleLayoutChange(
                  note.id,
                  e.map((x) => x)
                )
              }
              options={plainOptions}
            />
          ),
        },
      ],
    },
  ];

  return (
    <div className="flex justify-between items-center ">
      <div>
        {note.date && (
          <span className="text-black font-sans text-[11.8px]">
            {(note.layout === "DateOnly" || note.layout === "Both") &&
              `${note.date}`}
          </span>
        )}
      </div>

      <div>
        <Popconfirm
          title="Are you sure to delete this note?"
          open={open}
          onConfirm={handleOk}
          okButtonProps={{ loading: confirmLoading, color: "danger" }}
          onCancel={handleCancel}
        >
          <button className="w-fit" onClick={showPopconfirm}>
            <X size={14} className="text-gray-600 hover:text-red-500" />
          </button>
        </Popconfirm>
        <Dropdown
          open={openOption}
          onOpenChange={() => setOpenOption(!openOption)}
          menu={{ items }}
          placement="bottom"
          trigger={["click"]}
          destroyPopupOnHide
        >
          <button>
            <EllipsisVertical size={14} className="text-gray-600" />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};
