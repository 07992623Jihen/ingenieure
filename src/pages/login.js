import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Authcontext } from "../context/auth-context";
import ErrorModel from "../model/error-model";
import SuccessModel from "../model/success-model";


const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    try {
      let response = await fetch("http://localhost:5000/api/ingenieur/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }

      auth.login(responsedata.ingenieur._id, responsedata.token);
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Card className="text-center">
              <Card.Header>Authentification</Card.Header>
            </Card>
            <Card>
              <Card.Body>
                <ErrorModel error={error} />
                <SuccessModel success={success} />
                <Form onSubmit={submit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={onchange}
                      required
                    />
                    <Form.Text className="text-muted">
                      il sera jamais partagé.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={onchange}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Connexion
                  </Button>
                  <div style={{ marginTop: "2%" }}></div>
                  
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
