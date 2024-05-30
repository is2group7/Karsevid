import { combineReducers } from "redux";
import { tableroReducer } from "./tableroReducer"; 
import { tareaReducer } from "./tareaReducer"; 
import { formReducer } from "./formReducer"; 
import { tarjetaReducer } from "./tarjetaReducer";

export const rootReducer = combineReducers({
	form: formReducer,
	tablero: tableroReducer,
	tarjeta: tarjetaReducer,
	tarea: tareaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
