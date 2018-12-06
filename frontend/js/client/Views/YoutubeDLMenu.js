import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import { StyleSheet, css } from 'aphrodite';

import Tabs from '@material-ui/core/Tabs';

export default class YoutubeDLMenu extends Component {
  render() {
    return (
        <div className={css(style.base)}>
            <AppBar position="fixed" >
                <h3 style={{paddingLeft: 8}}>Youtube Download UI Tool</h3>
            </AppBar>
        </div>
    )
  }
}

const style = StyleSheet.create({
    base: {
        position: "relative",
        display: "block",
        paddingTop: 80
    }
})