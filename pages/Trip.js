import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';

export class Trip extends React.Component {
  static navigationOptions = {
    title: 'Trip',
  };

  //Initiele Status van de modal (pop-up venster)
  state = {
    modalVisible: false,
  }

  //Zet de modal visible
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //Rendert het venster
  render() {
    return (
      <View style={styles.mainViewLayout}>
        <View style={{ flex: 1 }}>

          {/* Zorgt voor een ScrollWheel wanneer het venster te klein wordt */}
          <ScrollView contentContainer={{ paddingVertical: 20 }}>

            {/* Zijn de CARDS waarop gedrukt kan worden om venster te openen */}
            <TouchableHighlight style={{ borderRadius: 5, margin: 5, }} onPress={() => alert("clicked")}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>NameOfExpense</Text>
                <Text>Simple Expense toString ex: Person1: amount - Person2: amount -
                  Total: amount
              </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ borderRadius: 5, margin: 5, }} onPress={() => alert("clicked")}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>NameOfExpense</Text>
                <Text>Simple Expense toString ex: Person1: amount - Person2: amount </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ borderRadius: 5, margin: 5, }} onPress={() => alert("clicked")}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>NameOfExpense</Text>
                <Text>Simple Expense toString ex: Person1: amount - Person2: amount </Text>
              </View>
            </TouchableHighlight>

          </ScrollView>

          {/* Knop voor het formulier te openen om een Trip toe te voegen */}
          <View>
            <TouchableHighlight onPress={() => this.setModalVisible(true)} style={styles.ButtonLayoutMain}>
              <View>
                <Text style={styles.ButtonText}>Add Expense</Text>
              </View>
            </TouchableHighlight>
          </View>

          {/* Formulier Venster voor een Trip aan te maken 
        Toekomst te steken in een aparte .js file
        */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { alert("Modal has been closed.") }}
          >
            {/* Formulier inhoud */}
            <View style={{ marginTop: 22, flex: 1 }}>

            <Text style={styles.FormText}>EXPENSE NAME</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="Type the expense name here!"
                onChangeText={(text) => this.setState({ text })}
              />

              <Text style={styles.FormText}>EXPENSE AMOUNT</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="Type the expense amount here!"
                onChangeText={(text) => this.setState({ text })}
              />

              <Text style={styles.FormText}>PERSON OWED</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="Type the person owed ID here!"
                onChangeText={(text) => this.setState({ text })}
              />

              <Text style={styles.FormText}>EXPENSE FRIENDS</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="example: 13_14_16"
                onChangeText={(text) => this.setState({ text })}
              />

              <Text style={styles.FormText}>EXPENSE DATE</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="Type the expense date here!"
                onChangeText={(text) => this.setState({ text })}
              />

              <View>

                <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.ButtonLayoutMain}>
                  <View>
                    <Text style={styles.ButtonText}>Save</Text>
                  </View>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>

        </View>
      </View>
    );
  }
}