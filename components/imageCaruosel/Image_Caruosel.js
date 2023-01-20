import styles from "./Image_Caruosel.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Image_Caruosel(props) {
  const IMAGES = props.imageList.map((imageEntry) => {
    return (
      <div className={styles.container}>
        <div className={styles.carousel_item}>
          <Image src={imageEntry.image} alt="placeHolder" layout="fill" />
        </div>
        <div className={styles.caption}>
          <p>{imageEntry.caption}</p>
        </div>
      </div>
    );
  });

  const [currentImage, setCurrentImage] = useState(0);

  function HandleChange() {
    if (currentImage === IMAGES.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      HandleChange();
    }, 5000);
    return () => clearInterval(interval);
  });
  return (
    <>
      <div className="container" onClick={() => HandleChange()}>
        {IMAGES[currentImage]}
      </div>
    </>
  );
}
