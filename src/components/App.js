import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import UpdateProfile from "./UpdateProfile";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="update-profile" element={<UpdateProfile />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
