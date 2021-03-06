import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../styles/styles';
import { PersonCheckBox } from './PersonCheckBox';
import { CurrencyCheckBox } from './CurrencyCheckBox';
export class CheckList extends React.Component {
    constructor(props) {
        super(props);
    }
    createRenderList(type, itemList) {
        switch (type) {
            case 'person':
                return (this.createPersonList(itemList));
                break;
            case 'currency':
                return (this.createCurrencyList(itemList));
                break;
            default:
                return (React.createElement(Text, null, "undefined"));
                break;
        }
    }
    createPersonList(personList) {
        const { onClick } = this.props;
        var itemRender = [];
        personList.forEach(item => {
            itemRender.push(React.createElement(PersonCheckBox, { key: item.id, item: item, onClick: onClick }));
        });
        return itemRender;
    }
    createCurrencyList(currencyList) {
        const { onClick } = this.props;
        var itemRender = [];
        currencyList.forEach(item => {
            itemRender.push(React.createElement(CurrencyCheckBox, { key: item.value, item: item, onClick: onClick }));
        });
        return itemRender;
    }
    render() {
        const { type, title, itemList } = this.props;
        var RenderList = this.createRenderList(type, itemList);
        return (React.createElement(View, null,
            React.createElement(Text, { style: styles.FormText }, title.toUpperCase()),
            React.createElement(ScrollView, { style: { flex: 1 }, contentContainer: { paddingVertical: 20 } }, RenderList)));
    }
}
//# sourceMappingURL=CheckList.js.map