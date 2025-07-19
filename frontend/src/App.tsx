import { BrowserRouter, Route, Routes } from "react-router-dom";

import BarberDashboard from "./pages/barber/BarberDashboard";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BarberDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
