import React from "react";
import { useState, useEffect } from "react";
import { ComposerCard } from "../composer-card/composer-card";
import { ComposerView } from "../composer-view/composer-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </Col>

          <Col md={5}>
            <SignupView />
          </Col>
        </>
      ) : selectedComposer ? (
        <>
          <ComposerView
            composer={selectedComposer}
            onBackClick={() => setSelectedComposer(null)}
          />
        </>
      ) : composers.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {composers.map((composer) => {
            return (
              <Col key={composer.id} md={4}>
                <ComposerCard
                  composer={composer}
                  onComposerClick={(newSelectedComposer) => {
                    setSelectedComposer(newSelectedComposer);
                  }}
                />
              </Col>
            );
          })}
          <Col md={12} style={{ textAlign: "center" }}>
            <Button
              style={{ marginTop: "50px" }}
              onClick={() => {
                setUser(null);
                setToken(null);
              }}
            >
              Logout
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};
