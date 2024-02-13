import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view.jsx";

import "./index.scss";
import Container from "react-bootstrap/Container";

const ComposerApp = () => {
  return (
    <Container
      style={{
        background: "#E6E6FA",
        borderRadius: "15px",
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingBottom: "50px",
        paddingTop: "25px",
        marginTop: "50px",
      }}
    >
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<ComposerApp />);
