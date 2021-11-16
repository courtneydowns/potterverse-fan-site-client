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
import WandWoodCommentUpdate from "../comments/WandWoodCommentUpdate";
import upperCase from "../../helper/UpperCase";
import Accordion from "react-bootstrap/Accordion";
import Wand from "../../assets/wand_fleur.svg";
import APIURL from "../../helper/environment";

class WandWoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      comment: "",
      createModal: false,
      comments: [],
      id: "",
      wandWoodData: [],
      wandWoodId: 0,
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

  displayWandWoods = async () => {
    fetch(`${APIURL}/wand-wood/`)
      .then((res) => res.json())
      .then((jsonData) => {
        this.setState({ wandWoodData: jsonData });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  componentDidMount = () => {
    this.displayWandWoods();
  };

  // search results
  fetchWandWoods = () => {
    fetch(`${APIURL}/wand-wood/${this.state.searchTerm}`)
      .then((resp) => resp.json())
      .then((jsonData) => {
        if (jsonData) {
          this.setState({
            searchResults: [jsonData],
            wandWoodId: jsonData.id,
            comments: jsonData.comments,
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  commentSubmit = (wandWoodId) => {
    console.log(this.state.wandWoodId);
    fetch(`${APIURL}/comment/create/wand-wood/${wandWoodId}`, {
      method: "POST",
      body: JSON.stringify({
        comment: {
          comment: this.state.comment,
          wandWoodId: this.state.wandWoodId,
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
    fetch(`${APIURL}/comment/delete/wand-wood/${id}`, {
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
      <div className="wand-wood-wrapper">
        <input
          className="search-input .z-depth-4"
          placeholder="Search Wand Woods"
          onInput={(ev) =>
            this.setState({
              searchTerm: upperCase(ev.target.value),
            })
          }
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            border: "2px solid #DAA520",
            height: "40px",
            width: "250px",
            fontFamily: "Lumos",
          }}
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              this.fetchWandWoods();
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
                        src={Wand}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-53px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-135deg)",
                        }}
                        alt={Wand}
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
                          <strong>
                            {this.state.searchResults[0].wand_wood}
                          </strong>
                        </CardTitle>
                        <CardText
                          className="card-text"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 5,
                          }}
                        >
                          {this.state.searchResults[0].notes ? (
                            <h5>
                              <strong>Notes:</strong>{" "}
                              {this.state.searchResults[0].notes}
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
                              Comments
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
                this.commentSubmit(this.state.wandWoodId);
              }}
            />
          </ModalFooter>
        </Modal>
        <WandWoodCommentUpdate
          modalOpen={this.state.update}
          toggle={this.toggleUpdate}
          commentData={this.state.commentData}
          token={this.props.token}
        />
        <Row className="pl-0 pl-sm-0 pl-md-3 pl-lg-4 pl-xl-5">
          {this.state.wandWoodData?.map((wandWood) => {
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
                      className="container-wand-wood-display-image"
                      style={{
                        position: "relative",
                      }}
                    >
                      <img
                        src={Wand}
                        style={{
                          height: "80px",
                          marginBottom: "500px",
                          marginTop: "-53px",
                          position: "absolute",
                          marginLeft: "-225px",
                          transform: "rotate(-45deg)",
                        }}
                        alt={Wand}
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
                          <strong>{wandWood.wand_wood}</strong>
                        </CardTitle>
                        <CardText
                          className="card-text"
                          style={{
                            color: "#7400B8",
                            fontFamily: "Lumos",
                            paddingTop: 5,
                          }}
                        >
                          {wandWood.notes ? (
                            <h5>
                              <strong>Notes:</strong> {wandWood.notes}
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
                            this.setState({ wandWoodId: wandWood.id });
                            this.toggleCreate();
                          }}
                        >
                          Comment
                        </Button>
                        <div className="accordion-container mt-2">
                          <Accordion flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>View Comments</Accordion.Header>
                              {wandWood.comments.length > 0 ? (
                                <div className="container-wand-wood-display">
                                  <Accordion.Body>
                                    {wandWood.comments.map((comment) => (
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

export default WandWoods;
