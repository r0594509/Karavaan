import React, { Component } from 'react';
import { TouchableHighlight, View, Text} from 'react-native';
import styles from '../styles/styles';

export class Card extends React.Component {

    constructor(props) {
        super(props);
        state = {

        }
    }
    render() {
        const { item, onPress, onLongPress} = this.props;

        return (
            <TouchableHighlight 
                style={{ borderRadius: 5, margin: 5, }} 
                onPress={() => onPress(item.id)} 
                onLongPress={() => onLongPress(item.id)}
            >
                <View style={styles.cardLayout}>
                    <Text style={styles.titleText}>Name: {item.name}</Text>
                    <Text>Description: {item.description}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}