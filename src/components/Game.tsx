import React, { Dispatch } from 'react'
import {motion} from 'framer-motion';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {PopUp} from '../animation';
import {smallImage} from '../utils';
import { useDispatch } from 'react-redux';
import { fetchDetail } from '../store/actionCreator';

type Props={
    game:Game
}

const Game:React.FC<Props>=({game})=>{
    const {name,released,id,image}= game;
    const stringPathId = id.toString();
    const dispatch:Dispatch<any> = useDispatch();
    const handleLoadingDetail=(id:number)=>{
        document.body.style.overflow="hidden";
        dispatch(fetchDetail(id));
        console.log('link to detail');
    }
   //console.log(stringPathId);
    return (
        <StyledGame variants={PopUp} initial="hidden" animate="show" layoutId={stringPathId}>
            <Link to={`/game/${id}`} onClick={()=>{
                console.log(id);
                handleLoadingDetail(id)
            }}>
                <motion.h3 layoutId={`title ${stringPathId}`}>
                        {name}
                </motion.h3>
                <p>{released}</p>
                <motion.img src={smallImage(image,640)} alt={name} layoutId={`image ${stringPathId}`}/>
            </Link>
        </StyledGame>
    )
}
const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;
export default Game;