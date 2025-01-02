import React, { useState } from "react";
import { Github, Folder } from "lucide-react";
import viteLogo from "/vite.svg"; // Logo file for floating image
import "./App.css";

const App = () => {
  const [inputType, setInputType] = useState("github");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (inputType === "github") {
        params.append("githubLink", input);
      } else {
        params.append("localPath", input);
      }

      const res = await fetch(`/api/upload?${params.toString()}`, {
        method: "POST",
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        status: "error",
        message: "Failed to connect to the server",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">doce.ai</div>
        <div className="navbar-right">
            <div className="navbar-links">
            <a href="#" className="navbar-link">About</a>
            <a href="#" className="navbar-link">Documentation</a>
            </div>
            <img src="src/assets/nobglogo.png" alt="Logo" className="navbar-logo" />
        </div>
      </nav>


      {/* Main Content */}
      <main className="content">
        <div className="content-wrapper">
          <h1 className="title">
            Generate AI-Powered
            Code Documentation
          </h1>
          <p className="description">
            Transform your codebase into comprehensive, intelligent documentation with doce.ai.
          </p>

          {/* Input Form */}
          <div className="form">
            <div className="form-buttons">
              <button
                onClick={() => setInputType("github")}
                className={`form-button ${inputType === "github" ? "active" : ""}`}
              >
                <Github size={20} /> GitHub Repository
              </button>
              <button
                onClick={() => setInputType("local")}
                className={`form-button ${inputType === "local" ? "active" : ""}`}
              >
                <Folder size={20} /> Local Path
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form-fields">
              <input
                type="text"
                placeholder={
                  inputType === "github"
                    ? "Enter GitHub repository URL"
                    : "Enter local path"
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-input"
              />
              <button
                type="submit"
                disabled={loading || !input}
                className={`form-submit ${loading || !input ? "disabled" : ""}`}
              >
                {loading ? "Processing..." : "Generate Documentation"}
              </button>
            </form>

            {response && (
              <div
                className={`response ${
                  response.status === "success" ? "success" : "error"
                }`}
              >
                {response.message}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">© 2024 doce.ai by Akshansh & Arkopaul</footer>
    </div>
  );
};

export default App;
