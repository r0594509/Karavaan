import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput, Picker } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import Popup from 'react-native-popup';
import { Person } from '../domain/model/Person';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';

export class PersonSummary extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Name: ' + c.getPerson(navigation.state.params.id).name + '      Filter: ' + navigation.state.params.filter,
    });

    constructor(props) {
        super(props);
    }

    state = {
        personId: this.props.navigation.state.params.id,
        filter: this.props.navigation.state.params.filter,
    }

    render() {
        var ExpenseList = [];

        c.getPersonExpenses(this.state.personId, this.state.filter ).forEach(element => {
            ExpenseList.push(
            // elk element in een lus heeft blijkbaar een ID nodig
            <TouchableHighlight key={element.id} style={{ borderRadius: 5, margin: 5, }}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>{element.description}</Text>
                <Text>Amount: {c.getPersonPaidAmount(this.state.personId, element.id)}</Text>
              </View>
            </TouchableHighlight>
          )
        });
        return (
            <View style={styles.mainViewLayout} >
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainer={{ paddingVertical: 20 }}>
                        <View style={styles.cardLayout}>
                            {ExpenseList}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}