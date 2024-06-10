import { FormAction, FormActionTypes } from "../../types/form";

export const submitFormSuccess = (): FormAction => {
	return { type: FormActionTypes.SUBMIT_FORM_SUCCESS };
};

export const submitFormError = (): FormAction => {
	return { type: FormActionTypes.SUBMIT_FORM_ERROR };
};

export const openForm = (): FormAction => {
	return { type: FormActionTypes.OPEN_FORM };
};

export const setInputValue = (value: string): FormAction => {
	return { type: FormActionTypes.SET_INPUT_VALUE, payload: value };
};

export const setDescripcionValue = (value: string): FormAction => ({
	type: FormActionTypes.SET_DESCRIPCION_VALUE, payload: value,
  });

export const submitFormCancel = (): FormAction => {
	return {
		type: FormActionTypes.SUBMIT_FORM_CANCEL,
	};
};
