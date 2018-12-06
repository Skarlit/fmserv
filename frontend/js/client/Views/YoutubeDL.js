import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Button } from '@material-ui/core';
import Request from '../Common/Request';

const YOUTUBE_LINK_REGEX = /.*?v=([^&]+)?/

export default class YoutubeDL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetPath: this.props.match.params[0],
            videoId: "",
            audioOnly: true,
            embedThumbnail: true,
            audioFormat: "mp3",
            videoFormat: "best",
            videoInfo: null,
        }
        this.handleCheck = name => event => {
            this.setState({ [name]: event.target.checked });
        };
        this.onVideoIdInput = this.onVideoIdInput.bind(this);
    }
    onVideoIdInput(e) {
        
        const value = e.target.value;
        // Youtube id should be at least of length 11.
        if (value.length < 10)  return;
        // Check if it is a link
        let id;
        if (/^(http|youtu|www).*/.test(value)) {
            let matches = value.match(/youtu.be\/([0-9a-zA-Z_-]+)/);
            id = matches && matches[1];
            if (!id) {
                matches = value.match(/v[=\/]([0-9a-zA-Z_-]+)/);
                id = matches && matches[1];
            }
        } else {
            id = value;
        }

        this.setState({videoId: id}, () => {
            Request.xhr.get('/api/ytinfo?vid=' + id)
            .then(({data}) => {
                this.setState({videoInfo: data});
            })
            .catch((error) => {
                console.error(error);
            });
        });
        // [0-9a-zA-Z_-]+
    }
    render() {
        console.log("YoutubeDL view loaded!");
        return (
            <div>
                <Grid>
                    <FormControl fullWidth>
                        <FormLabel component="legend">Download location:</FormLabel>
                        <TextField margin="normal" 
                            disabled
                            fullWidth
                            multiline={true} 
                            value={this.props.match.params[0] || ""} />
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl fullWidth>
                        <FormLabel component="legend">Video Id/Link</FormLabel>
                        <TextField margin="normal" fullWidth multiline={true} onChange={this.onVideoIdInput}/>
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl component="fieldset" fullWidth>
                        <FormGroup>
                            <FormControlLabel
                                control = {
                                <Checkbox checked={this.state.audioOnly} 
                                    onChange={this.handleCheck('audioOnly')} />}
                                label="Audio only" />
                            <FormControlLabel
                                control = {
                                <Checkbox checked={this.state.embedThumbnail}
                                    onChange={this.handleCheck('embedThumbnail')}  />}
                                label="Embed thumbnail" />                                    
                        </FormGroup>
                    </FormControl>
                </Grid>                
                <Grid>
                    {this.renderFormatSelection()}
                </Grid>
                <Grid>
                    <Button className={css(styles.button)} variant="contained" color="primary">
                        Download
                    </Button>
                </Grid>
            </div>
        )
    }

    renderFormatSelection() {
        if (this.state.audioOnly) {
            return <FormControl fullWidth>
                <InputLabel htmlFor="audio-format">Audio Format</InputLabel>
                <Select
                    value={this.state.audioFormat}
                    inputProps = {{
                        name: 'audioFormat',
                        id: 'audio-format'
                    }}
                  >
                  <MenuItem value="best">auto</MenuItem>
                  <MenuItem value="mp3">mp3</MenuItem>
                  <MenuItem value="wav">wav</MenuItem>
                  <MenuItem value="m4a">m4a</MenuItem>
                  <MenuItem value="flac">flac</MenuItem>
                  <MenuItem value="opus">opus</MenuItem>
                  <MenuItem value="aac">aac</MenuItem>
                </Select>
            </FormControl>
        }

        return <FormControl fullWidth>
                <InputLabel htmlFor="video-format">Video Format</InputLabel>
                <Select
                    value={this.state.videoFormat}
                    inputProps = {{
                        name: 'videoFormat',
                        id: 'video-format'
                    }}
                >
                <MenuItem value="best">auto</MenuItem>
                <MenuItem value="mp4">mp4</MenuItem>
                <MenuItem value="flv">flv</MenuItem>
                <MenuItem value="ogg">ogg</MenuItem>
                <MenuItem value="webm">webm</MenuItem>
                <MenuItem value="mkv">mkv</MenuItem>
                <MenuItem value="avi">avi</MenuItem>
            </Select>
        </FormControl>
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 32,
        marginRight: 8,
        float: 'right'
    }
})