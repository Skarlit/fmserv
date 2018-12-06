import React from "react";
import { StyleSheet, css } from 'aphrodite';
import { Route, Switch } from 'react-router';
import FileExplorerMenu from './FileExplorerMenu';
import YoutubeDLMenu from './YoutubeDLMenu';

class NavBar extends React.Component {
    render() {
        return <Switch>
                <Route exact path="/browse" component={FileExplorerMenu} />  
                <Route path="/browse/*" component={FileExplorerMenu} />
                <Route exact path="/yt" component={YoutubeDLMenu} />
                <Route exact path="/yt/*" component={YoutubeDLMenu} />
            </Switch>
    }
}

const styles = StyleSheet.create({

})

export default NavBar;