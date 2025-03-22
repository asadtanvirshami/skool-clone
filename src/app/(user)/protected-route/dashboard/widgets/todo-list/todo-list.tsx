import TranslucentCard from "@/components/ui/translucent-card";
import { Space, Table } from "antd";
import React from "react";

const TodoListWidget = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <React.Fragment>
      <TranslucentCard>
        <div className="m-auto">
          <Space className="space-y-3">
            <h1 className="text-xl mb-2">Todo</h1>
          </Space>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </TranslucentCard>
    </React.Fragment>
  );
};

export default TodoListWidget;
