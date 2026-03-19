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
  testContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    text-align: center;
  `,
  checkboxGroup: css`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 800px;

    /* Стили для текста чекбоксов */
    .ant-checkbox-wrapper {
      color: white !important;
      font-size: 18px;
      padding: 16px 24px;
      border-radius: 12px;
      transition: all 0.3s ease;
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid transparent;
      width: 100%;
      max-width: 600px;
      margin: 8px 0;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #04befe;
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(4, 190, 254, 0.2);
      }

      &:hover .ant-checkbox-inner {
        border-color: #04befe;
      }
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #04befe;
      border-color: #04befe;
    }

    .ant-checkbox + span {
      color: white !important;
      padding-left: 16px;
      font-weight: 500;
    }

    .ant-checkbox-inner {
      width: 24px;
      height: 24px;

      &::after {
        width: 8px;
        height: 12px;
      }
    }
  `,
  questionCard: css`
    background: linear-gradient(
      135deg,
      rgba(98, 83, 225, 0.1),
      rgba(4, 190, 254, 0.1)
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 40px;
    margin: 30px 0;
    max-width: 900px;
    width: 100%;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  `,
  questionTitle: css`
    color: white;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 40px;
    background: linear-gradient(135deg, #ffffff, #04befe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.4;
    padding: 0 20px;
  `,
  buttonContainer: css`
    display: flex;
    gap: 20px;
    margin-top: 40px;
    justify-content: center;
    flex-wrap: wrap;
  `,
  navigationButton: css`
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 12px;
    transition: all 0.3s ease;
    min-width: 250px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }
  `,
  title: css`
    color: white;
    text-align: center;
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #6253e1, #04befe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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
        <h1 style={{ color: "White" }}>🎥🎟️🍿Тест🍿🎟️🎥</h1>
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
      <div className={styles.testContainer}>
        <h1>🍿 Тест по подбору фильма 🍿</h1>

        <div className={styles.questionCard}>
          <h2 className={styles.questionTitle}>{Quiz[count].title}</h2>

          <div className={styles.checkboxGroup}>
            <Checkbox.Group
              options={Quiz[count].quest}
              value={selectedOptions}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button
              className={styles.navigationButton}
              onClick={decreaseNumber}
              size="large"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
              }}
            >
              ← Вернуться назад
            </Button>
            <Button
              className={styles.navigationButton}
              type="primary"
              onClick={increaseNumber}
              size="large"
            >
              Далее →
            </Button>
          </div>

          <div
            style={{
              marginTop: 30,
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: 16,
            }}
          >
            Вопрос {count + 1} из {Quiz.length}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.testContainer}>
      <h1>🍿 Тест по подбору фильма 🍿</h1>

      {showResult && result ? (
        <Card
          title={
            <span style={{ color: "white" }}>
              🎬 Ваш идеальный фильм найден!
            </span>
          }
          style={{
            marginTop: 20,
            maxWidth: 800,
            width: "100%",
            background:
              "linear-gradient(135deg, rgba(98, 83, 225, 0.1), rgba(4, 190, 254, 0.1))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography.Paragraph
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              color: "white",
              padding: "20px 0",
            }}
          >
            {result}
          </Typography.Paragraph>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Space wrap style={{ justifyContent: "center", gap: 15 }}>
              <Button
                type="primary"
                onClick={handleReset}
                size="large"
                style={{ padding: "12px 40px" }}
              >
                Пройти тест заново
              </Button>
              <Button
                type="default"
                onClick={() => setShowResult(false)}
                size="large"
                style={{
                  padding: "12px 40px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              >
                Хочу другой фильм
              </Button>
            </Space>
          </div>
        </Card>
      ) : (
        <>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                margin: "60px 0",
                padding: "60px 40px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                maxWidth: 600,
                width: "100%",
              }}
            >
              <Spin size="large" />
              <Typography.Paragraph
                style={{
                  marginTop: 30,
                  color: "white",
                  fontSize: 20,
                }}
              >
                Идет подбор идеального фильма...
              </Typography.Paragraph>
              <Typography.Paragraph
                style={{
                  marginTop: 10,
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 16,
                }}
              >
                Анализируем ваши ответы
              </Typography.Paragraph>
            </div>
          ) : (
            <div
              style={{
                padding: "60px 40px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                maxWidth: 600,
                width: "100%",
                textAlign: "center",
              }}
            >
              <Typography.Paragraph
                style={{
                  color: "white",
                  fontSize: 20,
                  marginBottom: 30,
                }}
              >
                Вы ответили на все вопросы! 🎉
              </Typography.Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={mama}
                style={{
                  padding: "16px 50px",
                  fontSize: 18,
                  borderRadius: 12,
                }}
              >
                Подобрать идеальный фильм
              </Button>
              <div style={{ marginTop: 30 }}>
                <Button
                  type="link"
                  onClick={() => setCount(Quiz.length - 1)}
                  style={{ color: "#04befe" }}
                >
                  Вернуться к последнему вопросу
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
