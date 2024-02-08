import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const ComposerView = ({ user, token, composer, onBackClick }) => {
  const favouritesArray = user.favouriteComposers;
  //add composer to your favourites
  const makeFavourite = () => {
    fetch(
      `https://women-composers-api.onrender.com/users/${user.username}/favouriteComposers/${composer.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        alert("added successfully");
      } else {
        alert("update failed");
        console.log("something went wrong", await response.text());
      }
    });
  };

  //remove composer from your favourites
  const removeFavourite = () => {
    if (favouritesArray.includes(composer.id)) {
      fetch(
        `https://women-composers-api.onrender.com/users/${user.username}/favouriteComposers/${composer.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(async (response) => {
        if (response.ok) {
          alert("removed successfully");
        } else {
          alert("removal failed");
          console.log("something went wrong", await response.text());
        }
      });
    } else {
      alert("The composer was not found in your favourites");
    }
  };

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
      <Button
        onClick={makeFavourite}
        style={{ marginLeft: "10px", marginRight: "10px", marginTop: "50px" }}
      >
        Add to Favourites
      </Button>
      <Button
        onClick={removeFavourite}
        variant="danger"
        style={{ marginLeft: "10px", marginRight: "10px", marginTop: "50px" }}
      >
        Remove from Favourites
      </Button>
    </Col>
  );
};
