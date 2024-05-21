import Boards from "../";
import CurrentBoard from "../";
import { IRoute } from "../Types/rutas";

export const rutas: IRoute[] = [
	{ path: "/", componente: Boards, exacta: true },
	{ path: "/:id", componente: CurrentBoard, exacta: true },
];
