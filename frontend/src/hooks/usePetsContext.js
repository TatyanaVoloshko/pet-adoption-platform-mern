/* frontend/src/hooks/usePetsContext.js */
import { PetsContext } from "../context/PetsContext";
import { useContext } from "react";

export const usePetsContext = () => {
    const context = useContext(PetsContext)

    if (!context) {
        throw Error('usePetsContext must be used inside an PetsContextProvider')
    }

    return context
}