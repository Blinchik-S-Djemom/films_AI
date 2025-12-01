import React, { useState } from "react";
import { Button, ConfigProvider, Space, Checkbox } from "antd";
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

  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedOptions(checkedValues);
    console.log(checkedValues);
    ansver[count] = start[count] + checkedValues;
    console.log(ansver);
  };

  /*function QuisQuest() {
    const Test = Quiz.map((Question) => <li>{Question.title}</li>);
    return <ul>{Test}</ul>;
  }*/

  const [count, setCount] = useState(-1);

  const increaseNumber = () => {
    setCount(count + 1);
  };

  const decreaseNumber = () => {
    setCount(count - 1);
  };

  const mama = async () => {
    const result = await Testansvere();
    message.success(`Найдено: ${result}`);
  };

  if (count === -1) {
    return (
      <div className="page-container">
        <h1>🎥🎟️🍿Тест🍿🎟️🎥</h1>
        <p>Пройдите тест для того, что бы подобрать ИДЕАЛЬНЫЙ фильм для себя</p>
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
      <Button type="primary" size="large" onClick={mama}></Button>
    </div>
  );
};

export default Test;
