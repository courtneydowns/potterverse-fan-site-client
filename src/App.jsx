import React, { Component } from "react";
import Auth from "./Components/auth/Auth";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Sitebar from "./Components/sitebar/Sitebar";
import Characters from "./Components/search/Characters";
import MagicalObjects from "./Components/search/MagicalObjects";
import Spells from "./Components/search/Spells";
import PotionIngredients from "./Components/search/PotionIngredients";
import Potions from "./Components/search/Potions";
import WandCore from "./Components/search/WandCore";
import WandWood from "./Components/search/WandWood";
import Homepage from "./Components/homepage/Homepage";
import ViewProfile from "./Components/profile/ViewProfile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
      isActive: false,
    };
  }
  updateToken = (newToken) => {
    this.setState({ sessionToken: newToken });
    localStorage.setItem("token", newToken);
  };
  handleToken = () => {
    this.setState({ sessionToken: localStorage.getItem("token") });
  };
  componentDidMount() {
    this.handleToken();
  }
  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  protectedViews = () => {
    return this.state.sessionToken ? (
      <Homepage token={this.state.sessionToken} />
    ) : (
      <Auth token={this.state.sessionToken} updateToken={this.updateToken} />
    );
  };

  render() {
    return (
      <div className="App">
        <div class="stars">
          <div class="twinkling">
            {!this.state.sessionToken && (
              <Sitebar clickLogout={this.clearToken} />
            )}
            <Switch>
              <Route exact path="/">
                {this.protectedViews()}
              </Route>
              <Route exact path="/home">
                <Homepage />
              </Route>
              <Route exact path="/profile">
                <ViewProfile token={this.state.sessionToken} />
              </Route>
              <Route exact path="/characters">
                <Characters token={this.state.sessionToken} />
              </Route>
              <Route exact path="/magical-objects">
                <MagicalObjects token={this.state.sessionToken} />
              </Route>
              <Route exact path="/spells">
                <Spells token={this.state.sessionToken} />
              </Route>
              <Route exact path="/potion-ingredients">
                <PotionIngredients token={this.state.sessionToken} />
              </Route>
              <Route exact path="/potions">
                <Potions token={this.state.sessionToken} />
              </Route>
              <Route exact path="/wand-cores">
                <WandCore token={this.state.sessionToken} />
              </Route>
              <Route exact path="/wand-wood">
                <WandWood token={this.state.sessionToken} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
