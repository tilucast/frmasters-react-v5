import React, { useState, Dispatch, FunctionComponent } from "react";

const useDropdown = (
  label: string,
  defaultState: string,
  options: string[]
) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        data-testid={id}
        name={id}
        id={id}
        value={state}
        onChange={(event) => setState(event.target.value)}
        onBlur={(event) => setState(event.target.value)}
        disabled={!options.length}
      >
        <option>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState] as [
    string,
    FunctionComponent,
    Dispatch<string>
  ];
};

export default useDropdown;
