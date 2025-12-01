import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Button } from "antd";
import photobase64 from "../Utulites/PhotoEditor";
import fetchGeminiResponse from "../components/Screens";

const { Dragger } = Upload;

const Screen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      console.log(file);
      setSelectedFile(file);
      photobase64(file);
      return false;
    },
  };

  const handleSearch = async () => {
    if (!selectedFile) {
      message.warning("Пожалуйста, сначала выберите файл");
      return;
    }

    setLoading(true);
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });

      const result = await fetchGeminiResponse(base64);
      message.success(`Найдено: ${result}`);
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Произошла ошибка при поиске");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>🎬🎞️Поиск по скриншоту🎞️🎬</h1>
      <p>Загрузите фото фрагремта для поиска фильма или сериала</p>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Нажмите или перетащите фото для загрузки
        </p>
        <p className="ant-upload-hint">
          Добавьте сюда фото или скрин нужного фильма, что бы мы помогли Вам
          скорее приступить к его просмотру
        </p>
      </Dragger>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Button
          type="primary"
          size="large"
          onClick={handleSearch}
          loading={loading}
        >
          {loading ? "Идет поиск..." : "Начать поиск"}
        </Button>
      </div>
    </div>
  );
};

export default Screen;
