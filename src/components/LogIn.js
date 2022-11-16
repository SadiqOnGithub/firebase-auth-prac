
import { getAuth } from "firebase/auth";
import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LogIn() {
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let logInMsg = await logIn(
        emailRef.current.value,
        passwordRef.current.value
      );
      setError(logInMsg);
      let { currentUser } = getAuth();
      if (currentUser && (currentUser.email === emailRef.current.value)) {
        return navigate("/");
      }
    } catch (err) {
      setError("Failed to LogIn");
    }
    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card className="w-100 mb-3">
        <Card.Body>
          <h2 className="text-center mb-5">LogIn</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                ref={emailRef}
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
                autoComplete="current-password"
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              logIn
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center">
        Don't have an account? <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
}

export default LogIn;
