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
import { RiEditBoxLine } from "react-icons/ri";
import SortingHat from "../../assets/sorting-hat.svg";
import APIURL from "../../helper/environment";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: this.props.profileData.bio,
      house: this.props.profileData.house,
      favoriteHarryPotterBook: this.props.profileData.favoriteHarryPotterBook,
      favoriteHarryPotterMovie: this.props.profileData.favoriteHarryPotterMovie,
      favoriteHarryPotterCharacter: this.props.profileData.favoriteHarryPotterCharacter,
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleEditProfile = () => {
    fetch(`${APIURL}}/profile/edit`, {
      method: "PUT",
      body: JSON.stringify({
        profile: {
          bio: this.state.bio,
          house: this.state.house,
          favoriteHarryPotterBook: this.state.favoriteHarryPotterBook,
          favoriteHarryPotterMovie: this.state.favoriteHarryPotterMovie,
          favoriteHarryPotterCharacter: this.state.favoriteHarryPotterCharacter,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ modal: false });
        this.props.setProfileData(data.profile);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <RiEditBoxLine
          className="edit-profile-icon"
          style={{ fontSize: "30px", color: "#7400B8" }}
          onClick={this.toggle}
        />
        <Modal
          centered
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="edit-profile-modal"
        >
          <ModalHeader toggle={this.toggle}>
            <img
              src={SortingHat}
              style={{
                height: "80px",
                marginBottom: "500px",
                marginTop: "-53px",
                position: "absolute",
                marginLeft: "-60px",
                transform: "rotate(-45deg)",
              }}
            />
            <h1
              style={{
                fontFamily: "HarryP",
                color: "#7400B8",
                marginTop: "10px",
                height: "40px",
              }}
            >
              Update Your Profile
            </h1>
          </ModalHeader>
          <ModalBody className="edit-profile-modal">
            <FormGroup>
              <Input
                placeholder="bio"
                type="text"
                name="label"
                value={this.state.bio}
                onChange={(e) => this.setState({ bio: e.target.value })}
                style={{
                  fontFamily: "Lumos",
                  fontSize: "18px",
                  color: "#575C66",
                  border: "#7400B8 solid 2px",
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                name="house"
                value={this.state.house}
                required
                onChange={(e) => this.setState({ house: e.target.value })}
                style={{
                  fontFamily: "Lumos",
                  fontSize: "18px",
                  color: "#575C66",
                  border: "#7400B8 solid 2px",
                }}
              >
                <option value="" disabled defaultValue>
                  Select your house
                </option>
                <option>Gryffindor</option>
                <option>Hufflepuff</option>
                <option>Ravenclaw</option>
                <option>Slytherin</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                name="favorite-book"
                value={this.state.favoriteHarryPotterBook}
                required
                style={{
                  fontFamily: "Lumos",
                  fontSize: "18px",
                  color: "#575C66",
                  border: "#7400B8 solid 2px",
                }}
                onChange={(e) =>
                  this.setState({ favoriteHarryPotterBook: e.target.value })
                }
              >
                <option value="" disabled defaultValue>
                  Select your favorite book
                </option>
                <option>Harry Potter and the Sorcerer's Stone</option>
                <option>Harry Potter and the Chamber of Secrets</option>
                <option>Harry Potter and the Prisoner of Azkaban</option>
                <option>Harry Potter and the Goblet of Fire</option>
                <option>Harry Potter and the Order of the Phoenix</option>
                <option>Harry Potter and the Half-Blood Prince</option>
                <option>Harry Potter and the Deathly Hallows</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                name="favorite-movie"
                value={this.state.favoriteHarryPotterMovie}
                required
                style={{
                  fontFamily: "Lumos",
                  fontSize: "18px",
                  color: "#575C66",
                  border: "#7400B8 solid 2px",
                }}
                onChange={(e) =>
                  this.setState({ favoriteHarryPotterMovie: e.target.value })
                }
              >
                <option value="" disabled defaultValue>
                  Select your favorite movie
                </option>
                <option>Harry Potter and the Sorcerer's Stone</option>
                <option>Harry Potter and the Chamber of Secrets</option>
                <option>Harry Potter and the Prisoner of Azkaban</option>
                <option>Harry Potter and the Goblet of Fire</option>
                <option>Harry Potter and the Order of the Phoenix</option>
                <option>Harry Potter and the Half-Blood Prince</option>
                <option>Harry Potter and the Deathly Hallows: Part 1</option>
                <option>Harry Potter and the Deathly Hallows: Part 2</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Favorite Harry Potter Character"
                value={this.state.favoriteHarryPotterCharacter}
                type="text"
                name="label"
                style={{
                  fontFamily: "Lumos",
                  fontSize: "18px",
                  color: "#575C66",
                  border: "#7400B8 solid 2px",
                }}
                onChange={(e) =>
                  this.setState({
                    favoriteHarryPotterCharacter: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <Button
              className="edit-profile-button"
              style={{
                marginTop: "10px",
                fontFamily: "HarryP",
                fontSize: "23px",
                width: "100%",
                height: "43px",
                borderRadius: "100px",
                letterSpacing: "0.25rem",
                backgroundColor: "#7400B8",
              }}
              onClick={this.handleEditProfile}
            >
              SUBMIT
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditProfile;
