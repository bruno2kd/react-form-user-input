import { useEffect, useState } from "react";
import SimpleInput from "./SimpleInput";

const BasicForm = () => {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      const isValid =
        validationInputHandler(inputFirstName) &&
        validationInputHandler(inputLastName) &&
        validationEmailInputHandler(inputEmail);

      setIsFormValid(isValid);
    }, 500);

    return () => clearTimeout(myTimeout);
  }, [inputFirstName, inputLastName, inputEmail]);

  const submitNameFormHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const user = {
      firstName: inputFirstName,
      lastName: inputLastName,
      email: inputEmail,
    };
    console.log("submit user:", user);
  };

  const validationInputHandler = (value) => {
    if (value.trim().length === 0) {
      return false;
    }
    return true;
  };

  const validationEmailInputHandler = (value) => {
    if (value.includes("@")) {
      return true;
    }
    return false;
  };

  return (
    <form onSubmit={submitNameFormHandler}>
      <div className="control-group">
        <SimpleInput
          type="text"
          id="first-name"
          label="First Name"
          validate={validationInputHandler}
          errorMessage="Input nao pode ser vazio"
          onChange={(e) => setInputFirstName(e.target.value)}
          value={inputFirstName}
        />
        <SimpleInput
          type="text"
          id="last-name"
          label="Last Name"
          validate={validationInputHandler}
          errorMessage="Input deve ser email"
          onChange={(e) => setInputLastName(e.target.value)}
          value={inputLastName}
        />
      </div>
      <SimpleInput
        id="email"
        type="email"
        label="E-Mail Address"
        validate={validationEmailInputHandler}
        errorMessage="Input deve conter email"
        onChange={(e) => setInputEmail(e.target.value)}
        value={inputEmail}
      />
      <div className="form-actions">
        <button
          style={isFormValid ? {} : { backgroundColor: "gray" }}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
