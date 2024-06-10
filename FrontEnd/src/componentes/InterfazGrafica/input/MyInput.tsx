import React, { FC } from "react";
import cl from "./MyInput.module.scss";

interface MyInputProps {
	className?: string;
	id?: string;
	value: string;
	autoFocus?: boolean;

	onBlur?: () => void;
	onChange: (value: string) => void;
}

const MyInput: FC<MyInputProps> = ({
	id,
	value,
	onChange,
	className,
	onBlur,
	autoFocus,
}) => {
	return (
		<input
			id={id}
			className={`${cl.myInput} ${className}`}
			autoComplete="off"
			maxLength={40}
			// eslint-disable-next-line jsx-a11y/no-autofocus
			autoFocus={autoFocus}
			value={value}
			onBlur={onBlur}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
};

export default MyInput;
