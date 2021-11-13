let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "cd-potterverse.herokuapp.com":
    APIURL = "https://cd-potterverse-server.herokuapp.com";
}

export default APIURL;
