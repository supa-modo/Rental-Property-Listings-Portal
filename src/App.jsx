import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentalManagementDashboard from "./Homepage";
import PaymentsPage from "./pages/PaymentsPage";
import PropertiesPage from "./pages/PropertiesPage";
import TenantsPage from "./pages/TenantsPage";
import MaintenancePage from "./pages/MaintenancePage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import TenantDashboard from "./pages/TenantDashboard";
import Layout from "./components/Layout";
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4">Something went wrong. Please try refreshing the page.</div>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<RentalManagementDashboard />} />
            <Route path="/tenants" element={<TenantsPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
