import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';

export class Trip extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    //title: `Trip: ${navigation.state.params.id}`,
    title: 'Trip: ' + c.getTrip(navigation.state.params.id).name,
  });

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
    const { params } = this.props.navigation.state;
    var textLoop = [];
    
    c.getTrip(params.id).expenses.forEach(element => {
      textLoop.push(
        // Zijn de CARDS waarop gedrukt kan worden om venster te openen
        // N: iterations need a unique key
        <TouchableHighlight key={element.id} style={{ borderRadius: 5, margin: 5, }} onPress={() => this.goToTrip(element.id)}>
        <View style={styles.cardLayout}>
          <Text style={styles.titleText}>Name: {element.description}</Text>
          <Text>Description: {element.amount}
          </Text>
        </View>
      </TouchableHighlight>
      )
    });

    return (
      <View style={styles.mainViewLayout}>
        <View style={{ flex: 1 }}>

          {/* Zorgt voor een ScrollWheel wanneer het venster te klein wordt */}
          <ScrollView contentContainer={{ paddingVertical: 20 }}>
            {textLoop}
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
            onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
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