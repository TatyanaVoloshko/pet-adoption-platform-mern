export const initialState = {
    pets: []
}

const favoritePetReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
      case "ADD_TO_FAVORITE":
        console.log("ADD_TO_FAVORITE", payload);
        return {
          ...state,
          pets: payload.pets,
        };
      case "REMOVE_FROM_FAVORITE":
        console.log("REMOVE_FROM_FAVORITE", payload);
        return {
          ...state,
          pets: payload.pets,
        };
      case "SET_PETS":
        console.log("SET_PETS", payload);
        return {
          ...state,
          pets: payload,
        };
      default:
        throw new Error(`No case for type ${type} found in favoritePetReducer`);
    }
}

export default favoritePetReducer
