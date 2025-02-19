"use client";
import React from "react";
import { Space, Avatar, Card, Flex, Tag, Row, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import {
  EditOutlined,
  EllipsisOutlined,
  LoadingOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { categoryApi } from "@/api/category/category-api";
import { useQueries, useQuery } from "@tanstack/react-query";

type Props = {};

const CommunityCard = () => {
  const { Meta } = Card;
  return (
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
  );
};

const CategoryTags = (data: any) => {
  console.log(data);

  return (
    <React.Fragment>
      <Flex wrap>
        {data.map((node: any) => {
          return <Tag key={node.id}>{node.Name}</Tag>;
        })}
      </Flex>
    </React.Fragment>
  );
};

const CommunitySection = (props: Props) => {
  const [categories, setCategories] = React.useState([]);
  // const { data, error, isLoading, isSuccess } = useQueries({
  //   queryKey: ["categories", "projects"],
  //   queryFn: async () => {
  //     const [categoriesData] = await Promise.all([categoryApi.get()]);
  //     return { categories: categoriesData.data };
  //   },
  // });

  // React.useEffect(() => {
  //   console.log(data);
  //   if (isSuccess) {
  //   }
  // }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className=" flex justify-center space-y-3 w-[500px]">
          <Search size="large" width={100} spellCheck />
        </div>
      </div>
      <div className="flex justify-center">
        <Row className="m-4">
          {/* <CategoryTags categories={categories} /> */}
        </Row>
      </div>
      <Row>
        <CommunityCard />
      </Row>
    </div>
  );
};

export default CommunitySection;
