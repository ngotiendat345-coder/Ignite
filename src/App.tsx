import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';

import {
  Route,
} from "react-router-dom";
import GlobalStyles from './components/GlobalStyle';
import Nav from './components/Nav';
import Home from './pages/Home';

const App:React.FC =()=>{


    return(
      <div className="App">
         <Nav />
        <GlobalStyles/>
        <Route path={["/game/:id", "/"]}>
            <Home/>
        </Route>
      </div>
    )
}

export default App;
