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
import SpellCommentUpdate from "../comments/SpellCommentUpdate";
import upperCase from "../../helper/UpperCase";
import Accordion from "react-bootstrap/Accordion";
import Stars from "../../assets/3stars.svg";
import APIURL from "../../helper/environment";

class Spells extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      comment: "",
      createModal: false,
      comments: [],
      id: "",
      spellData: [],
      spellId: 0,
      name: "",
      updateModal: true,
      commentData: {},
      update: false,
      toggleCommentAccordion: false,
      collapsed: true,
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

  displaySpells = async () => {
    fetch(`${APIURL}/spells/`)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({ spellData: jsonData });
      });
  };

  componentDidMount = () => {
    this.displaySpells();
  };

  // search results
  fetchSpells = () => {
    fetch(`${APIURL}/spells/${this.state.searchTerm}`)
      .then((resp) => resp.json())
      .then((jsonData) => {
        console.log(jsonData);
        if (jsonData) {
          this.setState({
            searchResults: [jsonData],
            spellId: jsonData.id,
            comments: jsonData.comments,
          });
        }
      });
  };

  commentSubmit = (spellId) => {
    console.log(this.state.spellId);
    fetch(`${APIURL}/comment/create/spells/${spellId}`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          comment: this.state.comment,
          spellId: this.state.spellId,
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
    fetch(`${APIURL}/comment/delete/spells/${id}`, {
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
      <div className="spells-wrapper">
        <input
          className="search-input .z-depth-4"
          placeholder="Search Spells"
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
              this.fetchSpells();
            }
          }}
        />
        {this.state.searchResults.length > 0 ? (
          <div>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col md="3" className="mt-5 px-5 d-flex justify-content-center">
                <Card
                  className="text-center card col mb-6 .z-depth-4 d-flex justify-content-center"
                  style={{
                    backgroundColor: "white",
                    border: "#7400B8 2px solid",
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
                        src={Stars}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-42px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-45deg)",
                        }}
                        alt={Stars}
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
                          className="card-title .z-depth-4"
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
                          {this.state.searchResults[0].type ? (
                            <h5>
                              <strong>Type:</strong>{" "}
                              {this.state.searchResults[0].type}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].pronunciation ? (
                            <h5>
                              <strong>Pronunciation:</strong>
                              {this.state.searchResults[0].pronunciation}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].use ? (
                            <h5>
                              <strong>Use:</strong>{" "}
                              {this.state.searchResults[0].use}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].etymology ? (
                            <h5>
                              <strong>Etymology:</strong>{" "}
                              {this.state.searchResults[0].etymology}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].appearances ? (
                            <h5>
                              <strong>Appearances:</strong>{" "}
                              {this.state.searchResults[0].appearances}
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
                            <Accordion.Header className="accordion-header">
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
                                          // style={{
                                          //   color: "#7400B8",
                                          //   fontWeight: "bold",
                                          //   fontSize: "10px",
                                          //   marginLeft: "10px",
                                          //   textAlign: "center",
                                          // }}
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
          <ModalBody className="comment-modal .z-depth-4">
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
                this.commentSubmit(this.state.spellId);
              }}
            />
          </ModalFooter>
        </Modal>
        <SpellCommentUpdate
          modalOpen={this.state.update}
          toggle={this.toggleUpdate}
          commentData={this.state.commentData}
          token={this.props.token}
        />
        <Row className="pl-0 pl-sm-0 pl-md-3 pl-lg-4 pl-xl-5">
          {this.state.spellData?.map((spell) => {
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
                      className="container-spells-display-image"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={Stars}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-42px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-45deg)",
                        }}
                        alt={Stars}
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
                          <strong>{spell.name}</strong>
                        </CardTitle>
                        <CardText
                          className="card-text"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 5,
                          }}
                        >
                          {spell.type ? (
                            <h5>
                              <strong>Type:</strong> {spell.type}
                            </h5>
                          ) : null}
                          {spell.pronunciation ? (
                            <h5>
                              <strong>pronunciation:</strong>{" "}
                              {spell.pronunciation}
                            </h5>
                          ) : null}
                          {spell.use ? (
                            <h5>
                              <strong>Use:</strong> {spell.use}
                            </h5>
                          ) : null}
                          {spell.etymology ? (
                            <h5>
                              <strong>Etymology:</strong> {spell.etymology}
                            </h5>
                          ) : null}
                          {spell.appearances ? (
                            <h5>
                              <strong>Appearances:</strong> {spell.appearances}
                            </h5>
                          ) : null}
                        </CardText>
                      </div>
                      <div>
                        <Button
                          className="comment-button .z-depth-4"
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
                            this.setState({ spellId: spell.id });
                            this.toggleCreate();
                          }}
                        >
                          Comment
                        </Button>
                        <div className="accordion-container mt-2">
                          <Accordion flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>View Comments</Accordion.Header>
                              {spell.comments.length > 0 ? (
                                <div className="container-spell-display">
                                  <Accordion.Body>
                                    {spell.comments.map((comment) => (
                                      <strong>
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
                                          {comment.userId ==
                                          localStorage.getItem("userId") ? (
                                            <AiOutlineClose
                                              className="close-icon"
                                              // style={{
                                              //   color: "#7400B8",
                                              //   fontWeight: "bold",
                                              //   fontSize: "13px",
                                              //   marginLeft: "15px",
                                              //   textAlign: "center",
                                              // }}
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

export default Spells;
