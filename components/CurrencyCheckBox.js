import React, { Component } from 'react';
import styles from '../styles/styles';

import CheckBox from 'react-native-check-box';

export class CurrencyCheckBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { item, onClick } = this.props;

        return (
            <CheckBox
                leftText={item.value}
                onClick={() => this.onClick(item)}
                isChecked={false}
                style={styles.FormCheckBoxInput}
            />
        );
    }
}