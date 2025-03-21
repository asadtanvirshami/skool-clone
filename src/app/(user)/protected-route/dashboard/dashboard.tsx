import React from "react";
import StickyNotesGrid from "./widgets/sticky-notes/sticky-note-grid";
import TodoListWidget from "./widgets/todo-list/todo-list";
import Welcome from "./widgets/welcome/welcome";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="w-full justify-center h-96 bg-yellow-600">
        <Welcome />
      </div>
      <div className="font-[family-name:var(--font-gantari)] gap-4  h-screen p-12 flex justify-center w-full">
        <div className="w-full justify-center  ">
          <StickyNotesGrid limit={5} />
        </div>
        <div className="w-full justify-center  ">
          <TodoListWidget />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
