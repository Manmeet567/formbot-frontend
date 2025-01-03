import React, { useState } from "react";
import "./DynamicInput.css";
import { IoSend } from "react-icons/io5";

function DynamicInput({ type, placeholder, onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState(null); // Initialize as null so no rating is selected initially
  const [isValid, setIsValid] = useState(true);

  const validateInput = (value) => {
    if (type === "Email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    } else if (type === "Number") {
      return !isNaN(value);
    } else if (type === "Phone") {
      const phonePattern = /^[0-9]+$/;
      return phonePattern.test(value);
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateInput(inputValue) && inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  if (type === "Rating") {
    return (
      <div className="rating-input">
        <div className="ri-box">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`circle ${rating === num ? "selected" : ""}`}
              onClick={() => handleRatingClick(num)}
            >
              {num}
            </div>
          ))}
        </div>
        <button
          disabled={rating !== null ? false : true}
          onClick={() => onSubmit(rating)}
          className="send-button"
        >
          <IoSend style={{ fontSize: "30px" }} />
        </button>
      </div>
    );
  }

  return (
    <div className="input-container">
      <input
        type={type === "Phone" ? "tel" : type}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsValid(true);
        }}
        className={isValid ? "" : "invalid-input"}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <button onClick={handleSubmit} className="send-button">
        <IoSend style={{ fontSize: "30px" }} />
      </button>
      {!isValid && <div className="error-message">Invalid input</div>}
    </div>
  );
}

export default DynamicInput;
