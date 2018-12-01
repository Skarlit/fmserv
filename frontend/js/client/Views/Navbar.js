import React from "react";
import { StyleSheet, css } from 'aphrodite';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";
import FileExplorerMenu from './FileExplorerMenu';
import Button from "../Components/Button";

class NavBar extends React.Component {
    render() {
        return <div>
            <div className={css(styles.navbar)}>
                <Button icon="BAR_MENU" iconSize="2x" className={css(styles.menuBtn)} />
            </div> 
            <Router>
                <div className={css(styles.content)}>
                    <Switch>
                        <Route exact path="/browse" component={FileExplorerMenu} />  
                        <Route path="/browse/*" component={FileExplorerMenu} />
                    </Switch>
                </div>
            </Router>
        </div>
    }
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#444",
        position: "fixed",
        height: 40,
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        paddingTop: 40,
    },
    menuBtn: {
        color: "#d1d1d1", 
        padding: "6px 6px"
    }
})

export default NavBar;