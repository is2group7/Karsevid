import TableroActual from "../paginas/TableroActual/TableroActual"; 
import Tableros from "../paginas/Tableros/Tableros"; 
import { InterfazRuta } from "../types/rutas";

export const routes: InterfazRuta[] = [
	{ path: "/", component: Tableros, correcta: true },
	{ path: "/:id", component: TableroActual, correcta: true },
];