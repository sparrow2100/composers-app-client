import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, setSearch }) => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Women Composers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!user ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/user">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </Nav>
              <Nav style={{ marginLeft: "60%" }}>
                <Form>
                  <Form.Group className="my-3">
                    <Form.Control
                      onChange={(event) => {
                        setSearch(event.target.value);
                      }}
                      placeholder="Search composers"
                    />
                  </Form.Group>
                </Form>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
