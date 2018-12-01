import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import FileListItem from './FileListItem';

function FileList ({files, sortStrategy}) {
    const items = 
        files.sort((a, b) => {
            return a.compareTo(b, sortStrategy);
        }).map(file => {
            return <FileListItem key={`file-${file.get("name")}`}file={file} />
        }).toArray();

    return <div>
        <div className={css(styles.table)}>
            {items}
        </div>
    </div>
}

const styles = StyleSheet.create({
    table: {
        width: '100%'
    }
});

export default FileList;