import { BrowserRouter, Route, Routes } from "react-router-dom";

import BarberDashboard from "./pages/barber/BarberDashboard";
import BarberLogin from "./pages/barber/BarberLogin";
import ErrorPage from "./pages/ErrorPage";
import BarberSignup from "./pages/barber/BarberSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Barber Routes */}
        <Route path="/barber/login" element={<BarberLogin />} />
        <Route path="/barber/signup" element={<BarberSignup />} />
        <Route path="/barber/dashboard" element={<BarberDashboard />} />

        {/* User Routes */}
        <Route path="/user/login" element={<BarberLogin />} />
        <Route path="/user/signup" element={<BarberSignup />} />
        <Route path="/user/dashboard" element={<BarberDashboard />} />
        {/* shop path */}
        {/* Profile page */}

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
