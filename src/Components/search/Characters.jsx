import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Row,
} from "reactstrap";
import { AiOutlineClose } from "react-icons/ai";
import CharacterCommentUpdate from "../comments/CharacterCommentUpdate";
import upperCase from "../../helper/UpperCase";
import Accordion from "react-bootstrap/Accordion";
import LunaGlasses from "../../assets/luna-glasses.svg";
import APIURL from "../../helper/environment";

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      comment: "",
      createModal: false,
      comments: [],
      id: "",
      characterData: [],
      characterId: 0,
      name: "",
      updateModal: true,
      commentData: {},
      update: false,
      toggleCommentAccordion: false,
    };

    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.toggleComment = this.toggleComment.bind(this);
  }

  toggleCreate() {
    this.setState({
      createModal: !this.state.createModal,
    });
  }

  toggleUpdate() {
    this.setState({
      update: !this.state.update,
    });
  }

  saveCommentData(data) {
    this.setState({ commentData: data });
  }

  handleChangeComment(event) {
    this.setState({ comment: event.target.value });
  }

  toggleComment = () => {
    this.setState({
      toggleCommentAccordion: !this.state.toggleCommentAccordion,
    });
  };

  displayCharacters = async () => {
    fetch(`${APIURL}/characters/`)
      .then((res) => res.json())
      .then((jsonData) => {
        this.setState({ characterData: jsonData });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  componentDidMount = () => {
    this.displayCharacters();
  };

  // search results
  fetchCharacters = () => {
    fetch(`${APIURL}/characters/${this.state.searchTerm}`)
      .then((resp) => resp.json())
      .then((jsonData) => {
        if (jsonData) {
          this.setState({
            searchResults: [jsonData],
            characterId: jsonData.id,
            comments: jsonData.comments,
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  commentSubmit = (characterId) => {
    console.log(this.state.characterId);
    fetch(`${APIURL}/comment/create/characters/${characterId}`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          comment: this.state.comment,
          characterId: this.state.characterId,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.toggleCreate();
        this.setState({ comment: "" });
      })
      .catch((error) => {
        console.log("Error", error);
      });
    this.makeItWork();
  };

  makeItWork = () => {
    setTimeout(() => {
      window.location.reload();
    });
  };

  commentDelete = (id) => {
    console.log(id);
    fetch(`${APIURL}/comment/delete/characters/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    }).catch((error) => {
      console.log("Error", error);
    });
    this.makeItWork();
  };

  render() {
    return (
      <div className="character-wrapper">
        <input
          className="search-input"
          placeholder="Search Characters"
          onInput={(ev) =>
            this.setState({
              searchTerm: upperCase(ev.target.value),
            })
          }
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            border: "2px solid #daa520",
            width: "250px",
            height: "40px",
            fontFamily: "Lumos",
            fontSize: "20px",
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              this.fetchCharacters();
            }
          }}
        />
        {this.state.searchResults.length > 0 ? (
          <div>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col md="3" className="mt-5 px-5 d-flex justify-content-center">
                <Card
                  className="text-center card col mb-6 .d-flex justify-content-center"
                  style={{
                    backgroundColor: "white",
                    border: "#7400b8 2px solid",
                  }}
                >
                  <CardBody>
                    <div
                      className="container-character-display-image"
                      style={{
                        position: "relative",
                      }}
                    >
                      <img
                        src={LunaGlasses}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-53px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-45deg)",
                        }}
                        alt={LunaGlasses}
                      />
                    </div>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <CardTitle
                          tag="h2"
                          className="card-title"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 18,
                          }}
                        >
                          <strong>{this.state.searchResults[0].name}</strong>
                        </CardTitle>
                        <CardText
                          className="card-text"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 5,
                          }}
                        >
                          {this.state.searchResults[0].born ? (
                            <h5>
                              <strong>Born:</strong>{" "}
                              {this.state.searchResults[0].born}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].status ? (
                            <h5>
                              <strong>Status:</strong>
                              {this.state.searchResults[0].status}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].gender ? (
                            <h5>
                              <strong>Gender:</strong>{" "}
                              {this.state.searchResults[0].gender}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].nationality ? (
                            <h5>
                              <strong>Nationality:</strong>{" "}
                              {this.state.searchResults[0].nationality}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].blood_status ? (
                            <h5>
                              <strong>Blood Status:</strong>{" "}
                              {this.state.searchResults[0].blood_status}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].eye_color ? (
                            <h5>
                              <strong>Eye Color:</strong>{" "}
                              {this.state.searchResults[0].eye_color}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].hair_color ? (
                            <h5>
                              <strong>Hair Color:</strong>{" "}
                              {this.state.searchResults[0].hair_color}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].house ? (
                            <h5>
                              <strong>House:</strong>{" "}
                              {this.state.searchResults[0].house}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].wand ? (
                            <h5>
                              <strong>Wand:</strong>{" "}
                              {this.state.searchResults[0].wand}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].patronus ? (
                            <h5>
                              <strong>Patronus:</strong>{" "}
                              {this.state.searchResults[0].patronus}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].boggart ? (
                            <h5>
                              <strong>Boggart:</strong>{" "}
                              {this.state.searchResults[0].boggart}
                            </h5>
                          ) : null}
                        </CardText>
                      </div>
                      <div>
                        <Button
                          className="comment-button"
                          style={{
                            backgroundColor: "#7400B8",
                            letterSpacing: "0.1rem",
                            transition: "background-color 0.25s ease",
                            borderRadius: "15px",
                            fontFamily: "HarryP",
                            height: "46px",
                            fontSize: "25px",
                            color: "white",
                            marginTop: "20px",
                          }}
                          onClick={this.toggleCreate}
                        >
                          Comment
                        </Button>
                      </div>
                      <div className="accordion-container mt-2">
                        <Accordion flush>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header className="comment-header">
                              View Comments
                            </Accordion.Header>
                            {this.state.comments.length > 0 ? (
                              <>
                                <Accordion.Body>
                                  {this.state.comments.map((comment) => (
                                    <p
                                      className="comment-display"
                                      style={{
                                        color: "#7400B8",
                                        fontFamily: "Lumos",
                                        marginBottom: "5px",
                                        fontWeight: "bold",
                                        fontSize: "17px",
                                      }}
                                      onClick={() => {
                                        if (
                                          comment.userId ==
                                          localStorage.getItem("userId")
                                        ) {
                                          this.saveCommentData(comment);
                                          this.toggleUpdate();
                                        }
                                      }}
                                    >
                                      {comment.comment}

                                      {localStorage.getItem("isAdmin") ===
                                        "true" ||
                                      comment.userId ==
                                        localStorage.getItem("userId") ? (
                                        <AiOutlineClose
                                          className="close-icon"
                                          onClick={() =>
                                            this.commentDelete(comment.id)
                                          }
                                        />
                                      ) : null}
                                    </p>
                                  ))}
                                </Accordion.Body>
                              </>
                            ) : (
                              <></>
                            )}
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <></>
        )}
        <Modal centered isOpen={this.state.createModal}>
          <ModalHeader toggle={this.toggleCreate}>
            <h1
              style={{
                fontFamily: "HarryP",
                color: "#7400B8",
                marginTop: "10px",
                height: "40px",
              }}
            >
              Comment
            </h1>
          </ModalHeader>
          <ModalBody className="comment-modal">
            <FormGroup>
              <Input
                style={{
                  fontFamily: "Lumos",
                  color: "#575C66",
                  border: "#7400B8 2px solid",
                }}
                placeholder="Comment"
                type="text"
                name="label"
                value={this.state.comment}
                onChange={this.handleChangeComment}
                className="comment-body"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <input
              type="submit"
              value="SUBMIT"
              className="comment-submit-button .z-depth-4"
              style={{
                backgroundColor: "#7400B8",
                color: "white",
                width: "100%",
                borderRadius: "100px",
                fontFamily: "HarryP",
                height: "45px",
                letterSpacing: "0.25rem",
                fontSize: "23px",
                transition: "background-color 0.25s ease",
                marginTop: "10px",
              }}
              onClick={() => {
                this.commentSubmit(this.state.characterId);
              }}
            />
          </ModalFooter>
        </Modal>
        <CharacterCommentUpdate
          modalOpen={this.state.update}
          toggle={this.toggleUpdate}
          commentData={this.state.commentData}
          token={this.props.token}
        />
        <Row className="pl-0 pl-sm-0 pl-md-3 pl-lg-4 pl-xl-5">
          {this.state.characterData?.map((character) => {
            return (
              <Col md="3" className="mt-5 px-5 d-flex justify-content-center">
                <Card
                  className="card col mb-6"
                  style={{
                    backgroundColor: "white",
                    border: "#7400b8 2px solid",
                  }}
                >
                  <CardBody>
                    <div
                      className="container-character-display-image"
                      style={{
                        position: "relative",
                      }}
                    >
                      <img
                        src={LunaGlasses}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-53px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-45deg)",
                        }}
                        alt={LunaGlasses}
                      />
                    </div>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <CardTitle
                          tag="h2"
                          className="card-title"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 18,
                          }}
                        >
                          <strong>{character.name}</strong>
                        </CardTitle>
                        <CardText
                          className="card-text"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 5,
                          }}
                        >
                          {character.born ? (
                            <h5>
                              <strong>Born:</strong> {character.born}
                            </h5>
                          ) : null}
                          {character.status ? (
                            <h5>
                              <strong>Status:</strong> {character.status}
                            </h5>
                          ) : null}
                          {character.gender ? (
                            <h5>
                              <strong>Gender:</strong> {character.gender}
                            </h5>
                          ) : null}
                          {character.nationality ? (
                            <h5>
                              <strong>Nationality:</strong>{" "}
                              {character.nationality}
                            </h5>
                          ) : null}
                          {character.blood_status ? (
                            <h5>
                              <strong>Blood Status:</strong>{" "}
                              {character.blood_status}
                            </h5>
                          ) : null}
                          {character.eye_color ? (
                            <h5>
                              <strong>Eye Color:</strong> {character.eye_color}
                            </h5>
                          ) : null}
                          {character.hair_color ? (
                            <h5>
                              <strong>Hair Color:</strong>{" "}
                              {character.hair_color}
                            </h5>
                          ) : null}
                          {character.house ? (
                            <h5>
                              <strong>House:</strong> {character.house}
                            </h5>
                          ) : null}
                          {character.wand ? (
                            <h5>
                              <strong>Wand:</strong> {character.wand}
                            </h5>
                          ) : null}
                          {character.patronus ? (
                            <h5>
                              <strong>Patronus:</strong> {character.patronus}
                            </h5>
                          ) : null}
                          {character.boggart ? (
                            <h5>
                              <strong>Boggart:</strong> {character.boggart}
                            </h5>
                          ) : null}
                        </CardText>
                      </div>
                      <div>
                        <Button
                          className="comment-button"
                          style={{
                            backgroundColor: "#7400B8",
                            letterSpacing: "0.1rem",
                            transition: "background-color 0.25s ease",
                            borderRadius: "15px",
                            fontFamily: "HarryP",
                            height: "46px",
                            fontSize: "25px",
                            color: "white",
                            marginTop: "20px",
                          }}
                          onClick={() => {
                            this.setState({ characterId: character.id });
                            this.toggleCreate();
                          }}
                        >
                          Comment
                        </Button>
                        <div className="accordion-container mt-2">
                          <Accordion flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>View Comments</Accordion.Header>
                              {character.comments.length > 0 ? (
                                <div className="container-character-display">
                                  <Accordion.Body>
                                    {character.comments.map((comment) => (
                                      <strong>
                                        <p
                                          className="comment-display"
                                          style={{
                                            color: "#7400B8",
                                            fontFamily: "Lumos",
                                            marginBottom: "15px",
                                            fontSize: "17px",
                                          }}
                                          onClick={() => {
                                            if (
                                              comment.userId ==
                                              localStorage.getItem("userId")
                                            ) {
                                              this.saveCommentData(comment);
                                              this.toggleUpdate();
                                            }
                                          }}
                                        >
                                          {comment.comment}
                                          {localStorage.getItem("isAdmin") ===
                                            "true" ||
                                          comment.userId ==
                                            localStorage.getItem("userId") ? (
                                            <AiOutlineClose
                                              className="close-icon"
                                              onClick={() =>
                                                this.commentDelete(comment.id)
                                              }
                                            />
                                          ) : null}
                                        </p>
                                      </strong>
                                    ))}
                                  </Accordion.Body>
                                </div>
                              ) : null}
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Characters;
