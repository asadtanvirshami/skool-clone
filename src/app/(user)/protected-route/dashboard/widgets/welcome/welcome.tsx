"use client";
import React from "react";
import { useSelector } from "react-redux";

// type Props = {};

const Welcome = () => {
  const user = useSelector(
    (state: { user: { user: { firstName: string; lastName: string } } }) =>
      state.user.user
  );
  return (
    <div className="w-full justify-center h-96 bg-yellow-600">
      <div className="text-7xl font-semibold p-4">
        <h1>Welcome, </h1>
        <h1>{user?.firstName + " " + user?.lastName}</h1>
      </div>
    </div>
  );
};

export default Welcome;
