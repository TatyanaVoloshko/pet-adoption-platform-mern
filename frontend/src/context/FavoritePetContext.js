import { createContext, useContext, useEffect, useReducer } from "react"
import favoritePetReducer, { initialState } from "./favoritePetReducer"

const FavoritePetContext = createContext(initialState)

export const FavoritePetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoritePetReducer, initialState)
    
    useEffect(() => {
        const storedFavorPets = localStorage.getItem('favoritePets')
         console.log("Stored favorite pets:", storedFavorPets);
        if (storedFavorPets) {
            dispatch({ type: "SET_PETS", payload: JSON.parse(storedFavorPets) });
        }
    }, [])
    
   const addToFavorite = (pet) => {
     const updatedFavorPage = [...state.pets, pet];

     dispatch({
       type: "ADD_TO_FAVORITE",
       payload: {
         pets: updatedFavorPage,
       },
     });
      
     localStorage.setItem("favoritePets", JSON.stringify(updatedFavorPage));
   };

    const removeFromFavorite = (pet) => {
        const updatedFavorPage = state.pets.filter((currentPet) => currentPet._id !== pet._id)
        
         dispatch({
           type: "REMOVE_FROM_FAVORITE",
           payload: {
             pets: updatedFavorPage
           },
         });
        
       
        localStorage.setItem("favoritePets", JSON.stringify(updatedFavorPage));
    }

    const value = {
        pets: state.pets,
        addToFavorite,
        removeFromFavorite
    }

    return <FavoritePetContext.Provider value={value}>{ children }</FavoritePetContext.Provider>
}

const useFavorite = () => {
    const context = useContext(FavoritePetContext)

    if (context === undefined) {
        throw new Error("useFavorite must be used within FavoritePetContext")
    }

    return context
}

export default useFavorite
