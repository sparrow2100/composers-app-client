import { createRoot } from "react-dom/client";

import "./index.scss";

const ComposerApp = () => {
  return (
    <div className="composer-app">
      <div>Hello World!</div>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<ComposerApp />);
