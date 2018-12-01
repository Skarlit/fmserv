import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Label from './Label';
import Icon from './Icon';
import DownloadLink from './DownloadLink';
import BrowseLink from './BrowseLink';

function FileListItem ({file}) {
    return <div className={css(styles.base)}>
        {(() => {
            if (!file.getIsDir()) {
                return  <div className={css(styles.stat)}>   
                    <div className={css(styles.extLabel)}><Label text={file.getExt()} /></div>
                    <div className={css(styles.sizeLabel)}><Label text={file.getReadableSize()} /></div>
                    <div className={css(styles.dateLabel)}><Label text={file.getReadableTimestamp()} /></div> 
                </div>
            }})()}
      
        <div className={css(styles.filename)}>
            <span className={css(styles.icon)}><Icon type={file.getType()} /></span>
            {(() => file.getIsDir()
            ? <BrowseLink text={file.getName()} href={file.getUrl()} /> 
            : <DownloadLink text={file.getName()} href={file.getUrl()} />)()
            }
        </div>
    </div>
}


const styles = StyleSheet.create({
    base: {
        padding: "4px 0",
        borderBottom: "1px solid rgb(220, 220, 220)",
        width: "100%",
        position: "relative",
    },
    icon: {
        padding: "0 4px",
        position: "absolute",
        left: 0,
        top: 0,
    },
    filename: {
        padding: "3px 0 3px 24px",
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        wordWrap: "break-word",
    },
    stat: {
        padding: "2px 0",
        alignItems: 'center',
        display: 'flex',
        flexAlign: "end",
        justifyContent: "flex-end",
        textAlign: "right"
    },
    extLabel: {
        paddingLeft: 4,
    },
    sizeLabel: {
        width: 32,
        paddingLeft: 16,
    },
    dateLabel: {
        width: 80,
        paddingLeft: 8,
    }
});

export default FileListItem;