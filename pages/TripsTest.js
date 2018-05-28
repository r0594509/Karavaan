import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import styles from '../styles/styles';
import c from '../domain/controller/Controller';

import { CardList } from '../components/CardList';
import { Button } from '../components/Button';
import { TripForm } from '../forms/TripForm';

export class TripsTest extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'My Trips',
    };

    constructor(props) {
        super(props);

        this.goToTrip = this.goToTrip.bind(this);
        this.toggleNewTripForm = this.toggleNewTripForm.bind(this);
    }

    state = {
        formVisible: false,
    }

    goToTrip(id) {
        this.props.navigation.navigate('TripScreen', { id: id });
    }

    toggleNewTripForm() {
        this.setState({formVisible: !this.state.formVisible});
    }

    render() {
        const { formVisible } = this.state;

        return (
            <View style={styles.mainViewLayout}>
                <View style={{ flex: 1 }}>

                    {/*List of Trips*/}
                    <CardList 
                        itemList={c.getTrips()}
                        onPress={this.goToTrip}
                    />

                    <Button 
                        title={'Add Trip'}
                        onPress={this.toggleNewTripForm}
                    />

                    <TripForm 
                        visible={formVisible}
                        toggleVisible={this.toggleNewTripForm}
                    />

                </View>
            </View>
        );
    }
}

