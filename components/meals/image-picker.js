"use client";
import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
function ImagePicker({ label, name }) {
  const [image, setImage] = useState();
  const inputRef = useRef();
  const handleImage = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
        setImage(null)
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label for={name}>{label}</label>
      <div className={classes.controls}>
        {image ? (
          <div className={classes.preview}>
            <Image src={image} alt={"pickedImage"} fill />
          </div>
        ) : null}
        <input
          type="file"
          id="image"
          name={name}
          ref={inputRef}
          accept="image/png, image/jpeg"
          className={classes.input}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleImage}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
