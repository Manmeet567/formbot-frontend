import ToggleSwitch from "./ToggleSwitch";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar open-sans">
      <div className="nv-left"></div>
      <div className="nv-workspace">
        <p>Hiro's Workspace</p>
      </div>
      <div className="nv-right">
        <div className="nv-switch">
          <p>Light</p>
          <ToggleSwitch />
          <p>Dark</p>
        </div>
        <button>Share</button>
      </div>
    </nav>
  );
}

export default Navbar;
