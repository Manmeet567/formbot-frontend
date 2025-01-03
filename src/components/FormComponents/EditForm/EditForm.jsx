import React, { useEffect } from "react";
import { FiMessageSquare, FiCalendar, FiTrash2 } from "react-icons/fi";
import { IoImageOutline, IoFilmOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { ImFlag } from "react-icons/im";
import { BiText } from "react-icons/bi";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import { GoHash } from "react-icons/go";
import { TbCheckbox, TbGif } from "react-icons/tb";
import { toast } from "react-toastify";
import "./EditForm.css";
import { useSelector } from "react-redux";

const inputOptions = {
  bubbles: [
    {
      type: "text",
      label: "Text",
      icon: <FiMessageSquare className="efb-bubble-icon" />,
    },
    {
      type: "image",
      label: "Image",
      icon: <IoImageOutline className="efb-bubble-icon" />,
    },
  ],
  inputs: [
    {
      type: "text",
      label: "Text",
      icon: <BiText className="efb-input-icon" />,
    },
    {
      type: "number",
      label: "Number",
      icon: <GoHash className="efb-input-icon" />,
    },
    {
      type: "email",
      label: "Email",
      icon: <HiOutlineAtSymbol className="efb-input-icon" />,
    },
    {
      type: "phone",
      label: "Phone",
      icon: <LuPhone className="efb-input-icon" />,
    },
    {
      type: "date",
      label: "Date",
      icon: <FiCalendar className="efb-input-icon" />,
    },
    {
      type: "rating",
      label: "Rating",
      icon: <IoIosStarOutline className="efb-input-icon" />,
    },
    {
      type: "submit",
      label: "Button",
      icon: <TbCheckbox className="efb-input-icon" />,
    },
  ],
};

function EditForm({ flow, setFlow }) {
  const { activeForm } = useSelector((state) => state.form);

  const addBoxToFlow = (boxType, fieldType) => {
    if (activeForm?.permission !== "edit") return;

    if (boxType === "Button" && flow.some((item) => item.field === "Button")) {
      toast.error("You can only add one 'Buttons' input.");
      return;
    }

    const newField = {
      field: boxType,
      type: fieldType,
      fieldValue: fieldType === "bubble" ? "" : null,
    };

    const updatedFlow = [...flow];
    const buttonIndex = updatedFlow.findIndex(
      (item) => item.field === "Button"
    );
    if (buttonIndex !== -1 && boxType !== "Button") {
      updatedFlow.splice(buttonIndex, 0, newField);
    } else {
      updatedFlow.push(newField);
    }

    setFlow(updatedFlow);
  };

  const removeBoxFromFlow = (index) => {
    if (activeForm?.permission !== "edit") return;
    const updatedFlow = [...flow];
    updatedFlow.splice(index, 1);
    setFlow(updatedFlow);
  };

  const updateFieldValue = (index, value) => {
    if (activeForm?.permission !== "edit") return;
    // Create a shallow copy of the flow array
    const updatedFlow = [...flow];
    // Create a shallow copy of the specific item to update
    const updatedField = { ...updatedFlow[index], fieldValue: value };
    // Replace the updated item in the copied array
    updatedFlow[index] = updatedField;
    setFlow(updatedFlow);
  };

  return (
    <div className="edit-form">
      <div className="ef-field-bar open-sans">
        <div className="efb-container">
          <div className="efb-bubbles">
            <p>Bubbles</p>
            <div className="efb-types">
              {inputOptions.bubbles.map((bubble, index) => (
                <div
                  className="efb-type"
                  onClick={() => addBoxToFlow(bubble.label, "bubble")}
                  key={index}
                >
                  {bubble.icon}
                  <p>{bubble.label}</p>
                </div>
              ))}
              <div className="efb-type">
                <IoFilmOutline className="efb-bubble-icon" />
                <p>Video</p>
              </div>
              <div className="efb-type">
                <TbGif
                  className="efb-bubble-icon"
                  style={{ fontSize: "18px" }}
                />
                <p>GIF</p>
              </div>
            </div>
          </div>

          <div className="efb-inputs">
            <p>Inputs</p>
            <div className="efb-input-container">
              {inputOptions.inputs.map((input, index) => (
                <div
                  className="efb-input-types"
                  onClick={() => addBoxToFlow(input.label, "input")}
                  key={index}
                >
                  {input.icon}
                  <p>{input.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="build-form">
        <div className="bf-start open-sans">
          <ImFlag
            className="bfs-icon"
            style={{
              fontSize: "21px",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          />
          <span>Start</span>
        </div>

        {flow?.map((item, index) => (
          <div className="field-element open-sans" key={index}>
            {activeForm?.permission === "edit" && (
              <FiTrash2
                className="fe-delete"
                onClick={() => removeBoxFromFlow(index)}
              />
            )}
            <p>{item.field}</p>
            {item.type === "bubble" ? (
              <>
                <div
                  className="fe-input"
                  style={
                    !item.fieldValue
                      ? { border: "1px solid #F55050" }
                      : { border: "1px solid var(--fe-input-border)" }
                  }
                >
                  <FiMessageSquare className="efb-bubble-icon" />
                  <input
                    type={item.field === "Text" ? "text" : "url"}
                    placeholder={
                      item.field === "Text" ? "Enter text" : "Enter image link"
                    }
                    value={item.fieldValue}
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    disabled={activeForm?.permission !== "edit"}
                  />
                </div>
                {!item.fieldValue && (
                  <p
                    className="poppins"
                    style={{
                      color: "#522224",
                      fontSize: "10.43px",
                      fontWeight: "500",
                      marginTop: "5px",
                    }}
                  >
                    Required Field
                  </p>
                )}
              </>
            ) : item.field === "Button" ? (
              <div
                className="fe-input"
                style={
                  !item.fieldValue
                    ? { border: "1px solid #F55050" }
                    : { border: "1px solid var(--fe-input-border)" }
                }
              >
                <TbCheckbox className="efb-input-icon" />
                <input
                  type="text"
                  placeholder="Name your submit function"
                  value={item.fieldValue || ""}
                  onChange={(e) => updateFieldValue(index, e.target.value)}
                  disabled={activeForm?.permission !== "edit"}
                />
              </div>
            ) : (
              <p className="fe-hint">
                Hint: User will input a {item.field} on their form
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditForm;
