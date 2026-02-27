function FilterButtons({ filter, setFilter, clearCompleted }) {
  const filters = ["all", "completed", "pending"];

  return (
    <div className="filter-buttons">
      {filters.map((type) => (
        <button
          key={type}
          className={filter === type ? "active" : ""}
          onClick={() => setFilter(type)}
        >
          {type.toUpperCase()}
        </button>
      ))}

      {/* 🔥 Clear Completed Button (outside map) */}
      <button
        className="clear-btn"
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default FilterButtons;