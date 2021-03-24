import React, { Dispatch, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FadeIn } from "../animation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import Game from "../components/Game";
import { fetchGames } from "../store/actionCreator";
import { useLocation, useParams } from "react-router";
import GameDetail from "../components/GameDetail";
const Home: React.FC = () => {
    const location = useLocation();
    const pathID = location.pathname.split("/")[2];
    const { popular, newGame, upComing, searched } = useSelector(
        (state: RootState) => state.GameReducer
    );
    const {isLoading} = useSelector((state:RootState)=>state.DetaiReducer);
    const dispatch: Dispatch<any> = useDispatch();
    console.log("render home", pathID);
    useEffect(() => {
        dispatch(fetchGames());
    }, []);
    console.log(pathID);
    return (
        <GameList variants={FadeIn} initial="hidden" animate="show">
            <AnimateSharedLayout type="crossfade">
                <AnimatePresence>
                    {pathID && <GameDetail id={pathID} pathId={pathID}/>}
                </AnimatePresence>
                {searched.length > 0 ? (
                    <div>
                        <h2>Upcoming Games</h2>
                        <Games>
                            {searched.map((item: Game) => (
                                <Game game={item} key={item.id} />
                            ))}
                        </Games>
                    </div>
                ) : (
                    ""
                )}
                <h2>Upcoming Games</h2>
                <Games>
                    {popular.map((item: Game) => (
                        <Game game={item} key={item.id} />
                    ))}
                </Games>
                <h2>Popular Games</h2>
                <Games>
                    {upComing.map((item: Game) => (
                        <Game game={item} key={item.id} />
                    ))}
                </Games>
                <h2>New Games</h2>
                <Games>
                    {newGame.map((item: Game) => (
                        <Game game={item} key={item.id} />
                    ))}
                </Games>
            </AnimateSharedLayout>
        </GameList>
    );
};
const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;
export default Home;
