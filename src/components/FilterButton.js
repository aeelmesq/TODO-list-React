function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed} // 'aria-pressed' Tecnologia assistiva que diz se está pressionado por padrão ou não
      onClick={() => props.setFilter(props.name)}
    >
      <span
        className="visually-hidden" // 'visually-hidden' é fomra de ajudar a tecnologia assistiva a identificar o que está escrito
      >
        Mostrar
      </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tarefas</span>
    </button>
  );
}

export default FilterButton;
