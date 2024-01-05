import React from "react";
import { useState, useEffect } from "react";
import { ComposerCard } from "../composer-card/composer-card";
import { ComposerView } from "../composer-view/composer-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [composers, setComposers] = useState([]);
  const [selectedComposer, setSelectedComposer] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://women-composers-api.onrender.com/composers", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
  }, [token]);

  if (!user) {
    return (
      <div>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <h2>Or</h2>
        <SignupView />
      </div>
    );
  }

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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};
