const initialState = {
  contacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "ADD_CONTACTS":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    default:
      return state;
  }
};
