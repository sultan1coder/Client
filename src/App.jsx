import { useAuthContext } from "./hooks/useAuthContext";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/page";
import Dashboard from "./pages/Dashboard/page";
import Registration from "./pages/Registeration/page";
import MemberDetails from "./pages/memberDetails/page";
import Layout from "./layout";
import Members from "./pages/members/page";
import Page from "./pages/Payment/page";

function App() {
  const { user } = useAuthContext();
  const protectedRoute = (path, page) => {
    return (
      <Route
        path={"/" + path}
        element={!user ? <Navigate to="/login" /> : page}
      />
    );
  };
  return (
    <>
      <Layout>
        <Routes>
          {protectedRoute("/", <Dashboard />)}
          {protectedRoute("/payments/:id", <Page />)}
          {protectedRoute("/payments", <Page />)}
          {protectedRoute("/registeration", <Registration />)}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          {protectedRoute("/members", <Members />)}
          {protectedRoute("/members/:id", <MemberDetails />)}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
