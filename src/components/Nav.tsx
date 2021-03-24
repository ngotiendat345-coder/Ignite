import React, { Dispatch, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FadeIn } from "../animation";
import logo from "../img/logo.svg";
import { useDispatch } from "react-redux";
import { fetSearched } from "../store/actionCreator";
const Nav: React.FC = () => {
  const [text,setText] =  useState('');
  const dispatch:Dispatch<any> = useDispatch();

  const handleOnChangeInput = (e:FormEvent<HTMLInputElement>)=>{
    setText(e.currentTarget.value);
  }
  const clearSearched=()=>{
    dispatch({type:"CLEAR_SEARCH"})
  }
  const handleOnSubmit = (e:FormEvent)=>{
    e.preventDefault();
    if(text){
      dispatch(fetSearched(text))
    }
    setText('');
  }
  return (
    <StyledNav variants={FadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </Logo>
      <form className="search" onSubmit={handleOnSubmit}>
        <input type="text" onChange={handleOnChangeInput} value={text}/>
        <button type="submit">Search</button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    height: 2rem;
    width: 2rem;
  }
`;
export default Nav;
