import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
import Popup from 'react-native-popup';
import { Expense } from '../domain/model/Expense';
import { Category } from '../domain/model/Category';
import { Money, Currencies, Currency } from 'ts-money';

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
    expenseCategory: null,
    expenseCurrency: null,
    expenseCategorySelected: Category.All,
    categoryTitle: "Sort trips by category",
    categoryFormTitle: 'Select Category',
    currencyFormTitle: 'Select Currency',
  }

  constructor(props) {
    super(props);
  }

  goToExpense(tripId, expenseId) {
    this.props.navigation.navigate('ExpenseScreen', { tripId: tripId, expenseId: expenseId });
  }

  handleOnSave_newExpenseForm() {
    this.saveNewExpense();
  }

  removeItem(id) {
    const { params } = this.props.navigation.state;

    this.popup.confirm({
      title: 'Remove',
      content: ['Do you want to remove,', 'Expense: ' + c.getExpensesForTrip(params.id, id).description],
      ok: {
        text: 'Yes',
        style: {
          color: 'red'
        },
        callback: () => {
          this.popup.alert(c.getExpensesForTrip(params.id, id).description + ' has been removed!');
          c.removeExpenseInTrip(params.id, id);
          // force a view update by calling setState method
          this.setState({ update: true });
        },
      },
      cancel: {
        text: 'No',
        style: {
          color: 'black'
        },
        callback: () => {
          this.popup.alert(c.getExpensesForTrip(params.id, id).description + ' has not been removed.');
        },
      },
    });
  }

  saveNewExpense() {
    let name = this.state.expenseName;
    let amnt = this.state.expenseAmnt;
    let date = this.state.expenseDate;
    let category = this.state.expenseCategory;
    let currency = this.state.expenseCurrency;

    let errors = 0;

    if (category == null) {
      errors++;
      this.setState({ expenseCategoryIsValid: false});
    } else {
      this.setState({ expenseCategoryIsValid: true});
    }
    if (currency == null) {
      errors++;
      this.setState({ expenseCurrencyIsValid: false});
    } else {
      this.setState({ expenseCurrencyIsValid: true});
    }

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
      let expense = new Expense(params.id, name, Category[category], /*date=HARDCODED*/ new Date(2017, 12, 24, 0, 0, 0, 0), amnt, /*idDevided=HARDCODED*/ false, Currencies[currency]);
      //console.log(expense.expenseCurrency);
      c.addExpense(expense);
      //console.log(c.getTrip(params.id).expenses);

      this.toggleModalVisible();
      // clear state for next form
      this.state.expenseName = null;
      this.state.expenseAmnt = null;
      this.state.expenseDate = null;
      this.state.expenseCategory = null;
      this.state.expenseCurrency = null;
    }
  }

  handleOnCancel_newExpenseForm() {
    this.toggleModalVisible();
    this.setState({ formNameIsValid: true });
    this.setState({ formAmntIsValid: true });
    this.setState({ formDateIsValid: true });
    this.setState({ expenseCategoryIsValid: true});
    this.setState({ expenseCurrencyIsValid: true});
    this.state.expenseName = null;
    this.state.expenseAmnt = null;
    this.state.expenseDate = null;
    this.state.expenseCategory = null;
    this.state.expenseCurrency = null;
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
    
    let dataForm = [];
    for (var n in Category) {
      if ( typeof Category[n] === 'string') dataForm.push({value: n});
    }
    //Do not allow users to create a new expense of caregoty "all"
    dataForm.shift();

    let currenciesList = [];
    for (var n in Currencies) {
      //console.log(Currencies[n].code);
      if (Currencies[n].code != "ALL") {
        currenciesList.push({value: n});
      }
    }

    var textLoop = [];
    c.getExpensesForTrip(params.id, this.state.expenseCategorySelected).forEach(element => {
      //console.log(element.id);
      textLoop.push(
        // Zijn de CARDS waarop gedrukt kan worden om venster te openen
        // N: iterations need a unique key
        <TouchableHighlight key={element.id} style={{ borderRadius: 5, margin: 5, }} onPress={() => this.goToExpense(params.id, element.id)} onLongPress={() => this.removeItem(element.id)}>
          <View style={styles.cardLayout}>
            <Text style={styles.titleText}>Name: {element.description}</Text>
            <Text>Description: {element.amount}</Text>
          </View>
        </TouchableHighlight>
      )
    });

    var formName = [];
    var formAmnt = [];
    var formDate = [];
    var categoryFormDropDown = [];
    var currencyFormDropDown = [];

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

    if (this.state.expenseCategoryIsValid) {
      categoryFormDropDown.push(
        <Dropdown
                    key="categorydormdropdown"
                    label={this.state.categoryFormTitle}
                    data={dataForm}
                    onChangeText={(expenseCategory) => this.setState({expenseCategory: expenseCategory})}
                    //fontSize={16}
                    containerStyle={{ paddingLeft: 15}}
                    baseColor='black'
                    dropdownPosition={1}
                  />
      );
    } else {
      categoryFormDropDown.push(
        <Dropdown
                    key="categorydormdropdown"
                    label={this.state.categoryFormTitle}
                    data={dataForm}
                    onChangeText={(expenseCategory) => this.setState({expenseCategory: expenseCategory})}
                    //fontSize={16}
                    containerStyle={{ paddingLeft: 15}}
                    baseColor='red'
                    dropdownPosition={1}
                  />
      );
    }

    if (this.state.expenseCurrencyIsValid) {
      currencyFormDropDown.push(
        <Dropdown
                      key="currencydormdropdown"
                      label={this.state.currencyFormTitle}
                      data={currenciesList}
                      onChangeText={(expenseCurrency) => this.setState({expenseCurrency: expenseCurrency})}
                      //fontSize={16}
                      containerStyle={{ paddingRight: 15 }}
                      baseColor='black'
                      dropdownPosition={1}
                    />
      );
    } else {
      currencyFormDropDown.push(
        <Dropdown
                      key="currencydormdropdown"
                      label={this.state.currencyFormTitle}
                      data={currenciesList}
                      onChangeText={(expenseCurrency) => this.setState({expenseCurrency: expenseCurrency})}
                      //fontSize={16}
                      containerStyle={{ paddingRight: 15 }}
                      baseColor='red'
                      dropdownPosition={1}
                    />
      );
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

              {formName}
              <TextInput
                style={styles.FormInput}
                placeholder="Type the expense name here!"
                onChangeText={(expenseName) => this.setState({ expenseName })}
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  {categoryFormDropDown}
                </View>
                <View style={{ width: 200, marginLeft: 8 }}>
                  {formDate}
                  <TextInput
                    style={[styles.FormInput, { marginTop: -2 }]}
                    placeholder="Expense Date"
                    onChangeText={(expenseDate) => this.setState({ expenseDate })}
                    keyboardType='numeric'
                  />
                </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    {formAmnt}
                    <TextInput
                      style={[styles.FormInput, { marginTop: -2 }]}
                      placeholder="Expense Amount"
                      onChangeText={(expenseAmnt) => this.setState({ expenseAmnt })}
                      keyboardType='numeric'
                    />
                  </View>
                  <View style={{ width: 200, marginLeft: 8 }}>
                    {currencyFormDropDown}
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

          {/** Popup component */}
          <Popup ref={popup => this.popup = popup} />
          {/** or <Popup ref={popup => this.popup = popup } isOverlay={false} isOverlayClickClose={false}/> */}

        </View>
        </View>
        );
  }
}