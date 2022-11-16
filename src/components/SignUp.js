import { getAuth } from "firebase/auth";
import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password don't match");
    }
    try {
      setError("");
      setLoading(true);
      let signUpMsg = await signUp(
        emailRef.current.value,
        passwordRef.current.value
      );
      setError(signUpMsg);
      let { currentUser } = getAuth();
      if (currentUser?.email === emailRef.current.value) {
        navigate("/");
      }
    } catch (err) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card className="w-100 mb-3">
        <Card.Body>
          <h2 className="text-center mb-5">SignUp</h2>
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
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
                autoComplete="new-password"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordConfirmRef}
                autoComplete="new-password"
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              SignUp
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
