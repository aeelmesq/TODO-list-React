import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

/* Componentização dos elementos */
import Todo from "./components/Todo.js";
import Form from "./components/Form.js";
import FilterButton from "./components/FilterButton";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Os filtros estão fora pois se estiverem dentro terão de se ser recalculados sempre
const FILTER_MAP = {
  All: () => true, // O filtro 'Todos' mostra todas as tarefas, então retorna 'true' todas as tarefas
  Active: (task) => !task.completed, // O filtro 'Ativo' mostra todas as tarefas que o 'completed' prop é 'false'
  Completed: (task) => task.completed, // O filtro 'Ativo' mostra todas as tarefas que o 'completed' prop é 'true'
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // Constante para o filtro
  const [filter, setFilter] = useState("All");

  // Constante para as tarefas
  const [tasks, setTasks] = useState(props.tasks); // Hook para preservar o state inicial

  // Constante do filtro da lista
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // Cria todas as tarefas existentes
  // '?.' é um operador que checa se tasks está indefenido ou vazio
  // 'filter' para exibir apenas aquelas tarefas que cumpram os requisitos, quando verdadeiro, realiza o 'map'
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} // 'key' sempre deve serem únicos e passar a chave única para renderizar uma iteração
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  )); // '.map' cria outras variáveis com uma função anônima para as tarefas

  // Para identificar se deve estar no plural ou não
  const taskNoun = taskList.length !== 1 ? "tarefas" : "tarefa";
  // Para contar quantas tarefas estão restantes
  const headingText = `${taskList.length} ${taskNoun} restante`;

  // Adiciona uma nova tarefa
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }; // 'nanoid()' faz um ID único
    setTasks([...tasks, newTask]);
  }

  // Sincronizando a data do navegador com o código
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // Se essa tarefa ter o mesmo ID que a tarefa editada
      if (id === task.id) {
        // Usa a propagação do objeto para fazer um novo objeto
        // aqueles prop 'completed' serão invertidos
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Apagar tarefas
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id); // 'filter()' filtra o array com um parâmetro
    setTasks(remainingTasks);
  }

  // Editar tarefas
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // Se a tarefa ter o mesmo ID com a tarefa editada
      if (id === task.id) {
        // Copia a tarefa e atualiza o nome
        return { ...task, name: newName };
      }
      // Retorna a tarefa original se a tarefa não foi editada
      return task;
    });
    setTasks(editedTaskList);
  }

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      {/* Formulário para criar novos registros */}
      <Form
        addTask={addTask} //'on' significa que o prop é uma função de callback, e 'Submit' é um gatilho para a função
      />

      {/* Array para filtrar as tarefas */}
      <div className="filters btn-group stack-exception">{filterList}</div>

      {/* Heading para dizer quantas tarefas restantes há */}
      {/* 'tabIndex' é um atributo para transformar um elemento em focusable (focável) */}
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      {/* 'role' Atributo que ajuda tecnologias assistivas, tratando ul como uma lista por padrão */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList} {/* As tarefas estão aqui */}
      </ul>
    </div>
  );
}

export default App;
