import React, { useState, useEffect } from "react";
import "./MainResponse.css";
import botLogo from "../../assets/bot-logo.png";
import DynamicInput from "./DynamicInput"; // Import the new component

function MainResponse({ formFlow, handleSubmitAndUpdateResponse }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputCount, setInputCount] = useState(0);

  useEffect(() => {
    if (responses.length === 0) return;

    const newInputCount = responses.filter(
      (res) => res.type === "input"
    ).length;

    if (newInputCount > inputCount) {
      handleSubmitAndUpdateResponse(responses);

      setInputCount(newInputCount);
    }
  }, [responses, inputCount]);

  const handleResponseSubmit = (response) => {
    const inputField = formFlow[currentIndex];

    setResponses((prev) => {
      const updatedResponses = [...prev];
      updatedResponses[currentIndex] = {
        ...inputField,
        fieldValue: response || null,
      };
      return updatedResponses;
    });

    setChatHistory((prev) => [...prev, { type: "user", value: response }]);

    setCurrentIndex((prev) => prev + 1);
  };

  const renderCurrentStep = () => {
    const currentItem = formFlow[currentIndex];

    if (!currentItem) return null;

    if (currentItem.type === "bubble") {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          value: currentItem.fieldValue,
          field: currentItem.field,
        },
      ]);

      setResponses((prev) => [
        ...prev,
        {
          ...currentItem,
        },
      ]);

      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (formFlow) {
      renderCurrentStep(); // Render the current step
    }
  }, [currentIndex, formFlow]);

  const renderChatHistory = () => {
    return chatHistory.map((item, index) => {
      if (item.type === "bot") {
        if (item.field === "Text") {
          // For text bubbles
          return (
            <div key={index} className="bot-bubble">
              <div className="cb-img">
                <img src={botLogo} alt="" />
              </div>
              <div className="cb-message">{item.value}</div>
            </div>
          );
        } else if (item.field === "Image") {
          return (
            <div key={index} className="bot-bubble">
              <div className="cb-img">
                <img src={botLogo} alt="" />
              </div>
              <div className="cb-image">
                <img src={item.value} alt="" />
              </div>
            </div>
          );
        }
      } else if (item.type === "user") {
        return (
          <div key={index} className="user-bubble">
            <div className="ub-message">{item.value}</div>
          </div>
        );
      }
      return null;
    });
  };

  const isSubmitStep =
    currentIndex === formFlow?.length - 1 &&
    formFlow[currentIndex].field === "Button";

  const handleSubmitResponses = () => {
    const completeResponses = formFlow.map((inputField, index) => {
      const response = responses.find((res) => res.field === inputField.field);
      return response || { ...inputField, fieldValue: null };
    });

    console.log("Complete Responses: ", completeResponses);
  };

  return (
    <div className="main-response">
      <div className="chat-history">
        {renderChatHistory()}
        {formFlow &&
          formFlow[currentIndex] &&
          formFlow[currentIndex].type === "input" &&
          !isSubmitStep && (
            <div className="input-wrapper">
              <DynamicInput
                type={formFlow[currentIndex]?.field}
                placeholder={`Type your ${formFlow[currentIndex]?.field}`}
                onSubmit={handleResponseSubmit}
                handleSubmitAndUpdateResponse={handleSubmitAndUpdateResponse}
              />
            </div>
          )}
        {isSubmitStep && (
          <button className="submit-button" onClick={handleSubmitResponses}>
            {formFlow[currentIndex].fieldValue}
          </button>
        )}
      </div>
    </div>
  );
}

export default MainResponse;
