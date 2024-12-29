import React from "react";
import logo from "../../assets/logo.png";
import first from "../../assets/home-pic-1.png";
import second from "../../assets/home-pic-2.png";
import share from "../../assets/share.png";
import "./HomeComponent.css";
import { Link } from "react-router-dom";

function HomeComponent() {
  return (
    <div className="home">
      <div className="home-header">
        <Link to="/">
          <div className="hh-logo">
            <img src={logo} alt="" />
            <p className="outfit">FormBot</p>
          </div>
        </Link>
        <div className="hh-btns">
          <Link to="/signup">
            <button className="open-sans">Sign in</button>
          </Link>
          <Link to="/login">
            <button className="open-sans">Create a FormBot</button>
          </Link>
        </div>
      </div>

      <div className="home-hero">
        <div className="hh-info">
          <img src={first} alt="" />
          <img src={second} alt="" />
          <p className="outfit">Build advanced chatbots visually</p>
          <p className="open-sans">
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </p>
          <button className="open-sans">Create a FormBot for free</button>
        </div>
        <img
          src="https://res.cloudinary.com/dianvv6lu/image/upload/v1734689574/image_zcprj1.png"
          alt=""
        />
        <div className="hh-img-orange-circle"></div>
        <div className="hh-img-blue-circle"></div>
      </div>

      <footer>
        <div className="footer-first">
          <div className="hh-logo">
            <img src={logo} alt="" />
            <p className="outfit">FormBot</p>
          </div>
          <p className="open-sans">
            Made with ❤️ by{" "}
            <u style={{ textDecoration: "underline" }}>@ManmeetSingh</u>
          </p>
        </div>
        <div className="footer-links">
          <p>Product</p>
          <div className="fl-links">
            <p>
              Status <img src={share} alt="" />
            </p>
            <p>
              Documentation <img src={share} alt="" />
            </p>
            <p>
              Roadmap <img src={share} alt="" />
            </p>
            <p>
              Pricing <img src={share} alt="" />
            </p>
          </div>
        </div>
        <div className="footer-links">
          <p>Community</p>
          <div className="fl-links">
            <p>
              Discord <img src={share} alt="" />
            </p>
            <p>
              GitHub repository <img src={share} alt="" />
            </p>
            <p>
              Twitter <img src={share} alt="" />
            </p>
            <p>
              LinkedIn <img src={share} alt="" />
            </p>
            <p>
              OSS Friends <img src={share} alt="" />
            </p>
          </div>
        </div>
        <div className="footer-links">
          <p>Company</p>
          <div className="fl-links">
            <p>About</p>
            <p>Contact</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeComponent;
