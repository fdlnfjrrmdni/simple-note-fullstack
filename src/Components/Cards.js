import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class Cards extends Component {
    render() {
        return(
            <View style={{ marginRight: 30 }}>
                <TouchableOpacity style={styles.card} onPress={this.props.press}>
                    <Text style={styles.cardDate}>{this.props.date}</Text>
                    <Text numberOfLines={1} style={styles.cardTitle}>{this.props.title}</Text>
                    <Text numberOfLines={1} style={styles.cardCategory}>{this.props.category}</Text>
                    <Text numberOfLines={4} style={styles.cardContent}>{this.props.content}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    card: {
        width: 138,
        height: 138,
        borderRadius: 7,
        backgroundColor: '#FF92A9',
        elevation: 5,
        padding: 12,
        marginBottom: 27
    },
    cardDate: {
        color: '#fff',
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '800'
    },
    cardCategory: {
        color: '#fff',
        fontSize: 13
    },
    cardTitle: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 18
    },
    cardContent: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500'
    }
});

export default Cards;