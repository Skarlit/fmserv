import React from "react";
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Link } from "react-router-dom";
import FileExplorer from "./Views/FileExplorer";
import NavBar from './Views/Navbar';
import MainMenu from './Views/MainMenu';

class Application extends React.Component {
    render() {
        return <Router>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={MainMenu} />
              <Route exact path="/browse" component={FileExplorer} />  
              <Route path="/browse/*" component={FileExplorer} />
            </Switch>
          </div>
        </Router>
    }
}

export default Application;