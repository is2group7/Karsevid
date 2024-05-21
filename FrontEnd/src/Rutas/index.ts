import Tablero from "../Paginas/Tablero/Tableros";
import TableroActual from "../Paginas/TableroActual/TablerosActual";
import { IRoute } from "../Types/rutas";

export const rutas: IRoute[] = [
	{ path: "/", componente: Tablero, exacta: true },
	{ path: "/:id", componente: TableroActual, exacta: true },
];
