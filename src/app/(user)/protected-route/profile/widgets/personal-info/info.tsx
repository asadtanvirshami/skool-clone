"use client";
import { userApi } from "@/api/user/user-api";
import ProfilePicture from "@/components/ui/upload-pfp";
import { useQuery } from "@tanstack/react-query";
import {
  Input,
  Button,
  Form,
  Row,
  Divider,
  Col,
  Typography,
  Card,
  Skeleton,
  Select,
} from "antd";
import React from "react";

const { TextArea } = Input;

const mbti_types = [
  { value: "ISTJ", label: "The Logistician" },
  { value: "ISFJ", label: "The Defender" },
  { value: "INFJ", label: "The Advocate" },
  { value: "INTJ", label: "The Architect" },
  { value: "ISTP", label: "The Virtuoso" },
  { value: "ISFP", label: "The Adventurer" },
  { value: "INFP", label: "The Mediator" },
  { value: "INTP", label: "The Logician" },
  { value: "ESTP", label: "The Entrepreneur" },
  { value: "ESFP", label: "The Entertainer" },
  { value: "ENFP", label: "The Campaigner" },
  { value: "ENTP", label: "The Debater" },
  { value: "ESTJ", label: "The Executive" },
  { value: "ESFJ", label: "The Consul" },
  { value: "ENFJ", label: "The Protagonist" },
  { value: "ENTJ", label: "The Commander" },
];

const PersonalInfo = ({ user_id }: { user_id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", user_id || null],
    queryFn: () => userApi.findOne(user_id),
  });
  const [form] = Form.useForm();
  const [edit, setEdit] = React.useState(false);

  console.log(isLoading);

  const onFinish = (values: any) => {
    console.log(values);
  };
  console.log(data);

  React.useEffect(() => {
    form.setFieldsValue(data?.data?.user);
  }, [data?.data?.user]);

  return (
    <div className=" pt-0 p-24">
      <Card className="w-full !border-none !shadow-lg">
        <Row className="flex justify-between items-center">
          <Skeleton avatar loading={isLoading}>
            <Col className="flex space-x-3 items-center ">
              <ProfilePicture image={data?.data?.user?.profile_picture} />
              <Col>
                <Typography>
                  {data?.data?.user?.firstName} {data?.data?.user?.lastName}
                </Typography>
                <Typography>{data?.data?.user?.email}</Typography>
              </Col>
            </Col>
          </Skeleton>
          <Col>
            <Button
              className={`${
                edit ? "!bg-green-500" : "!bg-red-500"
              } !text-white !border-none`}
              onClick={() => setEdit((prev) => !prev)}
            >
              Edit Profile
            </Button>
          </Col>
        </Row>

        <Form
          layout={"vertical"}
          form={form}
          initialValues={{ layout: "vertical" }}
          onFinish={onFinish}
          size="large"
          onLoadedData={() =>
            form.setFieldsValue({ firstName: data?.firstName })
          }
          disabled={edit ? false : true}
        >
          <Divider orientation="left">Personal Information</Divider>
          {/* Row-1 */}
          <Skeleton loading={isLoading}>
            <div className="grid grid-cols-2 space-x-5">
              <Form.Item name={"firstName"} label="Last name">
                <Input name="firstName" placeholder="First name" />
              </Form.Item>
              <Form.Item name={"lastName"} label="First name">
                <Input placeholder="Last name" />
              </Form.Item>
            </div>
          </Skeleton>
          {/* Row-2 */}
          <Skeleton loading={isLoading}>
            <div className="grid grid-cols-2 space-x-5">
              <Form.Item name={"myersBrigs"} label="Myers Brigs">
                <Select placeholder="Myers Briggs" options={mbti_types} />
              </Form.Item>
              <Form.Item label="Pronouns">
                <Input placeholder="he/him" />
              </Form.Item>{" "}
            </div>
          </Skeleton>
          {/* Row-3 */}
          <Skeleton loading={isLoading}>
            <Form.Item name={"bio"} label="Bio">
              <TextArea rows={4} placeholder="Write your bio..." />
            </Form.Item>
          </Skeleton>
          {/* Row-4 */}
          <Divider orientation="left">Account Security</Divider>
          <Skeleton loading={isLoading}>
            <div className="grid grid-cols-2 space-x-5">
              <Form.Item
                name={"email"}
                rules={[{ required: true }]}
                label="Email"
              >
                <Input type="email" placeholder="xyz@gmail" />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} label="Password">
                <Input.Password placeholder="********" minLength={8} />
              </Form.Item>
            </div>
          </Skeleton>
          <div className="float-right">
            {edit && (
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="!bg-green-500 !text-white !border-none"
                >
                  Save
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PersonalInfo;
