import React from 'react';
import styles from '../styles/styles';
import CheckBox from 'react-native-check-box';
export class CurrencyCheckBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, onClick } = this.props;
        return (React.createElement(CheckBox, { leftText: item.value, onClick: () => this.onClick(item), isChecked: false, style: styles.FormCheckBoxInput }));
    }
}
//# sourceMappingURL=CurrencyCheckBox.js.map