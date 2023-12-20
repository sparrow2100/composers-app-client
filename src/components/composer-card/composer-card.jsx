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
