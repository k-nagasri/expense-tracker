import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute({ children }) {
  if (!localStorage.getItem("expense-tracker-user")) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default App;
