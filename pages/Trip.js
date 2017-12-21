import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
import { Expense } from '../domain/model/Expense';
import { Category } from '../domain/model/Category';

export class Trip extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    //title: `Trip: ${navigation.state.params.id}`,
    title: 'Trip: ' + c.getTrip(navigation.state.params.id).name,
  });

  //Initiele Status van de modal (pop-up venster)
  state = {
    modalVisible: false,
    formNameIsValid: true,
    formAmntIsValid: true,
    formDateIsValid: true,
    expenseCategorySelected: Category.All,
    categoryTitle: "Select a category",
    categoryFormTitle: 'Select Category',
    currencyFormTitle: 'Select Currency',
  }

  handleOnSave_newExpenseForm() {
    this.saveNewExpense();
  }

  saveNewExpense() {
    let name = this.state.expenseName;
    let amnt = this.state.expenseAmnt;
    let date = this.state.expenseDate;

    let errors = 0;

    if (!Expense.isValidExpenseName(name)) {
      errors++;
      this.setState({ formNameIsValid: false })
    } else {
      this.setState({ formNameIsValid: true });
    }

    if (!Expense.isValidExpenseAmount(amnt)) {
      errors++;
      this.setState({ formAmntIsValid: false })
    } else {
      this.setState({ formAmntIsValid: true });
    }

    if (!Expense.isValidExpenseDate(date)) {
      errors++;
      this.setState({ formDateIsValid: false })
    } else {
      this.setState({ formDateIsValid: true });
    }

    if (errors === 0) {
      const { params } = this.props.navigation.state;
      let expense = new Expense(name, Category.Misc, date, amnt);
      c.addExpenseToTrip(params.id, expense);

      this.toggleModalVisible();
      // clear state for next form
      this.state.expenseName = null;
      this.state.expenseAmnt = null;
      this.state.expenseDate = null;
      this.state.expenseFriends = null;
      this.state.expensePerson = null;
    }
  }

  handleOnCancel_newExpenseForm() {
    this.toggleModalVisible();
    this.setState({ formNameIsValid: true });
    this.setState({ formAmntIsValid: true });
    this.setState({ formDateIsValid: true });
  }

  toggleModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  //Rendert het venster
  render() {
    const { params } = this.props.navigation.state;
    
    let data = [];
    for (var n in Category) {
      if ( typeof Category[n] === 'string') data.push({value: n});
    }
    
    var textLoop = [];
    
    c.getExpensesForTrip(params.id, this.state.expenseCategorySelected).forEach(element => {
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

    var formName = [];
    var formAmnt = [];
    var formDate = [];

    if (this.state.formNameIsValid) {
      formName.push(
        <Text key="formName" style={styles.FormText}>EXPENSE NAME</Text>
      )
    } else {
      formName.push(
        <Text key="formName" style={styles.FormTextInvalid}>EXPENSE NAME IS NOT VALID</Text>
      )
    }

    if (this.state.formAmntIsValid) {
      formAmnt.push(
        <Text key="formAmnt" style={styles.FormText}>EXPENSE AMOUNT</Text>
      )
    } else {
      formAmnt.push(
        <Text key="formAmnt" style={styles.FormTextInvalid}>EXPENSE AMOUNT IS NOT VALID</Text>
      )
    }

    if (this.state.formDateIsValid) {
      formDate.push(
        <Text key="formDate" style={styles.FormText}>EXPENSE DATE</Text>
      )
    } else {
      formDate.push(
        <Text key="formDate" style={styles.FormTextInvalid}>EXPENSE DATE IS NOT VALID</Text>
      )
    }

    return (
      <View style={styles.mainViewLayout}>
        <View style={{ flex: 1 }}>
          <Dropdown
            label={this.state.categoryTitle}
            data={data}
            onChangeText={(expenseCategorySelected) => this.setState({expenseCategorySelected: expenseCategorySelected})}
            fontSize={20}
            containerStyle={{ paddingLeft: 15, paddingRight: 15 }}
            baseColor='rgba(0, 0, 0, 1)'
            dropdownPosition={1}
          />

          {/* Zorgt voor een ScrollWheel wanneer het venster te klein wordt */}
          <ScrollView contentContainer={{ paddingVertical: 20 }}>
            {textLoop}
          </ScrollView>

          {/* Knop voor het formulier te openen om een Trip toe te voegen */}
          <View>
            <TouchableHighlight onPress={() => this.handleOnCancel_newExpenseForm()} style={styles.ButtonLayoutMain}>
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
            onRequestClose={() => this.toggleModalVisible()}
          >
            {/* Formulier inhoud */}
            <View style={{ marginTop: 22, flex: 1 }}>

              <Text style={styles.FormText}>EXPENSE NAME</Text>
              <TextInput
                style={styles.FormInput}
                placeholder="Type the expense name here!"
                onChangeText={(expenseName) => this.setState({ expenseName })}
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    label={this.state.categoryFormTitle}
                    data={data}
                    onChangeText={(expenseCategory) => this.setState({expenseCategory})}
                    //fontSize={16}
                    containerStyle={{ paddingLeft: 15}}
                    baseColor='rgba(0, 0, 0, 1)'
                    dropdownPosition={1}
                  />
                </View>
                <View style={{ width: 200, marginLeft: 8 }}>
                  <TextInput
                    style={[styles.FormInput, { marginTop: 32 }]}
                    placeholder="Expense Date"
                    onChangeText={(expenseDate) => this.setState({ expenseDate })}
                    keyboardType='numeric'
                  />
                </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={[styles.FormInput, { marginTop: 32 }]}
                      placeholder="Expense Amount"
                      onChangeText={(exspenseAmount) => this.setState({ exspenseAmount })}
                      keyboardType='numeric'
                    />
                  </View>
                  <View style={{ width: 200, marginLeft: 8 }}>
                    <Dropdown
                      label={this.state.currencyFormTitle}
                      data={data}
                      onChangeText={(expenseCurrency) => this.setState({expenseCurrency})}
                      //fontSize={16}
                      containerStyle={{ paddingRight: 15 }}
                      baseColor='rgba(0, 0, 0, 1)'
                      dropdownPosition={1}
                    />
                  </View>

                </View>
              </View>
              <View>
                <TouchableHighlight onPress={() => this.handleOnSave_newExpenseForm()} style={styles.ButtonLayoutMain}>
                  <View>
                    <Text style={styles.ButtonText}>Save</Text>
                  </View>
                </TouchableHighlight>

              </View>

          </Modal>

        </View>
        </View>
        );
  }
}