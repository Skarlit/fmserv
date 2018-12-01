import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { LABEL_TEXT_COLOR, LABEL_TEXT_SIZE } from '../Common/Spec';

function Label ({text}) {
    return <span className={css(styles.base)}>
        {text}
    </span>
}

const styles = StyleSheet.create({
    base: {
        fontSize: LABEL_TEXT_SIZE,
        color: LABEL_TEXT_COLOR
    }
});

export default Label;