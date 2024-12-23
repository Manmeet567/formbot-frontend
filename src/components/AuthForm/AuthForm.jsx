import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser } from "../../redux/slices/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import "./AuthForm.css";
import triangle from "../../assets/triangle.png";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To get the previous location (redirect target)
  const { userData } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (type === "signup") {
        // Dispatch signup
        await dispatch(signupUser(formData));
      } else {
        await dispatch(loginUser(formData));
      }
      // Get the redirect path from the location state or default to '/workspace'
      const redirectPath = location.state?.from || `/workspace/${userData?.workspaceId}`;
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <div className="af-half-1"></div>
      <div className="af-half-2"></div>
      <img className="triangle" src={triangle} alt="" />
      <div className="af-back" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="af-fields poppins">
          {type === "signup" && (
            <div>
              <label className="poppins">Userame</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter a username"
                required
              />
            </div>
          )}

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={type === "login" ? { marginBottom: "25px" } : {}}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="**********"
              required
            />
          </div>

          {type === "signup" && (
            <div style={{ marginBottom: "25px" }}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="**********"
                required
              />
            </div>
          )}
        </div>

        {error && (
          <div
            className="error poppins"
            style={{ color: "#FF4141", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}

        <button className="poppins af-submit" type="submit">
          {type === "signup" ? "Sign Up" : "Log In"}
        </button>
        <p className="poppins" style={{ color: "#fff", margin: "15px 0" }}>
          OR
        </p>
        <button className="poppins af-submit">
          <FcGoogle className="google" />
          <span>Sign {type === "signup" ? "Up" : "In"} with Google</span>
        </button>

        {/* Conditional links based on the form type */}
        <div className="af-bottom-link inter">
          {type === "signup" ? (
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="/signup">Register now</Link>
            </p>
          )}
        </div>
      </form>
      ;
    </div>
  );
};

export default AuthForm;
