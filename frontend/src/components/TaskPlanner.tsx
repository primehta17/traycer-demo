import React, { useState } from "react";
import axios from "axios";

export const TaskPlanner = () => {
  const [task, setTask] = useState("");
  const [plan, setPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const handlePlan = async () => {
    if (!task.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/plan", { task });
      setPlan(res.data);
      setHistory([{ task, steps: res.data }, ...history]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const themeStyles = {
    background: darkMode ? "#1c1c1c" : "#f0f2f5",
    cardBackground: darkMode ? "#2c2c2c" : "#fff",
    textColor: darkMode ? "#f0f0f0" : "#333",
    buttonBackground: darkMode
      ? "linear-gradient(135deg, #667eea, #764ba2)"
      : "linear-gradient(135deg, #6a11cb, #2575fc)",
    stepBackground: darkMode ? "#3c3c3c" : "#f9f9f9",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh",
        background: themeStyles.background,
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ width: "100%", textAlign: "right", padding: "10px" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            background: themeStyles.buttonBackground,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div
        style={{
          background: themeStyles.cardBackground,
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            color: themeStyles.textColor,
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "10px",
          }}
        >
          Simplified Traycer
        </h1>
        <p style={{ textAlign: "center", color: themeStyles.textColor }}>
          Enter a task to generate a step-by-step plan.
        </p>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            onClick={handlePlan}
            style={{
              padding: "12px 20px",
              marginLeft: "10px",
              borderRadius: "8px",
              border: "none",
              background: themeStyles.buttonBackground,
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Plan
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "5px solid rgba(0,0,0,0.1)",
                borderTop: `5px solid ${
                  darkMode ? "#667eea" : "#6a11cb"
                }`,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "auto",
              }}
            />
            <p style={{ color: themeStyles.textColor }}>Generating plan...</p>
          </div>
        )}

        {plan.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ color: themeStyles.textColor }}>Planned Steps</h2>
            <ol style={{ paddingLeft: "20px" }}>
              {plan.map((step) => (
                <li
                  key={step.stepNumber}
                  style={{
                    background: themeStyles.stepBackground,
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "8px",
                    transition: "background 0.3s ease",
                  }}
                >
                  {step.description}
                </li>
              ))}
            </ol>
          </div>
        )}

        {history.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: themeStyles.textColor }}>History</h3>
            {history.map((h, idx) => (
              <details
                key={idx}
                style={{
                  background: themeStyles.stepBackground,
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                  {h.task}
                </summary>
                <ol style={{ paddingLeft: "20px" }}>
                  {h.steps.map((s: any) => (
                    <li key={s.stepNumber}>{s.description}</li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
