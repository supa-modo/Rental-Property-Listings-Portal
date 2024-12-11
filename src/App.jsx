import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import RentalManagementDashboard from "./Homepage";
import PaymentsPage from "./pages/PaymentsPage";
import PropertiesPage from "./pages/PropertiesPage";
import TenantsPage from "./pages/TenantsPage";
import MaintenancePage from "./pages/MaintenancePage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import TenantDashboard from "./pages/TenantDashboard";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const AdminLayout = () => (
  <ProtectedRoute allowedRoles={['admin']}>
    <Layout>
      <Outlet />
    </Layout>
  </ProtectedRoute>
);

const TenantRoute = () => (
  <ProtectedRoute allowedRoles={['tenant']}>
    <TenantDashboard />
  </ProtectedRoute>
);

const LoginRoute = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to={user.role === 'tenant' ? '/tenant-dashboard' : '/dashboard'} replace />;
  }
  
  return <LoginPage />;
};

const RootRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Navigate to={user.role === 'tenant' ? '/tenant-dashboard' : '/dashboard'} replace />;
};

const AppContent = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/" element={<RootRedirect />} />

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<RentalManagementDashboard />} />
        <Route path="/tenants" element={<TenantsPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Tenant Route */}
      <Route path="/tenant-dashboard" element={<TenantRoute />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
