import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import styles from '../styles/styles';
export class Card extends React.Component {
    constructor(props) {
        super(props);
        state = {};
    }
    render() {
        const { item, onPress, onLongPress } = this.props;
        return (React.createElement(TouchableHighlight, { style: { borderRadius: 5, margin: 5, }, onPress: () => onPress(item.id), onLongPress: () => onLongPress(item.id) },
            React.createElement(View, { style: styles.cardLayout },
                React.createElement(Text, { style: styles.titleText },
                    "Name: ",
                    item.name),
                React.createElement(Text, null,
                    "Description: ",
                    item.description))));
    }
}
//# sourceMappingURL=Card.js.map