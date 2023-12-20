export const ComposerView = ({ composer, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={composer.img} />
      </div>
      <div>
        <span>Name: </span>
        <span>{composer.name}</span>
      </div>
      <div>
        <span>Era: </span>
        <span>{composer.era}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{composer.bio}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
