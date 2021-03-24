import * as actionType from "./actionType";
import axios, { AxiosResponse } from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL,
  gameDetailsURL,
  gameScreenshotURL,
} from "../api";

export const fetchDetail = (id: number) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: "LOADING_DETAIL" });

    const detailData: AxiosResponse<any> = await axios.get(gameDetailsURL(id));
    const screenData: AxiosResponse<any> = await axios.get(
      gameScreenshotURL(id)
    );
    console.log(detailData,screenData);
    const {
      name,
      rating,
      description_raw,
      background_image,
      platforms,
    } = detailData.data;
    const game: IDetailGame = {
      id: detailData.data?.id,
      rating,
      descriptionRaw: description_raw,
      name,
      image: background_image,
      platforms,
    };
    
    const screen: IScreen[] = screenData.data?.results.map((item: any) => {
      const { id, image } = item;
      return { id, image };
    });
    
    dispatch({ type: "DETAIL_SUCCESS", payload: { game, screen } });
  };
};
export const fetSearched = (name: string) => {
  return async (dispatch: DispatchType) => {
    const searchData: AxiosResponse<any> = await axios.get(searchGameURL(name));
    console.log(searchData);
    const searched: Game[] = searchData.data?.results.map((item: any) => {
      const { id, released, background_image, name } = item;
      return { id, released, image: background_image, name };
    });

    dispatch({
      type: actionType.FETCH_SEARCHED,
      payload: {
        searched,
      },
    });
  };
};
export const fetchGames = () => {
  return async (dispatch: DispatchType) => {
    try {
      const popular: AxiosResponse<any> = await axios.get(popularGamesURL());
      const upcoming: AxiosResponse<any> = await axios.get(upcomingGamesURL());
      const newgame: AxiosResponse<any> = await axios.get(newGamesURL());
      console.log(popular, upcoming, newgame);
      const newPopular: Game[] = popular.data?.results.map((item: any) => {
        const { id, released, background_image, name } = item;
        return { id, released, image: background_image, name };
      });
      const newUpcoming: Game[] = upcoming.data?.results.map((item: any) => {
        const { id, released, background_image, name } = item;
        return { id, released, image: background_image, name };
      });
      const newNewgame: Game[] = newgame.data?.results.map((item: any) => {
        const { id, released, background_image, name } = item;
        return { id, released, image: background_image, name };
      });
      dispatch({
        type: actionType.FETCH_GAMES,
        payload: {
          popular: newPopular,
          upcoming: newUpcoming,
          newGames: newNewgame,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: actionType.FETCH_FAILED,
        payload: {
          errors: err,
        },
      });
    }
  };
};
