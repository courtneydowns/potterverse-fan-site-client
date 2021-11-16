import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import APIURL from "../../helper/environment";

class DeleteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      profileId: 0,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleDeleteProfile = () => {
    console.log(this.props.profileData.id);
    fetch(`${APIURL}/profile/delete/${this.props.profileData.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.setState({ modal: false });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <RiDeleteBin6Line
          className="delete-profile-icon"
          onClick={this.toggle}
          style={{ fontSize: "29px", color: "#7400B8" }}
        />
        <Modal
          centered
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="delete-profile-modal"
          contentClassName="custom-modal-style"
        >
          <ModalHeader toggle={this.toggle}>
            <h1
              style={{
                fontFamily: "HarryP",
                color: "#7400B8",
                marginTop: "10px",
                height: "40px",
              }}
            >
              Delete Profile
            </h1>
          </ModalHeader>
          <ModalBody
            style={{
              fontFamily: "Lumos",
              fontSize: "22px",
              color: "#f43b86",
              marginTop: "20px",
            }}
          >
            Are you sure you want to delete your profile?
          </ModalBody>
          <Button
            className="delete-profile-button"
            style={{
              marginBottom: "10px",
              fontFamily: "HarryP",
              fontSize: "23px",
              height: "43px",
              borderRadius: "100px",
              backgroundColor: "#7400B8",
              letterSpacing: "0.1rem",
              transition: "background-color 0.25s ease",
            }}
            onClick={this.handleDeleteProfile}
          >
            DELETE PROFILE
          </Button>
        </Modal>
      </div>
    );
  }
}

export default DeleteProfile;
