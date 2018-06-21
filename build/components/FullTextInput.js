import React from 'react';
import { TextInput, Text, View } from 'react-native';
import styles from '../styles/styles';
export class FullTextInput extends React.Component {
    constructor(props) {
        super(props);
    }
    getStyle() {
        return this.props.isValid ? styles.FormText : styles.FormTextInvalid;
    }
    getTitle() {
        const { isValid, title, titleInvalid } = this.props;
        return isValid ? title.toUpperCase() : titleInvalid.toUpperCase();
    }
    render() {
        const { id, placeholder, onChangeText, isValid } = this.props;
        return (React.createElement(View, null,
            React.createElement(Text, { key: id, style: this.getStyle() }, this.getTitle()),
            React.createElement(TextInput, { style: styles.FormInput, placeholder: placeholder, onChangeText: (tripDesc) => onChangeText(id, tripDesc) })));
    }
}
//# sourceMappingURL=FullTextInput.js.map