import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";

export const ComposerCard = ({ composer, onComposerClick }) => {
  return (
    <div
      style={{ textAlign: "center", fontSize: "20px", cursor: "pointer" }}
      onClick={() => {
        onComposerClick(composer);
      }}
    >
      <span style={{ fontWeight: "bold" }}>{composer.name}</span>
    </div>
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
