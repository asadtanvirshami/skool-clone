import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Flex, message, Upload } from "antd";
import Image from "next/image";
import type { GetProp, UploadProps } from "antd";
import { fileApi } from "@/api/upload/upload.api";
import { useSelector } from "react-redux";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ProfilePicture = ({ image }: { image?: string }) => {
  console.log(image);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(image || "");
  const user = useSelector(
    (state: { user: { user: { sub: string } } }) => state.user.user
  );

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const response = fileApi.upload(
        user?.sub,
        info.file.originFileObj as FileType
      );
      console.log(response);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  return (
    <Flex gap="middle" wrap>
      {!imageUrl ? (
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          maxCount={1}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      ) : (
        <Upload
          name="avatar"
          listType="picture"
          showUploadList={false}
          maxCount={1}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          className="!cursor-pointer"
        >
          <Avatar
            src={imageUrl}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          />
        </Upload>
      )}
    </Flex>
  );
};

export default ProfilePicture;
