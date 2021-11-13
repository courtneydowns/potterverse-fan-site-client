import React, { Component } from "react";
import {
  Button,
  Form,
  Modal,
  FormGroup,
  Label,
  Input,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import APIURL from "../../helper/environment";

class WandWoodCommentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editComment: this.props.commentData?.comment ?? "",
      commentId: this.props.commentData?.id ?? 0,
    };
  }

  toggleUpdate = () => {
    this.setState({
      updateModal: !this.state.updateModal,
    });
  };

  handleUpdateComment = (event) => {
    this.setState({ editComment: event.target.value });
  };

  toggleCloseModal = () => {
    this.setState({ closeModal: !this.state.closeModal });
  };

  commentUpdate = () => {
    fetch(`${APIURL}/comment/edit/wand-wood/${this.state.commentId}`, {
      method: "PUT",
      body: JSON.stringify({
        comment: {
          comment: this.state.editComment,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        // this.props.fetchMine();
        // this.props.fetchComments();
        this.props.toggle();
        this.props.comment(logData);
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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.commentData !== this.props.commentData) {
      this.setState({
        editComment: this.props.commentData?.comment ?? "",
        commentId: this.props.commentData?.id ?? 0,
      });
    }
  };

  render() {
    return (
      <Modal centered isOpen={this.props.modalOpen}>
        <ModalHeader toggle={this.props.toggle}>
          {" "}
          <h1
            style={{
              fontFamily: "HarryP",
              color: "#7400B8",
              marginTop: "10px",
              height: "40px",
            }}
          >
            Update Comment
          </h1>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              style={{
                marginBottom: "-20px",
                marginTop: "10px",
                fontFamily: "Lumos",
                color: "#575C66",
                border: "2px solid #7400B8",
              }}
              name="edit-comment"
              placeholder="Edit Comment"
              type="textarea"
              name="label"
              value={this.state.editComment}
              onChange={this.handleUpdateComment}
            />
          </FormGroup>
          <ModalFooter>
            <input
              className="update-comment-submit"
              style={{
                marginBottom: "-10px",
                fontFamily: "HarryP",
                fontSize: "22px",
                width: "100%",
                height: "43px",
                color: "white",
                borderRadius: "100px",
                backgroundColor: "#7400B8",
                letterSpacing: "0.25rem",
                transition: "background-color 0.25s ease",
                // width: "100px",
              }}
              type="submit"
              value="UPDATE"
              onClick={() => {
                this.commentUpdate(this.state.commentId);
              }}
            />
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  }
}

export default WandWoodCommentUpdate;
