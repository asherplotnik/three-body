import { createContext, useContext } from "react";

export const AppContext = createContext< ContextUpdater | undefined>(undefined);

export const useAppContext = ():ContextUpdater => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("something went wrong!");
    }

    return context;
}