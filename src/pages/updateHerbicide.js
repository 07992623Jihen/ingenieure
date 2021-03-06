import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../model/error-model";
import SuccessModel from "../model/success-model";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateHerbicide = (props) => {
  const [nom, setNom] = useState();
  const [matiere, setmatiere] = useState();
  const [dose, setdose] = useState();
  const [stade, setstade] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/herbicide/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setNom(responseData.herbicide.nom);
        setmatiere(responseData.herbicide.matiere);
        setdose(responseData.herbicide.dose);
        setstade(responseData.herbicide.stade);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "matiere") {
      setmatiere(e.target.value);
    } else if (e.target.name === "dose") {
      setdose(e.target.value);
    } else {
      setstade(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    console.log(nom, matiere, dose, stade);

    try {
      let response = await fetch(`http://localhost:5000/api/herbicide/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          matiere: matiere,
          dose: dose,
          stade: stade,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Herbicide modifier");
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
          <Col xs={9}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  value={nom}
                  placeholder=""
                  name="nom"
                  onChange={onchange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Mati??re actif</Form.Label>
                <Form.Control
                  value={matiere}
                  placeholder=""
                  name="matiere"
                  onChange={onchange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Dose par hectare</Form.Label>
                <Form.Control
                  value={dose}
                  type="number"
                  placeholder=""
                  name="dose"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Stade d'intervention </Form.Label>
                <Form.Control
                  value={stade}
                  placeholder=""
                  name="stade"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Modifier
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateHerbicide;
