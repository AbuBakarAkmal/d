import React, { useState, useEffect, useRef } from "react";
import "./DropZone.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import axios from "axios";
import { Close } from "@material-ui/icons";
// import {IconButton} from "@material-ui/core"
import Button from "../UI/button/Button";

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };
  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon"
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        // add a new property called invalid
        // add to the same array so we can display the name of the file
        // set error message
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };
  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };
  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);
    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (e) => e.name === name
    );
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      // update unsupportedFiles array
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };
  const uploadFiles = () => {
    // uploadModalRef.current.style.display = 'block';
    // uploadRef.current.innerHTML = 'File(s) Uploading...';
    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append("image", validFiles[i]);
      formData.append("key", "add your API key here");
      axios
        .post("https://api.imgbb.com/1/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            // progressRef.current.innerHTML = `${uploadPercentage}%`;
            // progressRef.current.style.width = `${uploadPercentage}%`;
            if (uploadPercentage === 100) {
              // uploadRef.current.innerHTML = 'File(s) Uploaded';
              validFiles.length = 0;
              setValidFiles([...validFiles]);
              setSelectedFiles([...validFiles]);
              setUnsupportedFiles([...validFiles]);
            }
          }
        })
        .catch(() => {
          // If error, display a message on the upload modal
          // uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
          // // set progress bar background color to red
          // progressRef.current.style.backgroundColor = 'red';
        });
    }
  };
  const fileInputClicked = () => {
    fileInputRef.current.click();
  };
  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };
  return (
    <div className="drag-container">
      {unsupportedFiles.length === 0 && validFiles.length ? (
        <Button className="file-upload-btn" onClick={() => uploadFiles()}>
          Upload Files
        </Button>
      ) : (
        ""
      )}
      {unsupportedFiles.length ? (
        <p>Please remove all unsupported files.</p>
      ) : (
        ""
      )}
      <div
        className="drop-drag-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        onClick={fileInputClicked}
      >
        <div className="drop-message">
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
          <div className="upload-icon">
            {" "}
            <GetAppIcon />
          </div>
          Drag & Drop files here or click to upload
        </div>
      </div>
      <div className="file-display-drag-container">
        {validFiles.map((data, i) => (
          <div className="file-status-bar" key={i}>
            <div>
              <div className="file-type-logo"></div>
              <div className="file-type">{fileType(data.name)}</div>
              <span className={`file-name ${data.invalid ? "file-error" : ""}`}>
                {data.name}
              </span>
              <span className="file-size">({fileSize(data.size)})</span>{" "}
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}
            </div>
            <div className="file-remove" onClick={() => removeFile(data.name)}>
              <Close />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DropZone;
