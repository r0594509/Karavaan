import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Trip } from './Trip';


export class Trips extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'All Trips'
  };

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  goToTrip()
  {
    this.props.navigation.navigate('Trip');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <ScrollView contentContainer={{ paddingVertical: 20 }}>

            <TouchableHighlight style={{borderRadius: 20,}} onPress={() => this.goToTrip()}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>NameOfTrip</Text>
                <Text>DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip
                DescriptionOfTrip DescriptionOfTrip.
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{borderRadius: 20,}} onPress={() => alert("clicked")}>
              <View style={styles.cardLayout}>
                <Text style={styles.titleText}>NameOfTrip</Text>
                <Text>DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip DescriptionOfTrip
                DescriptionOfTrip DescriptionOfTrip.
                </Text>
              </View>
            </TouchableHighlight>

          </ScrollView>

          <View>
            <Button
              title='Uitgave Toevoegen'
              color='#850886'
              onPress={() => this.setModalVisible(true)}
            />
          </View>


          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { alert("Modal has been closed.") }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Text>Hello World!</Text>

                <Button
                  title='save'
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                  <Text>Hide Modal</Text>
                </Button>

              </View>
            </View>
          </Modal>



        </View>
      </View>
    );
  }

  constru =  styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
      
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cardLayout: {
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: 'black',
      flexDirection: "column", 
      height: 100, 
      padding: 20, 
      margin: 5,
      backgroundColor: "lightgrey"

    },
  });
}