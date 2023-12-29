import React from "react";
import { useState, useEffect } from "react";
import { ComposerCard } from "../composer-card/composer-card";
import { ComposerView } from "../composer-view/composer-view";

export const MainView = () => {
  const [composers, setComposers] = useState([]);

  const [selectedComposer, setSelectedComposer] = useState(null);

  useEffect(() => {
    fetch("https://women-composers-api.onrender.com/composers")
      .then((response) => response.json())
      .then((composers) => {
        const composersFromApi = composers.map((composer) => {
          return {
            name: composer.life.fullName,
            img: composer.img,
            lifespan: composer.life.lifespan,
            bio: composer.life.bio,
            nationality: composer.life.nationality,
          };
        });
        setComposers(composersFromApi);
      });
  }, []);

  if (selectedComposer) {
    return (
      <ComposerView
        composer={selectedComposer}
        onBackClick={() => setSelectedComposer(null)}
      />
    );
  }

  if (composers.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {composers.map((composer) => {
        return (
          <ComposerCard
            key={composer.id}
            composer={composer}
            onComposerClick={(newSelectedComposer) => {
              setSelectedComposer(newSelectedComposer);
            }}
          />
        );
      })}
    </div>
  );
};
