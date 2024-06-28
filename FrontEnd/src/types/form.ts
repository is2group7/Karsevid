export interface FormState {
	inputValue: string;
	descripcionValue: string;
	isOpen: boolean;
	isError: boolean;
}

export enum FormActionTypes {
	OPEN_FORM = "OPEN_FORM",
	SET_INPUT_VALUE = "SET_INPUT_VALUE",
	SET_DESCRIPCION_VALUE = "SET_DESCRIPCION_VALUE",
	SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS",
	SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR",
	SUBMIT_FORM_CANCEL = "SUBMIT_FORM_CANCEL",
}

interface OpenFormAction {
	type: FormActionTypes.OPEN_FORM;
}

interface SetInputValueAction {
	type: FormActionTypes.SET_INPUT_VALUE;
	payload: string;
}

interface SetDescripcionValueAction {
	type: FormActionTypes.SET_DESCRIPCION_VALUE;
	payload: string;
}

interface SubmitFormSuccessAction {
	type: FormActionTypes.SUBMIT_FORM_SUCCESS;
}

interface SubmitFormErrorAction {
	type: FormActionTypes.SUBMIT_FORM_ERROR;
}

interface SubmitFormCancelAction {
	type: FormActionTypes.SUBMIT_FORM_CANCEL;
}

export type FormAction =
	| OpenFormAction
	| SetInputValueAction
	| SubmitFormSuccessAction
	| SetDescripcionValueAction	
	| SubmitFormErrorAction
	| SubmitFormCancelAction;
