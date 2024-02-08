import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const ComposerCard = ({ composer, onComposerClick }) => {
  return (
    <Card
      style={{
        textAlign: "center",
        fontSize: "20px",
        cursor: "pointer",
        margin: "25px",
      }}
      onClick={() => {
        onComposerClick(composer);
      }}
    >
      <Link
        to={`/composers/${encodeURIComponent(composer.name)}`}
        style={{ textDecoration: "none" }}
      >
        <Card.Img src={composer.img} />
        <Card.Body>
          <Card.Title style={{ color: "black", textDecoration: "none" }}>
            {composer.name}
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

ComposerCard.propTypes = {
  composer: PropTypes.shape({
    life: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lifespan: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      nationality: PropTypes.string.isRequired,
    }),
    img: PropTypes.string,
  }).isRequired,
};
