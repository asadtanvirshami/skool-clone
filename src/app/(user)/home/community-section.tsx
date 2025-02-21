"use client";
import React from "react";
import {
  Space,
  Avatar,
  Card,
  Flex,
  Tag,
  Row,
  Skeleton,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import {
  EditOutlined,
  EllipsisOutlined,
  LoadingOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { categoryApi } from "@/api/category/category-api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { communityApi } from "@/api/community/community-api";

type Props = {};

const CommunityCard = ({ communities }: any) => {
  console.log(communities);

  const { Meta } = Card;
  return (
    <React.Fragment>
      {communities.map((node: any) => {
        return (
          <Card
            key={node?.id}
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <Typography>{node?.members}</Typography>,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={node?.name}
              description={node?.about}
            />
          </Card>
        );
      })}
    </React.Fragment>
  );
};

const CategoryTags = ({ categories }: any) => {
  return (
    <React.Fragment>
      <Flex wrap>
        {categories.map((node: any) => {
          return <Tag key={node.id}>{node.name}</Tag>;
        })}
      </Flex>
    </React.Fragment>
  );
};

const CommunitySection = (props: Props) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => categoryApi.get(),
      },
      {
        queryKey: ["communities"],
        queryFn: () => communityApi.get(),
      },
    ],
  });

  const [categoriesQuery, communitiesQuery] = queries;
  const [categories, setCategories] = React.useState(
    categoriesQuery?.data || []
  );
  const [communities, setCommunities] = React.useState(
    communitiesQuery?.data || []
  );

  return (
    <div>
      <div className="flex justify-center">
        <div className=" flex justify-center space-y-3 w-[500px]">
          <Search size="large" width={100} spellCheck />
        </div>
      </div>
      <div className="flex justify-center">
        <Row className="m-4">
          <CategoryTags categories={categories} />
        </Row>
      </div>
      <Row>
        <CommunityCard communities={communities} />
      </Row>
    </div>
  );
};

export default CommunitySection;
