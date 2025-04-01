import React from "react";

const FilterSort = ({ setFilter, setSort }) => {
  return (
    <div className="filter-sort">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="asc">Due Date Ascending</option>
        <option value="desc">Due Date Descending</option>
      </select>
    </div>
  );
};

export default FilterSort;