import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

{
  /**Componentes */
}
import NavSidebar from "@/components/nav_sidebar";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import NotFound from "@/pages/404-notfound";
import UserHome from "@/pages/UserHome";
import CidadaoHome from "@/pages/CidadaoHome";
import PrivateRoute from "@/services/ProtectedRoute";
import SolicitacaoHome from "@/pages/SolicitacaoHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<UserHome />} />
          <Route path="/cidadaos" element={<CidadaoHome />} />
          <Route path="/solicitacoes" element={<SolicitacaoHome />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
