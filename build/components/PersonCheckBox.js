import React from 'react';
import styles from '../styles/styles';
import CheckBox from 'react-native-check-box';
export class PersonCheckBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, onClick } = this.props;
        return (React.createElement(CheckBox, { leftText: item.name, onClick: () => this.onClick(item.id), isChecked: false, style: styles.FormCheckBoxInput }));
    }
}
//# sourceMappingURL=PersonCheckBox.js.map