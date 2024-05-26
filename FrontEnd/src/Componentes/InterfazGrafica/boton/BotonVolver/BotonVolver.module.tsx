import React, { FC, FunctionComponent } from "react";
import BotonPrincipal from "../BotonPrincipal/BotonPrincipal"; 
import { IoReturnUpBack } from "react-icons/io5";
import cl from "./BotonVolver.module.scss"; 
import { useHistory } from "react-router";

interface BotonVolverProps {
	url: string;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;

	onClick: () => void;
}

const BotonVolver: FunctionComponent<BotonVolverProps> = ({
	url,
	onClick,
	type,
	children,
}) => {
	const history = useHistory();

	const returnBack = () => {
		history.push(url);
		onClick();
	};

	return (
		<BotonPrincipal className={cl.volverBtn} onClick={returnBack} type={type}>
			<h2 className={cl.volverBtn__title}>{children}</h2>
			<IoReturnUpBack className={cl.volverBtn__icon} />
		</BotonPrincipal>
	);
};

export default BotonVolver;

