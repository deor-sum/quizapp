import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login";
import Home from "./components/Home";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
