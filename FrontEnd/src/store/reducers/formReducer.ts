import { FormState, FormAction, FormActionTypes } from "../../types/form";

const initialState: FormState = {
	inputValue: "",
	isOpen: false,
	isError: false,
};

export const formReducer = (
	state = initialState,
	action: FormAction
): FormState => {
	switch (action.type) {
		case FormActionTypes.OPEN_FORM:
			return {
				...state,
				isOpen: true,
			};
		case FormActionTypes.SET_INPUT_VALUE:
			return {
				...state,
				inputValue: action.payload,
			};
		case FormActionTypes.SUBMIT_FORM_SUCCESS:
			return {
				...state,
				inputValue: "",
				isOpen: false,
				isError: false,
			};
		case FormActionTypes.SUBMIT_FORM_ERROR:
			return {
				...state,
				isError: true,
			};
		case FormActionTypes.SUBMIT_FORM_CANCEL:
			return {
				...state,
				inputValue: "",
				isOpen: false,
				isError: false,
			};
		default:
			return state;
	}
};
