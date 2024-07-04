export interface FormState {
	inputValue: string;
	descripcionValue: string;
	isOpen: boolean;
	isError: boolean;
	fechaCreacion: string; 
    fechaVencimiento: string;
    usuarioAsignado: string;
}

export enum FormActionTypes {
	OPEN_FORM = "OPEN_FORM",
	SET_INPUT_VALUE = "SET_INPUT_VALUE",
	SET_DESCRIPCION_VALUE = "SET_DESCRIPCION_VALUE",
	SET_FECHA_CREACION = "SET_FECHA_CREACION",
    SET_FECHA_VENCIMIENTO = "SET_FECHA_VENCIMIENTO",
    SET_USUARIO_ASIGNADO = "SET_USUARIO_ASIGNADO",
	SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS",
	SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR",
	SUBMIT_FORM_CANCEL = "SUBMIT_FORM_CANCEL",
}


interface SetFechaCreacionAction {
    type: FormActionTypes.SET_FECHA_CREACION;
    payload: string;
}

interface SetFechaVencimientoAction {
    type: FormActionTypes.SET_FECHA_VENCIMIENTO;
    payload: string;
}

interface SetUsuarioAsignadoAction {
    type: FormActionTypes.SET_USUARIO_ASIGNADO;
    payload: string;
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
	| SetFechaCreacionAction
    | SetFechaVencimientoAction
    | SetUsuarioAsignadoAction
	| SetDescripcionValueAction	
	| SubmitFormErrorAction
	| SubmitFormCancelAction;
