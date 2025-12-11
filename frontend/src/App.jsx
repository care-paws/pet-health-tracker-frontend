import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import CreatePetPage from "./pages/pets/CreatePetPage";
import PetFormPage from "./pages/pets/PetFormPage";
import RegisterPage from "./pages/register/RegisterPage";

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
