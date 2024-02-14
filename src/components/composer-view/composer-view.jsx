import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ComposerView = ({ user, token, composer, setUser }) => {
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
        // update the user object with the new favourite composer
        const newFavourites = await response.json();
        setUser(newFavourites);
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
          // update the user object with the removed favourite composer
          const newRemoved = await response.json();
          setUser(newRemoved);
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
    <>
      <Col md={6} style={{ fontSize: "20px", marginTop: "20px" }}>
        <div>
          <img src={composer.img} style={{ width: "100%" }} />
        </div>
      </Col>
      <Col>
        <div style={{ paddingTop: "15px" }}>
          <h1>{composer.name}</h1>
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
          <span>{composer.bio}</span>
        </div>
        <Link to="/" style={{ marginTop: "15px" }}>
          Back
        </Link>
        <div>
          <Button
            onClick={makeFavourite}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "50px",
              display: favouritesArray.includes(composer.id) ? "none" : "block",
            }}
          >
            Add to Favourites
          </Button>
          <Button
            onClick={removeFavourite}
            variant="danger"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "50px",
              display: favouritesArray.includes(composer.id) ? "block" : "none",
            }}
          >
            Remove from Favourites
          </Button>
        </div>
      </Col>
    </>
  );
};
