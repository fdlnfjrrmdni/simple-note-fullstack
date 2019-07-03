import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class Search extends Component {
    render() {
        return(
            <View style={styles.searchBar}>
                <TextInput style={{ marginLeft: 10, marginRight: 25 }} placeholder="Search..." />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        zIndex: 1,
        backgroundColor: '#fff',
        paddingLeft: 15,
        borderBottomColor: 'transparent',
        elevation: 10,
        marginTop: 85,
        alignSelf: 'center',
        height: 45,
        width: 307,
        position: 'absolute',
        borderRadius: 20
    }
});

export default Search;