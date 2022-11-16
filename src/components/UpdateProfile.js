import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function UpdateProfile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, emailUpdate } = useAuth();

  const navigate = useNavigate();

  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    if (emailRef.current.value === currentUser.email) {
      setError("Please enter a new email address");
      return;
    }
    if (emailRef.current.value !== currentUser.email) {
      setLoading(true);
      emailUpdate(emailRef.current.value)
        .then((msg) => {
          setError(msg);
          if (!msg) {
            navigate("/");
          }
        })
        .catch((err) => {
          setError("Failed to update account");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card className="w-100 mb-3">
        <Card.Body>
          <h2 className="text-center mb-5">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                autoComplete="username"
              />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}

export default UpdateProfile;
