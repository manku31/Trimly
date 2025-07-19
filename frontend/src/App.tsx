import { BrowserRouter, Route, Routes } from "react-router-dom";

import BarberDashboard from "./pages/barber/BarberDashboard";
import BarberLogin from "./pages/barber/BarberLogin";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import BarberSignup from "./pages/barber/BarberSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BarberDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/barber/login" element={<BarberLogin />} />
        <Route path="/barber/signup" element={<BarberSignup />} />

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
