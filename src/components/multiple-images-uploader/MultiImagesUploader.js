import React, { useEffect, useState } from "react";
import "./MultiImagesUploader.css";

// import { useStorage } from "../hooks/useStorage";
import { projectStorage } from "../../firebase";

function UploadImage(props) {
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  // const [url, setUrl] = useState(null);
  const [lastImage, setLastImage] = useState(false);

  let url = "";
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const uploader = (file) => {
    if (file) {
      // storage refs
      const storageRef = projectStorage.ref(file.name);

      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          // track the upload progress
          let percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );

          setProgress(percentage);
        },
        (err) => {
          console.log("error uploader", err.message);
          setProgress(0);
          setError(err);
        },
        async () => {
          // get the public download img url
          const downloadUrl = await storageRef.getDownloadURL();
          const downloadName = await storageRef.toString();
          // save the url to local state
          // console.log("downloadUrl>>>", downloadUrl);
          // console.log("downloadName>>>", downloadName);
          props.pictureAddHandler(downloadUrl, downloadName);
        }
      );
    }
  };

  const uploadImage = (file) => {
    let selectedFile = file;

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        // setFile(selectedFile);
        uploader(selectedFile);
      } else {
        // setFile(null);
        setError("Please select an image file (png or jpg)");
        alert("Please select an image file (png or jpg)");
      }
    }
  };

  const fileInputHandleChange = (e) => {
    //Get files
    const images = [];
    for (var i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      uploadImage(e.target.files[i]);
      // uploader(e.target.files[i]);
      // props.pictureAddHandler(url, name);
      // if(progress)
      setLastImage(false);
    }
    setFiles([...images]);
    // console.log("images>>>", images);
    setLastImage(true);
  };

  // Getting the progress and url from the hook
  // const { progress, url, name, setProgressToZero } = useStorage(file);

  // if (progress === 100) {
  //   props.pictureAddHandler(url, name);
  //   console.log("DONE : ", name);
  //   // setProgressToZero(0);
  //   // console.log(url);
  //   //console.log(props.imgNameArray);
  //   //console.log(props.imgURLArray);
  //   // console.log("name >>> ", name);
  // }
  useEffect(() => {
    if (!lastImage) {
      // console.log("in");
      setProgress(0);
    }
  }, [lastImage]);

  return (
    <div className="register-upload__image">
      <form className="register-upload__image-form">
        <label className="register-upload__image-label">
          <input
            type="file"
            onChange={fileInputHandleChange}
            multiple
            accept="image/*"
          />
          <span>Upload Photos</span>
        </label>
      </form>
      {/* <button onClick={}>Upload files</button> */}

      {/* error message */}
      {error && <p>{error}</p>}

      {/* upload progress */}
      {files && <p className="text register-upload__image-para">{progress}% uploaded</p>}
      {files.length? <p className="text register-upload__image-para">{files.length} files selected</p>:null}
      {/* image url */}
      {url && (
        <p className="register-upload__image-para">
          <b>File url: </b>
          <a href={url}>{url}</a>
        </p>
      )}

      {/* image display */}
      {/* {url && <img className="register-upload__image-image" alt={url} src={url}></img>} */}
    </div>
  );
}

export default UploadImage;
