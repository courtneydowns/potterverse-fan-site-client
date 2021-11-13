let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "potterverse-fan-site.herokuapp.com":
    APIURL = "https://potterverse-fan-site-server.herokuapp.com";
}

export default APIURL;
