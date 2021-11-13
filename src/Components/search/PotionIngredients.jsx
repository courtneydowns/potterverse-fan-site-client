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
import PotionIngredientCommentUpdate from "../comments/PotionIngredientCommentUpdate";
import upperCase from "../../helper/UpperCase";
import Accordion from "react-bootstrap/Accordion";
import Cauldron from "../../assets/cauldron_icon.svg";
import APIURL from "../../helper/environment";

class PotionIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      comment: "",
      createModal: false,
      comments: [],
      id: "",
      potionIngredientData: [],
      potionIngredientId: 0,
      name: "",
      updateModal: true,
      commentData: {},
      update: false,
    };

    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
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

  displayPotionIngredients = async () => {
    fetch(`${APIURL}/potion-ingredients/`)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({ potionIngredientData: jsonData });
      });
  };

  componentDidMount = () => {
    this.displayPotionIngredients();
  };

  // search results
  fetchPotionIngredients = () => {
    fetch(`${APIURL}/potion-ingredients/${this.state.searchTerm}`)
      .then((resp) => resp.json())
      .then((jsonData) => {
        console.log(jsonData);
        if (jsonData) {
          this.setState({
            searchResults: [jsonData],
            potionIngredientId: jsonData.id,
            comments: jsonData.comments,
          });
        }
      });
  };

  commentSubmit = (potionIngredientId) => {
    console.log(this.state.potionIngredientId);
    fetch(`${APIURL}/comment/create/potion-ingredients/${potionIngredientId}`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          comment: this.state.comment,
          potionIngredientId: this.state.potionIngredientId,
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
    fetch(`${APIURL}/comment/delete/potion-ingredients/${id}`, {
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
      <div className="potion-ingredient-wrapper">
        <input
          className="search-input .z-depth-4"
          placeholder="Search Potion Ingredients"
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
              this.fetchPotionIngredients();
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
                        src={Cauldron}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-53px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-45deg)",
                        }}
                        alt={Cauldron}
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
                          {this.state.searchResults[0].alternative_name ? (
                            <h5>
                              <strong>Alternative Name:</strong>{" "}
                              {this.state.searchResults[0].alternative_name}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].taken_from ? (
                            <h5>
                              <strong>Taken From:</strong>
                              {this.state.searchResults[0].taken_from}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].endemic_to ? (
                            <h5>
                              <strong>Endemic To:</strong>{" "}
                              {this.state.searchResults[0].endemic_to}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].natural_environment ? (
                            <h5>
                              <strong>Natural Environment:</strong>{" "}
                              {this.state.searchResults[0].natural_environment}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].sentience ? (
                            <h5>
                              <strong>Sentience:</strong>{" "}
                              {this.state.searchResults[0].sentience}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].stem ? (
                            <h5>
                              <strong>Stem:</strong>{" "}
                              {this.state.searchResults[0].stem}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].leaves ? (
                            <h5>
                              <strong>Leaves:</strong>{" "}
                              {this.state.searchResults[0].leaves}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].flowers ? (
                            <h5>
                              <strong>Flowers:</strong>{" "}
                              {this.state.searchResults[0].flowers}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].properties ? (
                            <h5>
                              <strong>Properties:</strong>{" "}
                              {this.state.searchResults[0].properties}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0].distinction ? (
                            <h5>
                              <strong>Distinction:</strong>{" "}
                              {this.state.searchResults[0].distinction}
                            </h5>
                          ) : null}
                          {this.state.searchResults[0]
                            .physical_characteristics ? (
                            <h5>
                              <strong>Physical Characteristics:</strong>{" "}
                              {
                                this.state.searchResults[0]
                                  .physical_characteristics
                              }
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
            {/* <img
              src={Cauldron}
              style={{
                height: "80px",
                marginBottom: "500px",
                marginTop: "-55px",
                position: "absolute",
                marginLeft: "-60px",
                transform: "rotate(-45deg)",
              }}
            /> */}
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
                this.commentSubmit(this.state.potionIngredientId);
              }}
            />
          </ModalFooter>
        </Modal>
        <PotionIngredientCommentUpdate
          modalOpen={this.state.update}
          toggle={this.toggleUpdate}
          commentData={this.state.commentData}
          token={this.props.token}
        />
        <Row className="pl-0 pl-sm-0 pl-md-3 pl-lg-4 pl-xl-5">
          {this.state.potionIngredientData?.map((potionIngredient) => {
            return (
              <Col md="3" className="mt-5 px-5 d-flex justify-content-center">
                <Card
                  className="card col mb-6 .z-depth-4"
                  style={{
                    backgroundColor: "white",
                    border: "#7400b8 2px solid",
                  }}
                >
                  <CardBody>
                    <div
                      className="container-potion-ingredient-display-image"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={Cauldron}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-53px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-45deg)",
                        }}
                        alt={Cauldron}
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
                          <strong>{potionIngredient.name}</strong>
                        </CardTitle>
                        <CardText
                          className="card-text"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 5,
                          }}
                        >
                          {potionIngredient.alternative_name ? (
                            <h5>
                              <strong>Alternative Name:</strong>{" "}
                              {potionIngredient.alternative_name}
                            </h5>
                          ) : null}
                          {potionIngredient.taken_from ? (
                            <h5>
                              <strong>Taken From:</strong>{" "}
                              {potionIngredient.taken_from}
                            </h5>
                          ) : null}
                          {potionIngredient.endemic_to ? (
                            <h5>
                              <strong>Endemic To:</strong>{" "}
                              {potionIngredient.endemic_to}
                            </h5>
                          ) : null}
                          {potionIngredient.natural_environment ? (
                            <h5>
                              <strong>Natural Environment:</strong>{" "}
                              {potionIngredient.natural_environment}
                            </h5>
                          ) : null}
                          {potionIngredient.sentience ? (
                            <h5>
                              <strong>Sentience:</strong>{" "}
                              {potionIngredient.sentience}
                            </h5>
                          ) : null}
                          {potionIngredient.stem ? (
                            <h5>
                              <strong>Stem:</strong> {potionIngredient.stem}
                            </h5>
                          ) : null}
                          {potionIngredient.leaves ? (
                            <h5>
                              <strong>Leaves:</strong> {potionIngredient.leaves}
                            </h5>
                          ) : null}
                          {potionIngredient.flowers ? (
                            <h5>
                              <strong>Flowers:</strong>{" "}
                              {potionIngredient.flowers}
                            </h5>
                          ) : null}
                          {potionIngredient.properties ? (
                            <h5>
                              <strong>Properties:</strong>{" "}
                              {potionIngredient.properties}
                            </h5>
                          ) : null}
                          {potionIngredient.distinction ? (
                            <h5>
                              <strong>Distinction:</strong>{" "}
                              {potionIngredient.distinction}
                            </h5>
                          ) : null}
                          {potionIngredient.physical_characteristics ? (
                            <h5>
                              <strong>Physical Characteristics:</strong>{" "}
                              {potionIngredient.physical_characteristics}
                            </h5>
                          ) : null}
                          {potionIngredient.status ? (
                            <h5>
                              <strong>Status:</strong> {potionIngredient.status}
                            </h5>
                          ) : null}
                          {potionIngredient.usage ? (
                            <h5>
                              <strong>Usage:</strong> {potionIngredient.usage}
                            </h5>
                          ) : null}
                          {potionIngredient.used_in ? (
                            <h5>
                              <strong>Used In:</strong>{" "}
                              {potionIngredient.used_in}
                            </h5>
                          ) : null}
                          {potionIngredient.appearances ? (
                            <h5>
                              <strong>Appearances:</strong>{" "}
                              {potionIngredient.appearances}
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
                            this.setState({
                              potionIngredientId: potionIngredient.id,
                            });
                            this.toggleCreate();
                          }}
                        >
                          Comment
                        </Button>
                        <div className="accordion-container mt-2">
                          <Accordion flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>View Comments</Accordion.Header>
                              {potionIngredient.comments.length > 0 ? (
                                <div className="container-potion-ingredient-display">
                                  <Accordion.Body>
                                    {potionIngredient.comments.map(
                                      (comment) => (
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
                                        </strong>
                                      )
                                    )}
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

export default PotionIngredients;
