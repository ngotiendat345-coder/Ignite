import * as actionType from "./actionType";

const initState: GamesState = {
  popular: [],
  newGame: [],
  upComing: [],
  searched: [],
  error: "",
};
type GamesAction =
  | {
      type: "FETCH_GAMES";
      payload: {
        popular: Game[];
        upcoming: Game[];
        newGames: Game[];
      };
    }
  | {
      type: "FETCH_SEARCHED";
      payload: {
        searched: Game[];
      };
    }
  | {
      type: "FETCH_FAILED";
      payload: {
        error: string;
      };
    }
  | {
    type:"CLEAR_SEARCH"
  };

const GameReducer = (state: GamesState = initState, action: GamesAction) => {
  switch (action.type) {
    case "FETCH_GAMES":
      console.log(action.payload);
      return {
        ...state,
        popular: action.payload.popular,
        upComing: action.payload.upcoming,
        newGame: action.payload.newGames,
      };
    case "FETCH_SEARCHED":
      console.log(action.payload.searched);
      return {
        ...state,
        searched: action.payload.searched,
      };
    case "FETCH_FAILED":
      return { ...state, error: action.payload.error };
    
    case "CLEAR_SEARCH":
      return {...state,searched:[]}
    };
  return state;
};
export default GameReducer