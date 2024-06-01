import { Button } from "@chakra-ui/react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import SalesOrderPage from "./pages/SalesOrderPage.js";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sales-order" element={<SalesOrderPage />} />
    </Routes>
  );
}

export default App;
