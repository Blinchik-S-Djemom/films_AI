import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Button, Card, Spin, Typography, Space } from "antd";
import photobase64 from "../Utulites/PhotoEditor";
import fetchGeminiResponse from "../components/Screens";

const { Dragger } = Upload;
const { Text, Paragraph } = Typography;

const Screen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      console.log(file);
      setSelectedFile(file);
      setSearchResult(null);
      setShowResult(false);
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
    setShowResult(false);
    setSearchResult(null);

    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });

      const result = await fetchGeminiResponse(base64);
      setSearchResult(result);
      setShowResult(true);
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Произошла ошибка при поиске");
      setSearchResult(
        "Не удалось найти информацию о фильме. Попробуйте еще раз."
      );
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSearchResult(null);
    setShowResult(false);
    message.success("Поля сброшены");
  };

  return (
    <div className="page-container">
      <h1 style={{ color: "White" }}>🎬🎞️Поиск по скриншоту🎞️🎬</h1>
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

      {selectedFile && !showResult && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text type="secondary">Выбран файл: {selectedFile.name}</Text>
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Space>
          <Button
            type="primary"
            size="large"
            onClick={handleSearch}
            loading={loading}
            disabled={!selectedFile}
          >
            {loading ? "Идет поиск..." : "Начать поиск"}
          </Button>

          <Button
            type="default"
            size="large"
            onClick={handleReset}
            disabled={!selectedFile && !searchResult}
          >
            Сбросить
          </Button>
        </Space>
      </div>

      {loading && (
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16 }}>
            Идет поиск информации о фильме...
          </Paragraph>
        </div>
      )}

      {showResult && searchResult && (
        <Card
          title={
            <Space>
              <span role="img" aria-label="movie">
                🎬
              </span>
              <span>Результат поиска</span>
            </Space>
          }
          style={{ marginTop: 32 }}
          extra={
            <Button type="link" onClick={() => setShowResult(false)}>
              Скрыть
            </Button>
          }
        >
          <div style={{ padding: 16 }}>
            <Paragraph style={{ fontSize: 16, whiteSpace: "pre-line" }}>
              {searchResult}
            </Paragraph>
          </div>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Button type="primary" onClick={handleReset} size="middle">
              Новый поиск
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Screen;
