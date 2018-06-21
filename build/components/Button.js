import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import styles from '../styles/styles';
export class Button extends React.Component {
    constructor(props) {
        super(props);
        state = {};
    }
    render() {
        const { title, onPress } = this.props;
        return (React.createElement(View, null,
            React.createElement(TouchableHighlight, { style: styles.ButtonLayoutMain, onPress: () => onPress() },
                React.createElement(View, null,
                    React.createElement(Text, { style: styles.ButtonText }, title)))));
    }
}
//# sourceMappingURL=Button.js.map