import TableroActual from "../paginas/TableroActual/TableroActual"; 
import TablerosDelEspacio from "../paginas/Tableros/Tableros"; 
import Register from "../paginas/Registro/Register";
import PaginaPrincipal from "../paginas/Login/LandPage"
import Espacios from "../paginas/Espacios/Espacios";
import { InterfazRuta } from "../types/rutas";



export const routes: InterfazRuta[] = [
	{ path: "/", component: PaginaPrincipal, correcta: true},
	{ path: "/registro", component: Register, correcta: true},
	{ path: "/espacios", component: Espacios, correcta: true },
	{ path: "/espacio/:id", component: TablerosDelEspacio, correcta: true },
	{ path: "/tablero/:id", component: TableroActual, correcta: true },
];