# Welcome to Potterverse Potterverse

<br/>

[![Potterverse-Logo-Resized.png](https://i.postimg.cc/vBr2Stdk/Potterverse-Logo-Resized.png)](https://postimg.cc/njL1X7rG)

## Overview

Welcome to Potterverse!<br/>

The purpose of this project is to provide an interactive site for Harry Potter fans.<br/>

Potterverse gives fans the ability to search categories (Characters, Magical Objects, Potion Ingredients, Potions, Spells, Wand Cores and Wand Woods). The can leave comments on each entry, as well as update and delete them. Users can sign up or login to gain access to the site and will NOT be able to see any of the content of the site unless they are logged in or signed up.

## Installation

Install these dependencies to get the same features:
`$ npm install reactstrap bootstrap react-bootstrap react-icons`

## Demo

Some of the features on the client-side of this project:

#### Sign up and Login

[![Signup-Screen.png](https://i.postimg.cc/3R8xd99F/Signup-Screen.png)](https://postimg.cc/PL7j7WgC)

[![Login-Screen.png](https://i.postimg.cc/gJ1cNdmN/Login-Screen.png)](https://postimg.cc/phYtLw9F)

#### Create

[![Create-Comment.png](https://i.postimg.cc/FHhrPTX5/Create-Comment.png)](https://postimg.cc/cr5GCMJX)

#### Update

[![Update-Profile.png](https://i.postimg.cc/SNhksgs2/Update-Profile.png)](https://postimg.cc/3WnPfC2Y)

#### Delete

[![Delete-Profile.png](https://i.postimg.cc/Zq2hhc2q/Delete-Profile.png)](https://postimg.cc/hJLYL9SF)

#### Read

[![Get-Card-Results.png](https://i.postimg.cc/gjPFx0YF/Get-Card-Results.png)](https://postimg.cc/PpKFcTp2)

## Code Example

Here is an example of the code:

```js
{
  localStorage.getItem("isAdmin") === "true" ||
  comment.userId == localStorage.getItem("userId") ? (
    <AiOutlineClose
      className="close-icon"
      onClick={() => this.commentDelete(comment.id)}
    />
  ) : null;
}
```

In the Characters.jsx file, this block of code is saying that if the local storage has a value of "true for the Admin or if the userId of the comment matches the userId in storage, then either one can delete a comment (it has to be the user's own comment), otherwise a user that does not own the comment can not delete it.

## Tech/Framwork Used

The following Tech/Frameworks were covered:

#### React

- React class components
- Passing props to children
- React componentDidMount()
- Sending data in a React application

#### Server

- Full CRUD (Create, Read, Update, Delete) on comments and profile components

#### Reactstrap/React-Bootstrap

- Installing Reactstrap, Bootstrap and React-Bootstrap from NOM
- Importing components from a library
- Calling it inside the return

#### Server Side Repository

The server portion of my app can be house [here] (https://github.com/courtneydowns/potterverse-fan-site-server)

#### Heroku Site

[here] (https://potterverse-fan-site.herokuapp.com/)
