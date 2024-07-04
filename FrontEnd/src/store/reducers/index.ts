import { combineReducers } from "redux";
import { espacioReducer } from "./espacioReducer";
import { usuarioReducer } from "./usuarioReducer";
import { tableroReducer } from "./tableroReducer"; 
import { tareaReducer } from "./tareaReducer"; 
import { formReducer } from "./formReducer"; 
import { tarjetaReducer } from "./tarjetaReducer";
import { miniTareaReducer } from "./minitareaReducer";


export const rootReducer = combineReducers({
	form: formReducer,
	tablero: tableroReducer,
	tarjeta: tarjetaReducer,
	tarea: tareaReducer,
	espacio: espacioReducer,
	usuario: usuarioReducer,
	miniTarea: miniTareaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
