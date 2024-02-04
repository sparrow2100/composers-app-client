import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export const ComposerView = ({ composer, onBackClick }) => {
  return (
    <Col md={6} style={{ fontSize: "20px" }}>
      <div>
        <img src={composer.img} style={{ width: "100%" }} />
      </div>
      <div style={{ paddingTop: "15px" }}>
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          Name:{" "}
        </span>
        <span>{composer.name}</span>
      </div>
      <div style={{ paddingTop: "15px" }}>
        <span style={{ fontWeight: "bold" }}>Lifespan: </span>
        <span>{composer.lifespan}</span>
      </div>
      <div style={{ paddingTop: "15px" }}>
        <span style={{ fontWeight: "bold" }}>Nationality: </span>
        <span>{composer.nationality}</span>
      </div>
      <div style={{ paddingTop: "15px" }}>
        <span style={{ fontWeight: "bold" }}>Bio: </span>
        <span>{composer.bio}</span>
      </div>
      <Link to="/" style={{ marginTop: "15px" }}>
        Back
      </Link>
    </Col>
  );
};
