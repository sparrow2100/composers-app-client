import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export const ProfileView = ({ user, token, composers }) => {
  //store the updated values
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  //track if the user has entered a new password
  const [newPassword, setNewPassword] = useState(false);

  const favourites = composers.filter((c) =>
    user.favouriteComposers.includes(c.id)
  );

  //send updated user info upon submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("submitted!");

    const data = {
      name: name,
      username: username,
      password: newPassword ? password : undefined,
      email: email,
      birthday: birthday,
    };

    fetch(`https://women-composers-api.onrender.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        alert("update successful");
      } else {
        alert("update failed");
        console.log("something went wrong", await response.text());
      }
    });
  };

  // Delete the user's account
  const deleteUser = () => {
    alert("click registered");
    fetch(`https://women-composers-api.onrender.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        alert("account deleted");
      } else {
        alert("something went wrong");
        console.log("something went wrong", await response.text());
      }
    });
  };

  return (
    <>
      {/* display current user info */}
      <Col md={6} style={{ marginTop: "50px" }}>
        <h2 style={{ marginTop: "10px", marginBottom: "30px" }}>{user.name}</h2>
        <h2>Username:</h2>
        <p>{user.username}</p>
        <h2>Email:</h2>
        <p>{user.email}</p>
        <h2>Date of Birth:</h2>
        <p>{user.birthday}</p>
        <h2>Favourite Composers:</h2>
        <ul>
          {favourites.map((favourite) => (
            <li>{favourite.name}</li>
          ))}
        </ul>
        <Button variant="danger" onClick={deleteUser}>
          Delete Account
        </Button>
      </Col>
      {/* Form for updating user info */}
      <Col style={{ marginTop: "50px" }}>
        <h1 style={{ marginTop: "10px", marginBottom: "30px" }}>Update Info</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              placeholder="******"
              onChange={(event) => {
                setPassword(event.target.value);
                setNewPassword(true);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              defaultValue={user.birthday}
              onChange={(event) => {
                setBirthday(event.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
            Submit
          </Button>
        </Form>
      </Col>
    </>
  );
};
