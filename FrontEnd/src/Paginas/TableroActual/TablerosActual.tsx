/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from "react";
import { useParams } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IBoard } from "../../types/board";
import cl from "./CurrentBoard.module.scss";
import ReturnButton from "../../components/UI/button/ReturnButton/ReturnButton.module";
import { useActions } from "../../hooks/useActions";
import ListForm from "../../components/ListForm/ListForm";
import Lists from "../../components/Lists/Lists";
import { useHistory } from "react-router-dom";

interface CurrentBoardParams {
	id: string;
}

const CurrentBoard: FC = () => {
	const { id } = useParams<CurrentBoardParams>();
	const { boards } = useTypedSelector((state) => state.board);
	const { submitFormCancel } = useActions();
	const currentBoard: IBoard = boards[id];
	const history = useHistory();

	if (!currentBoard) {
		return (
			<h1 className={cl.errorTitle} onClick={() => history.push("/")}>
				Board is not found
			</h1>
		);
	}

	return (
		<div className={cl.container}>
			<div className={cl.currentBoard}>
				<div className={cl.currentBoard__col}>
					<ReturnButton url="/" onClick={() => submitFormCancel()}>
						{currentBoard.title}
					</ReturnButton>
				</div>
				<div className={cl.currentBoard__col}>
					<Lists
						listIDs={currentBoard.lists}
						boardID={currentBoard.id}
					/>
					<ListForm boardID={currentBoard.id} />
				</div>
			</div>
		</div>
	);
};

export default CurrentBoard;
