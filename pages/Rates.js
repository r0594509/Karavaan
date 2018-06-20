import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';

export class Rates extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.mainViewLayout}>
                <Text>TEST</Text>
            </View>
        );
    }
}