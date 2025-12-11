import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePetPage from "./pages/CreatePetPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PetFormPage from "./pages/PetFormPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-pet" element={<CreatePetPage />} />
        <Route path="/pet-form" element={<PetFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
