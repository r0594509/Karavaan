import React from 'react';
import { View } from 'react-native';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';
import { CardList } from '../components/CardList';
import { Button } from '../components/Button';
import { TripForm } from '../forms/TripForm';
export class TripsTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisible: false,
        };
        this.goToTrip = this.goToTrip.bind(this);
        this.toggleNewTripForm = this.toggleNewTripForm.bind(this);
    }
    goToTrip(id) {
        this.props.navigation.navigate('TripScreen', { id: id });
    }
    toggleNewTripForm() {
        this.setState({ formVisible: !this.state.formVisible });
    }
    render() {
        const { formVisible } = this.state;
        return (React.createElement(View, { style: styles.mainViewLayout },
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(CardList, { itemList: c.getTrips(), onPress: this.goToTrip }),
                React.createElement(Button, { title: 'Add Trip', onPress: this.toggleNewTripForm }),
                React.createElement(TripForm, { visible: formVisible, toggleVisible: this.toggleNewTripForm }))));
    }
}
TripsTest.navigationOptions = {
    tabBarLabel: 'My Trips',
};
//# sourceMappingURL=TripsTest.js.map