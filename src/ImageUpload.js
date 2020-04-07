import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
// import FileReaderInput from "react-file-reader-input";

const ImageUpload = props => {
  const handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta);
  };
  //   const FileType = require("file-type");
  const handleSubmit = (files, allFiles) => {
    // console.log(files.map(f => f.meta));
    // console.log(files[0]);
    const data = new FormData();
    data.append("data", props.data);
    for (var i = 0; i < allFiles.length; i++) {
      let file = allFiles[i];
      console.log(file);
      data.append("image" + i, file);
    }
    for (var pair of data.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    allFiles.forEach(f => f.remove());
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={3}
      inputContent="Drop maximum 3 Files"
      inputWithFilesContent={files => `${3 - files.length} more`}
      class="divider"
      accept="image/jpeg, image/png"
      //   submitButtonDisabled={files => files.length < 3}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          Drop an image, get a preview!
        </div>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
