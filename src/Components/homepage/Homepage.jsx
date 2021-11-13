import React, { Component } from "react";
import HogwartsCastle from "../../assets/HogwartsWhite.svg";

class Homepage extends Component {
  render() {
    return (
      <div>
        <img src={HogwartsCastle} className="hogwarts" />
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Homepage;
