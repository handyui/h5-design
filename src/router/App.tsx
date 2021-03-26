import React, { FC } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from '../pages/Editor'
import DragCanvas from '../pages/dragCanvas'
import Home from '../pages/home'
import Workspace from '../pages/workspace'
import Trash from '../pages/trash'

const App: FC = () => {
 
  return (
    <>
     <Router> 
       <Switch>
        <Route exact path="/editor" component={Editor}/>
        <Route path="/dragCanvas" component={DragCanvas}/>
        <Route  path="/" render={()=>
          <Home>
            <Route exact path="/" component={Workspace}/>
            <Route  path="/trash" component={Trash}/>
          </Home>
        }/> 
       
      </Switch>
     </Router>
    </>
  )
}

export default App
