/* Estilo da página */
import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

/* Procedimento para fazer uma iteração (repetição) */
/* Tratando as tarefas como data */
const DATA = [
  {
    id: "todo-0" /* O id precisa ser único */,
    name: "Comer" /* 'name' dá ao prop um nome */,
    completed: true /* Indica se por padrão ele está marcado */,
  },
  { id: "todo-1", name: "Dormir", completed: false },
  { id: "todo-2", name: "Repetir", completed: false },
];

root.render(
  <StrictMode>
    <App tasks={DATA} /* Renderizando as tarefas */ />
  </StrictMode>
);
