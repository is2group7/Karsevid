import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";

export const espacio = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
