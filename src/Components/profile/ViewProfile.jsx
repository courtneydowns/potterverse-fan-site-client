import React, { Component } from "react";
import EditProfile from "./EditProfile";
import DeleteProfile from "./DeleteProfile";
import Gryffindor from "../../assets/Gryffindor.svg";
import Hufflepuff from "../../assets/Hufflepuff-Crest-Outline.svg";
import Ravenclaw from "../../assets/Ravenclaw-Crest-Outline.svg";
import Slytherin from "../../assets/Slytherin-Crest-Outline.svg";
import APIURL from "../../helper/environment";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
    };
  }

  getProfile = () => {
    fetch(`${APIURL}/profile/`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        this.setState({ profileData: jsonData });
      });
  };

  componentDidMount = () => {
    this.getProfile();
  };

  setProfileData = (data) => {
    this.setState({ profileData: data });
  };

  house = () => {
    if (this.state.profileData.house === "Gryffindor") {
      return (
        <img
          src={Gryffindor}
          style={{
            height: "185px",
          }}
        />
      );
    } else if (this.state.profileData.house === "Hufflepuff") {
      return (
        <img
          src={Hufflepuff}
          style={{
            height: "185px",
          }}
        />
      );
    } else if (this.state.profileData.house === "Ravenclaw") {
      return (
        <img
          src={Ravenclaw}
          style={{
            height: "185px",
          }}
        />
      );
    } else if (this.state.profileData.house === "Slytherin") {
      return (
        <img
          src={Slytherin}
          style={{
            height: "185px",
          }}
        />
      );
    } else {
      return <></>;
    }
  };

  render() {
    const {
      bio,
      house,
      favoriteHarryPotterBook,
      favoriteHarryPotterMovie,
      favoriteHarryPotterCharacter,
    } = this.state.profileData;
    return (
      <div>
        <h1
          className="profile-bio-header"
          style={{ color: "white", fontFamily: "Lumos", marginTop: "50px" }}
        >
          <strong>{bio}</strong>
        </h1>
        <h2 style={{ color: "white", fontFamily: "Lumos", marginTop: "10px" }}>
          {this.house()}
          <strong>{house}</strong>
          {this.house()}
        </h2>
        <h4 style={{ color: "white", fontFamily: "Lumos", marginTop: "10px" }}>
          <strong>Favorite Book:</strong> {favoriteHarryPotterBook}
        </h4>
        <h4 style={{ color: "white", fontFamily: "Lumos", marginTop: "10px" }}>
          <strong>Favorite Movie:</strong> {favoriteHarryPotterMovie}
        </h4>
        <h4 style={{ color: "white", fontFamily: "Lumos", marginTop: "10px" }}>
          <strong>Favorite Character:</strong> {favoriteHarryPotterCharacter}
        </h4>
        <div
          style={{
            textAlign: "center !important",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <EditProfile
            profileData={this.state.profileData}
            setProfileData={this.setProfileData}
            token={this.props.token}
          />
          <DeleteProfile
            token={this.props.token}
            profileData={this.state.profileData}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default ViewProfile;
