"use client";
import React from "react";
import { Space, Avatar, Card } from "antd";
import Search from "antd/es/input/Search";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type Props = {};

const CommunitySection = (props: Props) => {
  const { Meta } = Card;
  return (
    <React.Fragment>
      <Space className="w-[100%] flex justify-center">
        <Search size="large" width={500} spellCheck />
      </Space>
      <Space>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Brotherhood "
            description="This is the description"
          />
        </Card>
      </Space>
    </React.Fragment>
  );
};

export default CommunitySection;
