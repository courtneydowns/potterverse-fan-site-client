import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import CreateProfile from "../profile/CreateProfile";
import SignupPicUpload from "./SignupPicUpload";
import Glasses from "../../assets/Glasses and Lightning Bolt Scar.svg";
import APIURL from "../../helper/environment";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      profileImage: "",
      username: "",
      isSignedUp: false,
      sessionToken: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/user/signup`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          profileImage: this.state.profileImage,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ isSignedUp: true });
        this.setState({ sessionToken: data.sessionToken });
        localStorage.setItem("profileImage", this.state.profileImage);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", this.state.username);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  componentWillUnmount() {
    console.log("component unmounted");
  }

  updatePhoto = (photoToUpdate) => {
    this.setState({ profileImage: photoToUpdate });
  };

  render() {
    return (
      <div className="wrapper" style={{ position: "relative" }}>
        <img
          src={Glasses}
          style={{
            height: "80px",
            marginBottom: "737px",
            marginTop: "55px",
            position: "absolute",
            marginRight: "501px",
            // zIndex: "1",
            transform: "rotate(-45deg)",
          }}
        />
        <div
          className="login-signup"
          style={{
            width: "500px",
            maxWidth: "500px",
            margin: "auto",
            padding: "2em",
            textAlign: "left",
            background: "white",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            borderRadius: "5px",
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <strong>
              <p
                style={{
                  color: "#7400B8",
                  fontFamily: "Lumos",
                  fontSize: "20px",
                  textAlign: "center",
                  marginBottom: "5%",
                }}
              >
                Join the Potterverse community today!
              </p>
            </strong>
            <FormGroup>
              <SignupPicUpload
                updatePhoto={this.updatePhoto}
                profileImage={this.state.profileImage}
              />
            </FormGroup>
            <FormGroup>
              <Input
                style={{
                  border: "solid 2px #7400B8",
                  marginBottom: "20px",
                  fontFamily: "Lumos",
                }}
                className="signup-username-input"
                onChange={(e) => this.setState({ username: e.target.value })}
                name="Username"
                placeholder="Username"
                value={this.username}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                style={{
                  border: "solid 2px #7400B8",
                  marginBottom: "20px",
                  fontFamily: "Lumos",
                }}
                className="signup-email-input"
                type="email"
                onChange={(e) => this.setState({ email: e.target.value })}
                name="email"
                placeholder="Email"
                value={this.email}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="signup-password-input"
                style={{
                  border: "solid 2px #7400B8",
                  marginBottom: "20px",
                  fontFamily: "Lumos",
                }}
                onChange={(e) => this.setState({ password: e.target.value })}
                name="password"
                placeholder="Password"
                value={this.password}
                required
              />
            </FormGroup>
            <div>
              <Button
                className="auth-login"
                type="submit"
                style={{
                  backgroundColor: "#7400B8",
                  color: "white",
                  width: "100%",
                  borderRadius: "100px",
                  fontFamily: "HarryP",
                  letterSpacing: "0.25rem",
                  fontSize: "23px",
                  transition: "background-color 0.25s ease",
                  marginTop: "10px",
                  height: "45px",
                }}
              >
                SIGNUP
              </Button>
            </div>
            <div>
              <Label
                style={{
                  color: "#7400B8",
                  fontFamily: "Lumos",
                  fontWeight: "bold",
                  marginTop: "25px",
                }}
                for="loginHere"
                onClick={this.props.toggle}
              >
                Already have an account? Sign in here!
              </Label>
            </div>
          </Form>
          {this.state.sessionToken && (
            <CreateProfile
              sessionToken={this.state.sessionToken}
              updateToken={this.props.updateToken}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Signup;
