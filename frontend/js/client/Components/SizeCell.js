import React from 'react';
import { StyleSheet, css } from 'aphrodite';
const Utility = require('../../common/utils/Utility');

import { LABEL_TEXT_COLOR, LABEL_TEXT_SIZE } from '../Common/Spec';

function SizeCell ({children}) {
    return <span className={css(styles.base)}>
        {Utility.getReadableSize(parseInt(children))}
    </span>
}

const styles = StyleSheet.create({
    base: {
        fontSize: LABEL_TEXT_SIZE,
        color: LABEL_TEXT_COLOR
    }
});

export default SizeCell;