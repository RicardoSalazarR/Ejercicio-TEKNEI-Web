import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header, Footer, LoginForm, UsersTable } from "./components";

import "./index.css";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const handleLogout = () => {
    setUser("");
    localStorage.clear();
  };

  return (
    <Router>
      <div>
        <Header userName={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/users" />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/users"
              element={user ? <UsersTable /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
