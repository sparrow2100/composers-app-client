import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

export const GalleryView = ({}) => {
  const [images, setImages] = useState([]);

  //set file to current file
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // get the form data and post it to the images endpoint
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    filesList.push(file);

    try {
      const response = await fetch(
        "http://careerfoundryloadbalancer-1539903482.us-east-1.elb.amazonaws.com/images",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  const displayImages = async (event) => {
    try {
      const res = await fetch(
        "http://careerfoundryloadbalancer-1539903482.us-east-1.elb.amazonaws.com/images",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setImages(data);
      console.log(images);
    } catch (error) {
      console.error("Error retrieving images:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Upload an image</label>
        <input type="file" onChange={handleFileChange} />
        <input type="submit" value="submit" />
      </form>
      <Button onClick={displayImages}>Display Images</Button>
      <div>
        {images.map((image, index) => (
          <Col md={6} style={{ fontSize: "20px", marginTop: "20px" }}>
            <div>
              <img src={image.url} style={{ width: "100%" }} />
            </div>
          </Col>
        ))}
      </div>
      <Col>
        <Link to="/" style={{ marginTop: "15px" }}>
          Back
        </Link>
      </Col>
    </>
  );
};
