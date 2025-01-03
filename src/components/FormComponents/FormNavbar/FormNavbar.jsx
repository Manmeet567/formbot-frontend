import { useState, useEffect } from "react";
import ToggleSwitch from "../../Navbar/ToggleSwitch";
import { IoCloseSharp } from "react-icons/io5";
import "./FormNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveForm } from "../../../redux/slices/formSlice";

function FormNavbar({
  formTitle,
  setFormTitle,
  currentTab,
  setCurrentTab,
  onSave,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeForm } = useSelector((state) => state.form);

  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (activeForm?.title) {
      setFormTitle(activeForm.title);
    }
  }, [activeForm]);

  const handleShareClick = () => {
    if (!activeForm?._id) return;

    const formattedTitle = formTitle.toLowerCase().replace(/\s+/g, "-");

    const link = `${
      import.meta.env.VITE_CLIENT_BASE_URL
    }/response/${formattedTitle}/${activeForm._id}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setShowBubble(true);

        setTimeout(() => {
          setShowBubble(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  return (
    <div className="form-navbar open-sans">
      <div className="form-nav-input">
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div className="fn-btns">
        <button
          className={currentTab === "flow" ? "fnb-active" : "fn-btn"}
          onClick={() => setCurrentTab("flow")}
        >
          Flow
        </button>
        <button
          className={currentTab === "response" ? "fnb-response" : "fn-btn"}
          onClick={() => setCurrentTab("response")}
        >
          Response
        </button>
      </div>
      <div className="fn-end-btns">
        <div className="nv-switch">
          <p>Light</p>
          <ToggleSwitch />
          <p>Dark</p>
        </div>
        <div className="fneb-btns">
          <button
            disabled={activeForm?.flow?.length !== 0 ? false : true}
            onClick={handleShareClick}
          >
            Share
          </button>
          {activeForm?.permission === "edit" && (
            <>
              <button onClick={() => onSave()}>Save</button>
              <IoCloseSharp
                onClick={() => {
                  navigate(-1);
                  dispatch(setActiveForm(null));
                }}
                className="fneb-close"
              />
            </>
          )}
          {showBubble && (
            <div className="copied-bubble">
              <p>Link copied</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormNavbar;
