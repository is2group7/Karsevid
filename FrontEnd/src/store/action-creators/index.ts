import * as TableroActionCreators from "./tablero"; 
import * as FormActionCreators from "./form"; 
import * as TarjetaActionCreators from "./tarjeta"; 
import * as TareaActionCreators from "./tarea"; 
import * as EspacioActionCreators from "./espacio"; 
import * as UsuarioActionCreators from "./usuario";
import * as MiniTareaAction from "./minitarea";


export default {
	...TableroActionCreators,
	...FormActionCreators,
	...TarjetaActionCreators,
	...TareaActionCreators,
	...EspacioActionCreators,
	...UsuarioActionCreators,
	...MiniTareaAction,
};