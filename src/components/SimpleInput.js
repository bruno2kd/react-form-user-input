import { useState } from "react";

const SimpleInput = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const checkIsValidFirstNameInput = (value) => {
    setIsTouched(true);
    const isValid = props.validate(value)
    setIsValid(isValid)
    return isValid ? true : false
  };

  const inputChangeHandler = (e) => {
    checkIsValidFirstNameInput(e.target.value)
    setIsTouched(false);
    props.onChange(e)
  }

  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onBlur={(e) => checkIsValidFirstNameInput(e.target.value)}
        onChange={inputChangeHandler}
      />
      {!isValid && isTouched && (
        <p style={{ color: "red" }}>{props.errorMessage}</p>
      )}
    </div>
  );
};

export default SimpleInput;
