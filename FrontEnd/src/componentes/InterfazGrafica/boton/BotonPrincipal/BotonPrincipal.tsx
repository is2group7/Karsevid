import React, { FC, FunctionComponent } from "react";
import cl from "./BotonPrincipal.module.scss";

interface BotonPrincipalProps {
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
	children?: React.ReactNode;

	onClick?: () => void;
	onDblClick?: () => void;
}

const BotonPrincipal: FunctionComponent <BotonPrincipalProps> = ({
	className,
	children,
	onClick,
	onDblClick,
	type,
}) => {
	return (
		<button
			className={`${cl.BtnPrincipal} ${className}`}
			type={type}
			onClick={onClick}
			onDoubleClick={onDblClick}
		>
			{children}
		</button>
	);
};

export default BotonPrincipal;