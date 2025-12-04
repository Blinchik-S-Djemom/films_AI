import React, { useState } from "react";
import {
  Button,
  ConfigProvider,
  Space,
  Checkbox,
  Card,
  Spin,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { Quiz } from "../components/questions";
import "./Styles/Test.css";
import { ansver } from "../components/questions";
import { start } from "../components/questions";
import Testansver from "../components/TestLama";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
  checkboxGroup: css`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
}));

const Test: React.FC = () => {
  const { styles } = useStyle();

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [count, setCount] = useState(-1);

  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedOptions(checkedValues);
    console.log(checkedValues);
    ansver[count] = start[count] + checkedValues;
    console.log(ansver);
  };

  const increaseNumber = () => {
    setCount(count + 1);
  };

  const decreaseNumber = () => {
    setCount(count - 1);
  };

  const mama = async () => {
    setLoading(true);
    setResult(null);
    setShowResult(false);

    try {
      const movieResult = await Testansver(ansver.join(""));
      setResult(movieResult);
      setShowResult(true);
    } catch (error) {
      console.error("Ошибка:", error);
      setResult(
        "Произошла ошибка при подборе фильма. Пожалуйста, попробуйте еще раз."
      );
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCount(-1);
    setSelectedOptions([]);
    setResult(null);
    setShowResult(false);
  };

  if (count === -1) {
    return (
      <div className="page-container">
        <h1>🎥🎟️🍿Тест🍿🎟️🎥</h1>
        <p>Пройдите тест для того, что бы подобрать ИДЕАЛЬНЫЙ фильм для себя</p>

        {showResult && result ? (
          <Card
            title="Результат подбора фильма"
            style={{ marginTop: 20, maxWidth: 800, margin: "0 auto" }}
            extra={
              <Button type="link" onClick={handleReset}>
                Пройти тест заново
              </Button>
            }
          >
            <Typography.Paragraph style={{ fontSize: 16 }}>
              {result}
            </Typography.Paragraph>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Button type="primary" onClick={handleReset}>
                Начать новый тест
              </Button>
            </div>
          </Card>
        ) : (
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Space>
              <Button type="primary" size="large" onClick={increaseNumber}>
                Начать тест!
              </Button>
            </Space>
          </ConfigProvider>
        )}
      </div>
    );
  }

  if (count <= Quiz.length - 1) {
    return (
      <div className="page-container">
        <h1>🎥🎟️🍿Тест🍿🎟️🎥</h1>
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        ></ConfigProvider>
        <h2>{Quiz[count].title}</h2>
        <div className={styles.checkboxGroup}>
          <Checkbox.Group
            options={Quiz[count].quest}
            value={selectedOptions}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="buttons">
          <button className="button minus" onClick={decreaseNumber}>
            Вернуться к предыдущему вопросу
          </button>
          <button className="button plus" onClick={increaseNumber}>
            Далее
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>🎥🎟️🍿Тест🍿🎟️🎥</h1>

      {showResult && result ? (
        <Card
          title="Ваш идеальный фильм найден! 🎬"
          style={{ marginTop: 20, maxWidth: 800, margin: "0 auto" }}
        >
          <Typography.Paragraph style={{ fontSize: 18, lineHeight: 1.6 }}>
            {result}
          </Typography.Paragraph>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Space>
              <Button type="primary" onClick={handleReset}>
                Пройти тест заново
              </Button>
              <Button type="link" onClick={() => setShowResult(false)}>
                Хочу другой
              </Button>
            </Space>
          </div>
        </Card>
      ) : (
        <>
          {loading ? (
            <div style={{ textAlign: "center", margin: "40px 0" }}>
              <Spin size="large" />
              <Typography.Paragraph style={{ marginTop: 20 }}>
                Идет подбор идеального фильма...
              </Typography.Paragraph>
            </div>
          ) : (
            <Button type="primary" size="large" onClick={mama}>
              Подобрать идеальный фильм
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
