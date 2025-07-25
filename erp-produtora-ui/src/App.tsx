import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginPage } from './pages/LoginPage';
import { MainLayout } from './components/shared/MainLayout';
import { AgenciasPage } from './pages/AgenciasPage';

function DashboardPage() {
  return <h1>Dashboard Principal</h1>;
}

function ProtectedLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
}

function LoginRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginRoute />} />
        
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agencias" element={<AgenciasPage />} />
          {/* Adicione outras rotas protegidas aqui no futuro */}
        </Route>

        <Route path="*" element={<h1>Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;