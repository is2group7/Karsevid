import classNames from "classnames";
import React, { FC } from "react";
import cl from "./MyPointer.module.scss";

interface MyPointerProps {
	isError: boolean;
	children?: React.ReactNode;
}

const MyPointer: FC<MyPointerProps> = ({ children, isError }) => {
	return (
		<div className={classNames(cl.myPointer, isError ? cl.active : "")}>
			{children}
		</div>
	);
};

export default MyPointer;
