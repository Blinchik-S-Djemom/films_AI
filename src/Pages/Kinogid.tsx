import React from "react";
import Chat from "../components/Chat";

const Kinogid: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Киногид</h1>
      <p>
        Задайте вопрос Киногиду и он поможет вам подобрать фильм по вашему
        описанию или состоянию
      </p>
      <Chat />
    </div>
  );
};

export default Kinogid;
