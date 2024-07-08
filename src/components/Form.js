// Props são imutáveis, um componente não pode mudar ou criar seus próprios props, por isso, usa o 'useState' um hook do react
import { useState } from "react"; // 'State' é uma forma de comunicação entre componentes utilizando "memória" do navegador

function Form(props) {
  // Está sendo definido a constante 'name' com o valor de "Learn React"
  // Está definindo a função que terá o trabalho de modificar o 'nome', chamado 'setName()'
  // 'useState' retorna duas coisas para o array, então está sendo usado a desestruturação de array para capturar esses dois valores em variáveis separadas
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value); // 'target' referencia o objeto que irá ser despachado
  }

  function handleSubmit(event) {
    event.preventDefault(); // 'preventDefault' é uma forma de validação, previne que sempre seja digitado algo
    props.addTask(name); // Aciona a função 'addTask'
    setName(""); // Chama a função 'setName()' denovo como uma string vazia
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          O que precisa ser feito?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange} // Quando estiver em mudança
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Adicionar
      </button>
    </form>
  );
}

export default Form;
