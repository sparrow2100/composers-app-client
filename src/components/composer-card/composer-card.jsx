import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

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
      <Card.Img src={composer.img} />
      <Card.Body>
        <Card.Title>{composer.name}</Card.Title>
      </Card.Body>
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
