import React, { Component } from "react";
import { FormGroup, Label } from "reactstrap";
import PlaceholderImage from "../auth/placeholder-profile-pic.png";

class UploadingProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      loading: false,
    };
  }

  UploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Potterverse");
    this.setState({ loading: true });
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/courtneydowns/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const File = await res.json();

    this.setState({ image: File.secure_url });
    console.log(this.state.image);
    this.props.updatePhoto(File.secure_url);
    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <img
          className="profile-pic"
          style={{
            objectFit: "cover",
            borderRadius: "100%",
            width: "200px",
            height: "200px",
            textAlign: "center",
            display: "block",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            // marginTop: "75px",
            marginBottom: "20px",
            border: "2px solid #7400B8",
          }}
          src={this.state.image === "" ? PlaceholderImage : this.state.image}
          alt=""
        />
        <FormGroup id="uploader">
          <input
            style={{
              color: "white",
              // paddingBottom: "50px",
            }}
            className="profile-image-upload"
            type="file"
            name="file"
            placeholder="Upload Pic Here"
            onChange={this.UploadImage}
            required="required"
          />
        </FormGroup>
      </div>
    );
  }
}

export default UploadingProfilePic;
