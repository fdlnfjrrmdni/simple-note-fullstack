import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Header, Title, Icon, Thumbnail } from 'native-base';

class Headers extends Component {
    state = {
        marginLeft: 15,
        left: (
            <Icon name={this.props.iconLeft} />  
        )
    }

    componentDidMount() {
        if (this.props.thumbnail) {
            this.setState({
                marginLeft: 10,
                left: (
                    <Thumbnail small source={{ uri: 'https://cdn.moneysmart.id/wp-content/uploads/2019/03/08124226/Untitled-design-2.jpeg' }} />
                )
            })
        }
    }
    
    render() {
        return (
            <Header style={styles.header} androidStatusBarColor='#fff' iosBarStyle='dark-content'>
                <View>
                    <TouchableOpacity style={{marginLeft: this.state.marginLeft}} onPress={this.props.leftPress}>
                        {this.state.left}
                    </TouchableOpacity>
                </View>
                <View>
                    <Title style={styles.title}>{this.props.title}</Title>
                </View>
                <View>
                    <TouchableOpacity transparent style={{marginRight: 15}} onPress={this.props.rightPress}>
                        <Icon name={this.props.iconRight} style={{color: this.props.iconRightColor}} />  
                    </TouchableOpacity>
                </View>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        elevation: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        alignSelf: 'center'
    }
});

export default Headers;