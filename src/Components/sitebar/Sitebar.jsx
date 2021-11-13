import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { MdLogout } from "react-icons/md";
import PotterverseLogo from "../../assets/PotterverseLogoResized.png";

class Sitebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      isOpen: false,
      profileImage: localStorage.getItem("profileImage"),
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleNavbar = () => {
    console.log(this.state.profileImage);
    this.setState({ collapsed: !this.state.collapsed });
    this.setState({ profileImage: localStorage.getItem("profileImage") });
  };

  render() {
    return (
      <>
        <Navbar onMouseLeave={() => this.setState({ collapsed: true })}>
          <NavbarBrand>
            <Link to="/home">
              <img
                src={PotterverseLogo}
                alt="Potterverse Logo"
                style={{ width: 250, height: 100 }}
                className="logo"
              />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="navbar-dark" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav
              navbar
              className="position-absolute end-0"
              style={{
                zIndex: 1,
                backgroundColor: "white",
                height: "350px",
                width: "210px",
                border: "#7400B8 2px solid",
              }}
            >
              <NavItem>
                <Link to="/profile">
                  <Button
                    className="user-profile"
                    onClick={this.props.fetchProfile}
                    style={{
                      backgroundImage: `url(${this.state.profileImage})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      marginTop: "18px",
                    }}
                  ></Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/home" className="link">
                  <strong>HOME</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/characters" className="link">
                  <strong>CHARACTERS</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/magical-objects" className="link">
                  <strong>MAGICAL OBJECTS</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/spells" className="link">
                  <strong>SPELLS</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/potion-ingredients" className="link">
                  <strong>POTION INGREDIENTS</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/potions" className="link">
                  <strong>POTIONS</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/wand-cores" className="link">
                  <strong>WAND CORES</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/wand-wood" className="link">
                  <strong>WAND WOODS</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/">
                  <MdLogout
                    className="logout-button"
                    style={{
                      color: "#7400B8",
                      backgroundColor: "white !important",
                      fontSize: "27px",
                    }}
                    onClick={this.props.clickLogout}
                  />
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}

export default Sitebar;
