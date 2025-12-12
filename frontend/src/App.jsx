import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import CreatePetPage from "@/pages/pets/create/CreatePetPage";
import PetFormPage from "@/pages/pets/form/PetFormPage";
import PetListPage from "@/pages/pets/list/PetListPage";
import RegisterPage from "@/pages/register/RegisterPage";
import RemindersPage from "@/pages/reminders/RemindersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-pet" element={<CreatePetPage />} />
        <Route path="/pet-form" element={<PetFormPage />} />
        <Route path="/pets" element={<PetListPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
