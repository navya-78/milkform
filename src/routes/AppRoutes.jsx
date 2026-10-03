import {
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import UserDashboard from "../modules/users/pages/UserDashboard";
import AnalyticsDashboard from "../modules/analytics/pages/AnalyticsDashboard";
import DeliveryBoyDashboard from "../modules/deliveryboy/pages/DeliveryBoyDashboard";

function StartPage() {
  const { user } = useAuth();

  return (
    <Navigate
      to={user ? `/${user.role}` : "/login"}
      replace
    />
  );
}

function RoleHome() {
  const { role } = useParams();
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  if (role === "user") {
    return <UserDashboard />;
  }

  if (role === "admin") {
    return <AnalyticsDashboard />;
  }

  if (role === "deliveryboy") {
    return <DeliveryBoyDashboard />;
  }

  return <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/:role" element={<RoleHome />} />
      <Route path="*" element={<StartPage />} />
    </Routes>
  );
}