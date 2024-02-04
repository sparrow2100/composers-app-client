import React from "react";
import { useState, useEffect } from "react";
import { ComposerCard } from "../composer-card/composer-card";
import { ComposerView } from "../composer-view/composer-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => setUser(null)} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/composers/:composerName"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : composers.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : !selectedComposer ? (
                  <Col>No composer has been selected</Col>
                ) : (
                  <>
                    <ComposerView
                      composer={selectedComposer}
                      onBackClick={() => setSelectedComposer(null)}
                    />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
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
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
