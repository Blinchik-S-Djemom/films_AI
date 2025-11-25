import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import ollama from "ollama";
import photobase64 from "../Utulites/PhotoEditor";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  beforeUpload(file) {
    console.log(file);
    photobase64(file);
    return false;
  },
};

const Screen: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Поиск по скриншоту</h1>
      <p>Загрузите фото фрагремта для поиска фильма или сериала</p>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Нажмите или перетащите фото для загрузки
        </p>
        <p className="ant-upload-hint">
          Добавте сюда фото или скрин нужного фильма, что бы мы помогли Вам
          скорее приступить к его просмотру
        </p>
      </Dragger>
    </div>
  );
};

export default Screen;
