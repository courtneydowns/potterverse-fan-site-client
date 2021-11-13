import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
    };
  }

  toggle = () => {
    this.setState({ login: !this.state.login });
  };

  authTernary = () => {
    return this.state.login ? (
      <Login updateToken={this.props.updateToken} toggle={this.toggle} />
    ) : (
      <Signup
        updateToken={this.props.updateToken}
        isSignedUp={this.props.isSignedUp}
        toggle={this.toggle}
      />
    );
  };

  render() {
    return (
      <div className="Auth">
        <div className="wrapper">
          <div
            className={this.state.login ? "login-wrapper" : "signup-wrapper"}
          >
            <div className="login-signup">{this.authTernary()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
