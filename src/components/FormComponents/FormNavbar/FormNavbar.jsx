import React from "react";
import ToggleSwitch from "../../Navbar/ToggleSwitch";
import { IoCloseSharp } from "react-icons/io5";
import "./FormNavbar.css";

function FormNavbar({ currentTab, setCurrentTab }) {
  return (
    <div className="form-navbar open-sans">
      <div className="form-nav-input">
        <input type="text" placeholder="Enter Form Name" />
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
          <button disabled>Share</button>
          <button>Save</button>
          <IoCloseSharp className="fneb-close" />
        </div>
      </div>
    </div>
  );
}

export default FormNavbar;
