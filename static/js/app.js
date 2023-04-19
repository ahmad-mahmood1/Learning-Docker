import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <div>Serving React from Server</div>;
}

let targetNode = document.getElementById("root");
let root = createRoot(targetNode);
root.render(<App />);
