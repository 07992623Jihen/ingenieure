import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../model/error-model";
import SuccessModel from "../model/success-model";
import axios from "axios";
import { useParams } from "react-router-dom";

const Responce = (props) => {
  const [File1, setFile1] = useState();
  const [previewUrl1, setPreviewUrl1] = useState();
  const [isValid1, setIsValid1] = useState(false);

  const filePickerRef1 = useRef();

  useEffect(() => {
    if (!File1) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl1(fileReader.result);
    };

    fileReader.readAsDataURL(File1);
  }, [File1]);

  const pickedHandler1 = (event) => {
    let pickedFile;
    let fileIsValid = isValid1;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile1(pickedFile);
      setIsValid1(true);
      fileIsValid = true;
    } else {
      setIsValid1(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const pickImageHandler1 = (event) => {
    filePickerRef1.current.click();
  };

  const [File2, setFile2] = useState();
  const [previewUrl2, setPreviewUrl2] = useState();
  const [isValid2, setIsValid2] = useState(false);

  const filePickerRef2 = useRef();

  useEffect(() => {
    if (!File2) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl2(fileReader.result);
    };

    fileReader.readAsDataURL(File2);
  }, [File2]);

  const pickedHandler2 = (event) => {
    let pickedFile;
    let fileIsValid = isValid2;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile2(pickedFile);
      setIsValid2(true);
      fileIsValid = true;
    } else {
      setIsValid2(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const pickImageHandler2 = (event) => {
    filePickerRef2.current.click();
  };

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
  const [description, setDescription] = useState();
  const [descriptionPlature, setDescriptionPlature] = useState();
  const [descriptionAdulte, setDescriptionAdulte] = useState();
  const [descriptionAvance, setDescriptionAvanace] = useState();
  const [lutte, setLutte] = useState();
  const [typeLutte, setTypeLutte] = useState();
  const [herbicide, setHerbicide] = useState();

  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "descriptionPlature") {
      setDescriptionPlature(e.target.value);
    } else if (e.target.name === "descriptionAdulte") {
      setDescriptionAdulte(e.target.value);
    } else if (e.target.name === "descriptionAvance") {
      setDescriptionAvanace(e.target.value);
    } else if (e.target.name === "lutte") {
      setLutte(e.target.value);
    } else if (e.target.name === "typeLutte") {
      setTypeLutte(e.target.value);
    } else if (e.target.name === "herbicide") {
      setHerbicide(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();
    console.log(description);

    try {
      const formData = new FormData();

      formData.append("image", File1);
      formData.append("nom", nom);
      formData.append("description", description);
      formData.append("descriptionPlature", descriptionPlature);
      formData.append("descriptionAdulte", descriptionAdulte);
      formData.append("descriptionAvance", descriptionAvance);
      formData.append("lutte", lutte);
      formData.append("typeLutte", typeLutte);
      formData.append("herbicide", herbicide);
      formData.append("demandeId", id);

      /* const options = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "form-data",
        },
      };

      let response = await fetch(`http://localhost:5000/api/reponse/ajout`, options);

      if (!response.ok) {
        let responsedata = await response.json();
        seterror(responsedata.message)
        setsuccess(null)
        throw new Error(responsedata.message);
      } */

      await axios
        .post(`http://localhost:5000/api/reponse/ajout`, formData)
        .then((response) => {
          console.log(response.data.reponse);
        });

      setsuccess("Plante ajouté");
      seterror(null);
    } catch (err) {
      seterror(err.message || "il y a un probleme");
    }
  };

  const [list, setList] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/herbicide/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.herbicide);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);

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
                  placeholder=""
                  name="nom"
                  onChange={onchange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  required
                  onChange={onchange}
                />
              </Form.Group>

              <div
                style={{
                  width: "50%",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                <input
                  ref={filePickerRef1}
                  style={{ display: "none" }}
                  type="File"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler1}
                />
                <div>
                  {previewUrl1 && (
                    <Image
                      src={previewUrl1}
                      alt="Preview"
                      rounded
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}

                  <Button
                    type="button"
                    variant="primary"
                    onClick={pickImageHandler1}
                    style={{ marginTop: "20px" }}
                  >
                    Image stade plature
                  </Button>
                </div>
                {!isValid1 && <p></p>}
              </div>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Description stade plature</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="descriptionPlature"
                  required
                  onChange={onchange}
                />
              </Form.Group>
              <div
                style={{
                  width: "50%",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                <input
                  ref={filePickerRef2}
                  style={{ display: "none" }}
                  type="File"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler2}
                />
                <div>
                  {previewUrl2 && (
                    <Image
                      src={previewUrl2}
                      alt="Preview"
                      rounded
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}

                  <Button
                    type="button"
                    variant="primary"
                    onClick={pickImageHandler2}
                    style={{ marginTop: "20px" }}
                  >
                    image Stade adulte
                  </Button>
                </div>
                {!isValid2 && <p></p>}
              </div>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Description stade adulte</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="descriptionAdulte"
                  required
                  onChange={onchange}
                />
              </Form.Group>

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
                    image stade avancé
                  </Button>
                </div>
                {!isValid && <p></p>}
              </div>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Description stade avancé</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="descriptionAvance"
                  required
                  onChange={onchange}
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Moyens de lutte</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="lutte"
                  required
                  onChange={onchange}
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Type de lutte</Form.Label>
                <Form.Control
                  as="select"
                  placeholder=""
                  name="typeLutte"
                  onChange={onchange}
                  required
                >
                  <option value="culturale">Lutte culturale</option>
                  <option value="preventive">Lutte préventive</option>
                  <option value="chimique">Lutte chimique</option>
                </Form.Control>
              </Form.Group>
              {typeLutte == "chimique" && (
                <Form.Group controlId="formGridAddress2">
                  <Form.Label>Herbicide</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder=""
                    name="herbicide"
                    onChange={onchange}
                    required
                  >
                    {list &&
                      list.map((row) => (
                        <option value={row._id}>{row.nom}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              )}

              <Button variant="primary" type="submit">
                Envoyer
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Responce;
