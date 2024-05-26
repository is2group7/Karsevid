import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../espacios/reducers"; 

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
