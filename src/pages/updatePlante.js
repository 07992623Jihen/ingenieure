import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../model/error-model";
import SuccessModel from "../model/success-model";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePlante = (props) => {
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const pickImageHandler = (event) => {
    filePickerRef.current.click();
  };

  const [nom, setNom] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/mauvaiseHerbe/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setNom(responseData.mauvaiseHerbe.nom);
        setType(responseData.mauvaiseHerbe.type);
        setDescription(responseData.mauvaiseHerbe.description);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "type") {
      setType(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", File);
      formData.append("type", type);
      formData.append("nom", nom);
      formData.append("description", description);

      await axios.patch(
        `http://localhost:5000/api/mauvaiseHerbe/${id}`,
        formData
      );

      setsuccess("mauvaise herbe modifi??");
    } catch (err) {
      seterror(err.message || "il y a un probleme");
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
              <div
                style={{
                  width: "50%",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                <input
                  ref={filePickerRef}
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler}
                />
                <div>
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      rounded
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}

                  <Button
                    type="button"
                    variant="primary"
                    onClick={pickImageHandler}
                    style={{ marginTop: "20px" }}
                  >
                    modifier un image
                  </Button>
                </div>
                {!isValid && <p></p>}
              </div>
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
                <Form.Label>Type</Form.Label>
                <Form.Control
                  value={type}
                  as="select"
                  placeholder=""
                  name="type"
                  onChange={onchange}
                  required
                >
                  <option>--</option>
                  <option>Monocotyl??done</option>
                  <option>Dicotyl??done</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  as="textarea"
                  rows={5}
                  name="description"
                  onChange={onchange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                modifier
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdatePlante;
