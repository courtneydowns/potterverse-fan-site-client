import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import Glasses from "../../assets/Glasses and Lightning Bolt Scar.svg";
import APIURL from "../../helper/environment";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", toggle: true };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/user/`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          toggle: true,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        console.log(data);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("profileImage", data.user.profileImage);
        localStorage.setItem("isAdmin", data.user.isAdmin);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  render() {
    return (
      <div className="wrapper" style={{ position: "relative" }}>
        <img
          src={Glasses}
          style={{
            height: "80px",
            marginBottom: "360px",
            marginTop: "55px",
            position: "absolute",
            marginRight: "502px",
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
            <FormGroup>
              <Input
                className="login-username-input"
                style={{ border: "solid 2px #7400B8", marginBottom: "20px" }}
                type="username"
                onChange={(e) => this.setState({ username: e.target.value })}
                name="username"
                placeholder="Username"
                required
                value={this.username}
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="login-password-input"
                style={{ border: "solid 2px #7400B8", marginBottom: "20px" }}
                onChange={(e) => this.setState({ password: e.target.value })}
                name="password"
                placeholder="Password"
                value={this.password}
                required
                type="password"
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
                  height: "43px",
                  letterSpacing: "0.25rem",
                  fontSize: "23px",
                  transition: "background-color 0.25s ease",
                  marginTop: "10px",
                }}
              >
                LOGIN
              </Button>
            </div>
            <div className="register-signup-text">
              <Label
                for="registerHere"
                onClick={this.props.toggle}
                style={{
                  color: "#7400B8",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                Don't have an account? Join the Potterverse community!
              </Label>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
