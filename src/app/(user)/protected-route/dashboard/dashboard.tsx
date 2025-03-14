import React from "react";
import StickyNotesGrid from "./widgets/sticky-notes/sticky-note-grid";
import { Col } from "antd";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="font-[family-name:var(--font-gantari)]  p-12 flex justify-center w-full">
      <div className="w-full justify-center ">
        <StickyNotesGrid />
      </div>
    </div>
  );
};

export default Dashboard;
