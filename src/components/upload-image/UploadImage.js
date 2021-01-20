import React, { useState } from "react";
import "./UploadImage.css";

import { useStorage } from "../../hooks/useStorage";

function UploadImage(props) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile(selectedFile);
      } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
        alert("Please select an image file (png or jpg)")
      }
    }
  };

  // Getting the progress and url from the hook
  const { progress, url, name } = useStorage(file);

  if (progress === 100) {
    props.pictureAddHandler(url, name);
    //console.log("DONE");
    // console.log(url);
    //console.log(props.imgNameArray);
    //console.log(props.imgURLArray);
    // console.log("name >>> ", name);
  }

  return (
    <div className="upload__image">
      <form className="upload__image-form">
        <label className="upload__image-label">
          <input type="file" onChange={handleChange} />
          <span>Upload Photos</span>
        </label>
      </form>

      {/* error message */}
      {error && <p>{error}</p>}

      {/* upload progress */}
      {file && <p className="text upload__image-para">{progress}% uploaded</p>}

      {/* image url
      {url && (
        <p className="upload__image-para">
          <b>File url: </b>
          <a href={url}>{url}</a>
        </p>
      )} */}

      {/* image display */}
      {url && <img className="upload__image-image" alt={url} src={url}></img>}
    </div>
  );
}

export default UploadImage;