import React, { FC, FormEvent } from "react";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validacion";



const EspacioForm: FC = () => {

  const {inputValue, isOpen, isError} = useTypedSelector(
    (state) => state.form
  );
  const {
    submitFormCancel,
		submitFormSuccess,
		openForm,
		setInputValue,
		submitFormError,
		addEspacio,

  } = useActions();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
      if (validate(inputValue)){
        addEspacio({id: String(Date.now()), nombre: inputValue, owner: '', usuarios: ['']} ); 
      }
  };

  return (
  );
};

export default EspacioForm;
