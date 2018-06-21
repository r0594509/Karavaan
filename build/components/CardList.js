import React from 'react';
import { ScrollView } from 'react-native';
import { Card } from './Card';
export class CardList extends React.Component {
    constructor(props) {
        super(props);
        state = {};
    }
    createCardList(itemList) {
        var itemRender = [];
        const { onPress, onLongPress } = this.props;
        itemList.forEach(item => {
            itemRender.push(React.createElement(Card, { key: item.id, item: item, onPress: onPress, onLongPress: onLongPress }));
        });
        return itemRender;
    }
    render() {
        const { itemList } = this.props;
        return (React.createElement(ScrollView, { contentContainer: { paddingVertical: 20 } }, this.createCardList(itemList)));
    }
}
//# sourceMappingURL=CardList.js.map