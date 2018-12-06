import React from "react";
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from "react-router-dom";
import FileExplorer from "./Views/FileExplorer";
import YoutubeDL from "./Views/YoutubeDL";
import NavBar from './Views/Navbar';
import MainMenu from './Views/MainMenu';

class Application extends React.Component {
    render() {
        return <BrowserRouter>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={MainMenu} />
              <Route exact path="/browse" component={FileExplorer} />  
              <Route exact path="/browse/*" component={FileExplorer} />
              <Route exact path="/yt" component={YoutubeDL} />
              <Route exact path="/yt/*" component={YoutubeDL} />
            </Switch>
          </div>
        </BrowserRouter>
    }
}

export default Application;