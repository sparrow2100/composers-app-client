import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const GalleryView = ({}) => {
  const [images, setImages] = useState([]);
  const [imagesUploadedCount, setImagesUploadedCount] = useState(0);

  //set file to current file
  const [file, setFile] = useState(null);

  useEffect(() => {
    displayImages();
  }, [imagesUploadedCount])

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
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://cfj18-api-loadbalancer-1063295764.us-east-1.elb.amazonaws.com/images",
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

    setTimeout(() => setImagesUploadedCount((current) => current + 1), 2000);
  };

  const displayImages = async () => {
    try {
      const response = await fetch(
        "http://cfj18-api-loadbalancer-1063295764.us-east-1.elb.amazonaws.com/images",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!Array.isArray(data.Contents)) {
        alert("Error while loading images");
        return;
      }

      const images = data.Contents
      .filter(content => content.Key.startsWith('resized-images/') && !content.Key.endsWith('/'))
      .map(content => ({
        key: content.Key,
        originalImageUrl: `http://cfj18-api-loadbalancer-1063295764.us-east-1.elb.amazonaws.com/images/${content.Key.replace('resized-images/', 'original-images/')}`,
        url: `http://cfj18-api-loadbalancer-1063295764.us-east-1.elb.amazonaws.com/images/${content.Key}`
      }))
      setImages(images);
    } catch (error) {
      console.error("Error retrieving images:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{width: "70%", backgroundColor: "white", borderRadius: "10px", padding: "25px", marginTop: "20px", marginBottom: "20px"}}>
        <Form.Group controlId="imageUpload">
          <Form.Label>Upload an Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
          Submit
        </Button>
      </Form>
      <div style={{display: 'flex', gap: '16px', alignItems: 'flex-end', marginTop: '24px', marginBottom: '24px'}}>
        {images.map((image, index) => (
          <div key={image.key} md={6} style={{ fontSize: "20px" }}>
            <div>
              <img src={image.url} />
              <div>
                <a href={image.originalImageUrl}>See original</a>
              </div>
            </div>
          </div>
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
