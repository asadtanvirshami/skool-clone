import React from "react";

const TranslucentCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      <div className="trasparent-bg-card bg-opacity-50 backdrop-blur-lg p-6 rounded-lg">
        {children}
        {/* <p className="text-gray-400">Properties Visits</p>
        <p className="text-2xl font-bold">721K</p> */}
      </div>
    </div>
  );
};

export default TranslucentCard;
