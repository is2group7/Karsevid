import * as TableroActionCreators from "./tablero"; 
import * as FormActionCreators from "./form"; 
import * as TarjetaActionCreators from "./tarjeta"; 
import * as TareaActionCreators from "./tarea"; 

export default {
	...TableroActionCreators,
	...FormActionCreators,
	...TarjetaActionCreators,
	...TareaActionCreators,
};