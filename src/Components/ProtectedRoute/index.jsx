import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const autenticado = !!sessionStorage.getItem("token_de_acesso")
  return autenticado ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
