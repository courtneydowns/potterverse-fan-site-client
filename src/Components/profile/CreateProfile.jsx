import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import APIURL from "../../helper/environment";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      house: "",
      favoriteHarryPotterBook: "",
      favoriteHarryPotterMovie: "",
      favoriteHarryPotterCharacter: "",
      modal: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  dropdownToggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/profile/create`, {
      method: "POST",
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
        Authorization: this.props.sessionToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ modal: false });
        this.props.updateToken(this.props.sessionToken);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  render() {
    return (
      <Modal
        centered
        isOpen={this.state.modal}
        toggle={this.toggle}
        className="create-profile-modal"
      >
        <ModalHeader toggle={this.toggle}>
          {/* <img
            src={SortingHat}
            style={{
              height: "80px",
              marginBottom: "500px",
              marginTop: "-53px",
              position: "absolute",
              marginLeft: "-68px",
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
            Create Profile
          </h1>
        </ModalHeader>
        <ModalBody className="create-profile-modal">
          <FormGroup>
            <Input
              type="textarea"
              rows="5"
              placeholder="Bio"
              name="bio"
              value={this.state.bio}
              onChange={(e) => this.setState({ bio: e.target.value })}
              required
              style={{
                fontFamily: "Lumos",
                fontSize: "18px",
                color: "#575C66",
                border: "#7400B8 solid 2px",
                marginTop: "15px",
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
              required
              style={{
                fontFamily: "Lumos",
                fontSize: "18px",
                color: "#575C66",
                border: "#7400B8 solid 2px",
                marginTop: "20px",
              }}
            >
              <option value="" disabled defaultValue>
                Select Your House
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
                marginTop: "18px",
              }}
              onChange={(e) =>
                this.setState({ favoriteHarryPotterBook: e.target.value })
              }
              required
            >
              <option value="" disabled defaultValue>
                Select your Favorite Book
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
                marginTop: "18px",
              }}
              onChange={(e) =>
                this.setState({ favoriteHarryPotterMovie: e.target.value })
              }
              required
            >
              <option value="" disabled defaultValue>
                Select your Favorite Movie
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
              type="text"
              name="label"
              style={{
                fontFamily: "Lumos",
                fontSize: "18px",
                color: "#575C66",
                border: "#7400B8 solid 2px",
                marginTop: "18px",
              }}
              onChange={(e) =>
                this.setState({ favoriteHarryPotterCharacter: e.target.value })
              }
              required
            />
          </FormGroup>
          <Button
            className="create-profile-button"
            style={{
              backgroundColor: "#7400B8",
              letterSpacing: "0.25rem",
              transition: "background-color 0.25s ease",
              borderRadius: "15px",
              fontFamily: "HarryP",
              fontSize: "25px",
              color: "white",
              width: "100%",
            }}
            onClick={this.handleSubmit}
          >
            SUBMIT
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateProfile;
