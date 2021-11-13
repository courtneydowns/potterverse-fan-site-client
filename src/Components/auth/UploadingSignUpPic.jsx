// import React, { useState } from "react";
// import { FormGroup } from "reactstrap";
// import PlaceholderImage from "../placeholder-profile-pic.png";

// const UploadingProfile = (props) => {
//   const [image, setImage] = useState("");
//   const { setprofileImage } = props;

//   const UploadImage = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append("file", files[0]);
//     data.append("upload_preset", "Jake-test");
//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/jgreene/image/upload",
//       {
//         method: "POST",
//         body: data,
//       }
//     );
//     const File = await res.json();

//     setImage(File.secure_url);
//     setprofileImage(File.secure_url);
//   };

//   return (
//     <div>
//       <img
//         id="profile-pic"
//         src={image === "" ? PlaceholderImage : image}
//         alt=""
//       />
//       <FormGroup id="uploader">
//         <label for="profile-image-upload" className="custom-file-upload">
//           <input
//             style={{ width: 1, height: 1 }}
//             id="profile-image-upload"
//             type="file"
//             name="file"
//             placeholder="Upload Image Here"
//             onChange={UploadImage}
//             required="required"
//           />{" "}
//           Add your Photo
//         </label>
//       </FormGroup>
//     </div>
//   );
// };

// export default UploadingProfile;
