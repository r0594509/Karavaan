
import { StyleSheet } from 'react-native';
  //Alle Styles voor CARDS, Buttons, Text ...
  //Lijkt op CSS
  constru = styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',

    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cardLayout: {
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: 'black',
      flexDirection: "column",
      height: 100,
      padding: 20,
      margin: 5,
      backgroundColor: "white",

    },
    mainViewLayout: {
      flex: 1,
      backgroundColor: "lightgrey"

    },

    ButtonLayoutMain: {
      borderRadius: 5,
      margin: 10,
      padding: 6,
      backgroundColor: "#1B94F1",
    },

    ButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "white",
    },

    FormText: {
      fontSize: 15,
      fontWeight: "bold",
      color: "black",
      margin: 10,
    },

    FormTextInvalid: {
      fontSize: 15,
      fontWeight: "bold",
      color: "red",
      margin: 10,
    },

    FormInput: {
      fontSize: 15,
      marginLeft: 10,
      marginRight: 10,
      height: 40,
    },

    FormCheckBoxInput: {
      flex: 1, 
      padding: 10,
      borderWidth: 0.5, 
    },

    FormViewExpensePerson: {
      flexDirection: 'row', 
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20, 
      backgroundColor: 'white', 
      borderColor: 'black',
      borderRadius: 5,
      borderWidth: 0.5, 
    },

    FormViewExpensePersonInvalid: {
      flexDirection: 'row', 
      marginTop: 8,
      marginLeft: 20,
      marginRight: 20, 
      backgroundColor: 'white', 
      borderColor: 'red',
      borderRadius: 5,
      borderWidth: 1.5, 
    },

    ModalFriends:{
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: 5,
      borderWidth: 0.5,
      padding: 20,
      margin : 25,
      flex: 1,
    },

    amountsWrapper:{
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },

  amountSquare: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    flexDirection: "column",
    height: 60,
    width: 60,
    padding: 5,
    margin: 15,
    backgroundColor: "white",
    alignItems: 'center',
  },

  cardLayoutMini: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    flexDirection: "column",
    height: 60,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    alignItems: 'center',
  },

  amountSquareText: {
    fontSize: 15,
    fontWeight: "bold",
  }

  });

  export default styles;