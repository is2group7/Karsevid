import { ComponentType, ReactNode } from "react";

export interface IRoute {
	path: string;
	componente: ComponentType<ReactNode>;
	exacta: boolean;
}
