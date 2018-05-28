import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styles from '../styles/styles';

import { Card } from './Card'

export class CardList extends React.Component {

    constructor(props) {
        super(props);
        state = {

        }
    }

    createCardList(itemList) {
        var itemRender = [];
        const { onPress, onLongPress } = this.props;

        itemList.forEach(item => {
            itemRender.push(
                <Card
                    key={item.id}
                    item={item}
                    onPress={onPress}
                    onLongPress={onLongPress}
                />
            );
        });

        return itemRender;
    }

    render() {
        const { itemList } = this.props;

        return (
            <ScrollView contentContainer={{ paddingVertical: 20 }}>
                {this.createCardList(itemList)}
            </ScrollView>
        );
    }
}