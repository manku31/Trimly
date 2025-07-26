import { BrowserRouter, Route, Routes } from "react-router-dom";

import BarberDashboard from "./pages/barber/BarberDashboard";
import BarberLogin from "./pages/barber/BarberLogin";
import ErrorPage from "./pages/ErrorPage";
import BarberSignup from "./pages/barber/BarberSignup";
import UserDashboard from "./pages/users/UserDashboad";
import UserLogin from "./pages/users/UserLogin";
import UserSignup from "./pages/users/UserSignup";
import ShopDetails from "./pages/users/ShopDetails";
import QueueStatus from "./pages/users/QueueStatus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Barber Routes */}
        <Route path="/barber/login" element={<BarberLogin />} />
        <Route path="/barber/signup" element={<BarberSignup />} />
        <Route path="/barber/dashboard" element={<BarberDashboard />} />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/shop/:shopId" element={<ShopDetails />} />
        <Route path="/user/queue/:queueId" element={<QueueStatus />} />

        {/* Default route */} <Route path="/" element={<UserDashboard />} />

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
