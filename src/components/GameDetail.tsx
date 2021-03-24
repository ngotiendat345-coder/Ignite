import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { smallImage } from "../utils";
//IMAGES
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";
//IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import { useHistory } from "react-router";
import { FadeIn, PopUp } from "../animation";

type Props = {
  pathId: string
  id:string
};
const GameDetail: React.FC<Props> = ({ pathId }) => {
    const history = useHistory();
    console.log('detail init');
  const { game, screen, isLoading } = useSelector(
    (state: RootState) => state.DetaiReducer
  );
  const getStars = (rating: number) => {
    const starts = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        starts.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        starts.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return starts;
  };
  const getPlatform = (platform: string) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };
  const exitDetailHander = (e:React.MouseEvent<HTMLElement>)=>{
      const target = e.currentTarget;
      if(target.classList.contains("shadow")){
        document.body.style.overflow = "auto";
        history.push("/");
      }
  }
  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHander}>
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars(game.rating)}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map((data:any) => (
                    <img
                      alt={data.platform.name}
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.image, 1280)}
                alt={game.image}
              />
            </Media>
            <Description>
              <p>{game.descriptionRaw}</p>
            </Description>
            <div className="gallery">
              {screen.map((item:IScreen) => (
                <img
                  src={smallImage(item.image, 1280)}
                  key={item.id}
                  alt={item.image}
                />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;


export default GameDetail;
