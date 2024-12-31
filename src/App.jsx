import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SinglePage from "./pages/single";
import WritePage from "./pages/write";
import HomePage from "./pages/home";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./index.css";

const Layout = () => {
  return (
    <div className="app">
      <div className="layout_container">
        <NavBar />

        <Outlet className="outlet"/>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/post/:id" element={<SinglePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
