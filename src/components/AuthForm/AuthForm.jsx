import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser, loginUser } from "../../redux/slices/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To get the previous location (redirect target)

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
      const redirectPath = location.state?.from || "/workspace";
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === "signup" && (
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {type === "signup" && (
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <button type="submit">{type === "signup" ? "Sign Up" : "Log In"}</button>

      {/* Conditional links based on the form type */}
      <div>
        {type === "signup" ? (
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
