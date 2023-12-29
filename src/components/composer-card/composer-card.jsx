import PropTypes from "prop-types";

export const ComposerCard = ({ composer, onComposerClick }) => {
  return (
    <div
      onClick={() => {
        onComposerClick(composer);
      }}
    >
      {composer.name}
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
    }).isRequired,
    img: PropTypes.string,
  }).isRequired,
};
