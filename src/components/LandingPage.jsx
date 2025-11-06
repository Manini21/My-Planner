import React, { useState } from "react";
import "./LandingPage.css";

const LandingPage = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("🟢 LandingPage loaded, onSignup:", onSignup);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Form submitted");

    // 💾 Save user details in localStorage
    const userData = { username, email, password };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", JSON.stringify(true));

     // ✅ Call the prop from App.jsx
    if (onSignup && typeof onSignup === "function") {
      console.log("✅ onSignup called successfully");
      onSignup();
    } else {
      console.error("❌ onSignup function not passed to LandingPage");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">My Planner</h1>

        <div className="signup-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Get Started</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
