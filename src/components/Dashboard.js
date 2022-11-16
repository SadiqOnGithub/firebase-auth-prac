import { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();

  function handleProfileUpdate() {
    navigate("update-profile");
  }

  async function handleLogOut(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let logOutMsg = await logOut();
      setError(logOutMsg);
      navigate("login")
    } catch (err) {
      setError("Failed to Log Out");
    }
    setLoading(false);
  }
  return (
    <>
      <div className="w-100" style={{ maxWidth: "400px", textAlign: "center" }}>
        <Card>
          <Card.Body>
            <h2 className="mb-5">Dashboard</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <p className="mb-5">Current User : {currentUser?.email} </p>
            <Button className="mb-2" onClick={handleProfileUpdate}>
              Update Profile
            </Button>
            <br></br>
            <Button disabled={loading} variant="link" onClick={handleLogOut}>
              Log Out
            </Button>
          </Card.Body>
        </Card>
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
