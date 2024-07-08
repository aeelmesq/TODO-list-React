import { useEffect, useRef, useState } from "react";

// Usa o 'useRef()' hook para criar uma 'ref' vazia
// Retorna o valoe 'current' da 'ref' (valor atual da 'ref') para o componente a ser chamado
// Chama o 'useEffect()' e atualiza o valor guardado no 'ref.current' depois de cada renderização da chamada do componente
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Props é o parâmetro necessário para a função
function Todo(props) {
  const [isEditing, setEditing] = useState(false); // 'isEditing' está definido como padrão false
  const [newName, setNewName] = useState("");

  // Selecionando os elementos
  const editFieldRef = useRef(null); // 'useRef' cria um objeto com uma única propriedade 'current' (atual)
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);
  console.log(wasEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  // Tranformando em "telas"
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          Novo nome para {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancelar
          <span className="visually-hidden">a renemeação de {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Salvar
          <span className="visually-hidden">novo nome para {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Editar <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Apagar <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  // Acessibilidade para usuários que apenas usam teclado, quando dar enter em editar ele foque no valor atual (input)
  // Quando atualiza a página, sempre é selecionado o botão 'Editar', pseudocode para concertar

  // useEffect(() => {
  //   if (wasNotEditingBefore && isEditingNow) {
  //     focusOnEditField();
  //   } else if (wasEditingBefore && isNotEditingNow) {
  //     focusOnEditButton();
  //   }
  // }, [isEditing]);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  // As tarefas tem em cada uma com botões de editar, apagar e uma checkbox para mostrar se estão feitas
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;

{
  /* <li className="todo stack-small">
  <div className="c-cb">
    <input
      id={props.id} // O id precisa ser único
      type="checkbox"
      defaultChecked={props.completed}
      onChange={() => props.toggleTaskCompleted(props.id)}
    />
    <label className="todo-label" htmlFor={props.id}>
      // 'props.name' utiliza o 'name' (declarado no App.js) e declara o nome especificado
      {props.name}
    </label>
  </div>
  <div className="btn-group">
    <button type="button" className="btn">
      Editar <span className="visually-hidden">{props.name}</span>
    </button>
    <button
      type="button"
      className="btn btn__danger"
      onClick={() => props.deleteTask(props.id)}
    >
      Apagar <span className="visually-hidden">{props.name}</span>
    </button>
  </div>
</li>; */
}
