import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "../../context/ThemeContext";

const ToggleSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <Switch
        onChange={toggleTheme}
        checked={theme === "dark"}
        onColor="#1A5FFF"       /* Background color when checked */
        offColor="#ccc"          /* Background color when unchecked */
        checkedHandleIcon={null} /* Remove any icon */
        uncheckedHandleIcon={null} /* Remove any icon */
        handleDiameter={15}      /* Diameter of the toggle handle */
        height={21}              /* Height of the switch */
        width={51}               /* Width of the switch */
        uncheckedIcon={false}    /* No icons inside the switch */
        checkedIcon={false}      /* No icons inside the switch */
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"  /* Shadow for the switch handle */
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.1)" /* Active shadow */
        handleColor="#fff"       /* Color of the handle */
      />
    </div>
  );
};

export default ToggleSwitch;
