import React, { Component } from 'react';
import { TouchableHighlight, View, Text} from 'react-native';
import styles from '../styles/styles';

export class Button extends React.Component {

    constructor(props) {
        super(props);
        state = {
        }
    }
    render() {
        const { title, onPress } = this.props;

        return (
          <View>
            <TouchableHighlight 
                style={styles.ButtonLayoutMain}
                onPress={() => onPress()} 
            >
              <View>
                <Text style={styles.ButtonText}>{title}</Text>
              </View>
            </TouchableHighlight>
          </View>
        );
    }
}