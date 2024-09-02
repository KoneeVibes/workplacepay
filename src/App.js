import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";

function App() {
  return <div>Workplace Pay</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
