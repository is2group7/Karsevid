import { ComponentType, ReactNode } from "react";

export interface InterfazRuta {
	path: string;
	component: ComponentType<ReactNode>;
	correcta: boolean;
}