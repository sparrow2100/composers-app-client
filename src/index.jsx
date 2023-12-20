import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view.jsx";

import "./index.scss";

const ComposerApp = () => {
  return (
    <div className="composer-app">
      <MainView />
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<ComposerApp />);
