const initState: DetailGameState = {
  game: {
    name: "",
    image: "",
    id: 0,
    rating: 0,
    descriptionRaw: "",
    platforms: [],
  },
  screen: [],
  isLoading: true,
};
export type DetailGameAction =
  | {
      type: "DETAIL_SUCCESS";
      payload: {
        screen: IScreen[];
        game: IDetailGame;
      };
    }
  | { type: "LOADING_DETAIL" };

const DetaiReducer = (
  state: DetailGameState = initState,
  action: DetailGameAction
): DetailGameState => {
  switch (action.type) {
    case "LOADING_DETAIL":
      return { ...state, isLoading: true };
    case "DETAIL_SUCCESS":
        console.log(action.payload);
      return {
        ...state,
        game: action.payload.game,
        screen: action.payload.screen,
        isLoading:false
      };
  }
  return state;
};

export default DetaiReducer;
