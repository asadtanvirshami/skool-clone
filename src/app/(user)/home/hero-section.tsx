import { CompassOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import React from "react";

const Description = () => {
  return (
    <article className="text-md text-white md:text-xl lg:text-xl font-semi-bold">
      Discover communities or create your own. Build to support your community.
    </article>
  );
};
const WelcomeTitle = () => {
  return (
    <div>
      <h1 className="text-xl text-white md:text-3xl lg:text-4xl font-bold">
        Discover Communities
      </h1>
      <Description />
      <Space className="mt-4">
        <DiscoverButton />
      </Space>
    </div>
  );
};

const DiscoverButton = () => {
  return (
    <Button
      variant="solid"
      color="green"
      shape="round"
      size="large"
      iconPosition="end"
      icon={<CompassOutlined />}
    >
      Discover
    </Button>
  );
};

const CardStack = () => {
  return (
    <div className="flex justify-center items-center  min-w-full">
      <div className="flex relative">
        <div className="w-72 h-40 bg-green-400 transform transition-all skew-x-12 -skew-y-12 absolute rounded-lg"></div>
        <div className="w-72 h-40 bg-yellow-400 transform transition-all skew-x-12 -skew-y-12 absolute -top-4 -left-4 rounded-lg"></div>
        <div className="w-72 h-40 bg-red-400 transform transition-all skew-x-12 -skew-y-12 absolute -top-8 -left-8 rounded-lg"></div>
        <div className="w-72 h-40 bg-black transform transition-all skew-x-12 -skew-y-12 absolute -top-12 -left-12 rounded-lg"></div>
        <div className="w-72 h-40 bg-purple-400 transform transition-all skew-x-12 -skew-y-12 absolute -top-16 -left-16 rounded-lg"></div>
        <div className="w-72 h-40 bg-white flex justify-center items-center border-2 border-black transform transition-all skew-x-12 -skew-y-12 absolute -top-20 -left-20 rounded-lg">
          <div className="text-2xl">
            Build to support <HeartFilled style={{ color: "red" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="w-full  flex min-h-[40rem]  bg-contain bg-repeat-y bg-right bg-green-300 p-6 bg-[url('@/assets/images/community.jpg')]">
      <Row gutter={[16, 16]} align="middle" justify="center">
        <Col xs={24} md={24}>
          <WelcomeTitle />
        </Col>
        <Col xs={24} md={24}>
          <CardStack />
        </Col>
      </Row>
    </div>
  );
};

export default HeroSection;
