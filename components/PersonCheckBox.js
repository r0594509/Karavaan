import React, { Component } from 'react';
import styles from '../styles/styles';

import CheckBox from 'react-native-check-box';
import { ScrollView, View, Text } from 'react-native';

export class PersonCheckBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { item, onClick } = this.props;
        return (
           <CheckBox
                leftText={item.name}
                onClick={() => this.onClick(item.id)}
                isChecked={false}
                style={styles.FormCheckBoxInput}
            />
        );
    }
}