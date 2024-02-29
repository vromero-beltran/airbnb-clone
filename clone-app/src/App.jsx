import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App;
