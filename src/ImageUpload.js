import React, { Component, Fragment, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const ImageUpload = props => {
  const handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta);
  };
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (files, allFiles) => {
    for (var i = 0; i < allFiles.length; i++) {
      const data = new FormData();
      data.append("file", allFiles[i].file);
      data.append("upload_preset", "nftafolder");
      setLoading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/nftaproject/image/upload",
        {
          method: "POST",
          headers: { "X-Requested-With": "XMLHttpRequest" },
          body: data
        }
      );
      const file = await res.json();
      setImage(image => [...image, file.secure_url]);
      setLoading(false);
    }

    allFiles.forEach(f => f.remove());
  };

  return (
    <div className="ImageUpload">
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={3}
        inputContent="Drop maximum 3 Files"
        inputWithFilesContent={files => `${3 - files.length} more`}
        class="divider"
        type="file"
        name="file"
        accept="image/jpeg, image/png"
        //   submitButtonDisabled={files => files.length < 3}
      ></Dropzone>

      {loading ? <h3>Loading ....</h3> : image.map(img => <img src={img} />)}
    </div>
  );
};

export default ImageUpload;
