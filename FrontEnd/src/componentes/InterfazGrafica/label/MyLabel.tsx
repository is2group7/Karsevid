import React, { FC } from "react";
import cl from "./MyLabel.module.scss";

interface MyLabelProps {
	id: string;
	children: React.ReactNode;
	className?: string;
}

const MyLabel: FC<MyLabelProps> = ({ id, children, className }) => {
	return (
		<label className={`${cl.myLabel} ${className}`} htmlFor={id}>
			{children}
		</label>
	);
};

export default MyLabel;
