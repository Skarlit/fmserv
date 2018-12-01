import React from 'react';
import { StyleSheet, css } from 'aphrodite';
const Utility = require('../../common/utils/Utility');

import { LABEL_TEXT_COLOR, TINY_LABEL_TEXT_SIZE } from '../Common/Spec';

function DateCell ({children}) {
    const {yyyy, mm, dd, h, m}  = Utility.getTimestampFromMs(parseInt(children));
    return <div className={css(styles.base)}>
        {`${yyyy}/${mm}/${dd}`}
    </div>
}

const styles = StyleSheet.create({
    base: {
        fontSize: TINY_LABEL_TEXT_SIZE,
        color: LABEL_TEXT_COLOR
    }
});

export default DateCell;