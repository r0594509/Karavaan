import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/styles';
export class TextBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { text, isValid } = this.props;
        var color = isValid ? 'black' : 'red';
        var css = [styles.titleText, { marginTop: 20, color: color }];
        return (React.createElement(Text, { style: css }, text));
    }
}
//# sourceMappingURL=TextBlock.js.map