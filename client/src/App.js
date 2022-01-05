import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <MenuBar />
      <div
        className="navbar below"
        style={{ border: "none", boxShadow: "none" }}
      >
        <div className="container" style={{ position: "static" }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
