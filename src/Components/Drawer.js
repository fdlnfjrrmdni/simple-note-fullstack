import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, TouchableOpacity, 
        ScrollView, Modal, FlatList, Alert } from 'react-native';
import { View, Text, Container, 
        Left, Body, Icon, 
        Thumbnail, ListItem, Item, 
        Form, Input } from 'native-base';
import { getCategories } from '../Publics/redux/actions/categories';
import { addCategory, deleteCategory } from '../Publics/redux/actions/categories';
import { connect } from 'react-redux';

class Drawer extends Component {
    toScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    toggleDrawer = () => {
        const { navigation } = this.props;
        navigation.toggleDrawer();
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icon: '',
            color: '',
            modalVisible: false
        };
    }

    setModal(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        this.props.dispatch(getCategories())
    }

    addCategory = () => {
        const { name, icon, color } = this.state;
        if (name !== '' && icon !== '') {
            this.props.dispatch(addCategory({ name, icon, color }));
            this.setModal(!this.state.modalVisible); 
            this.getData();
        }
    }

    _onLongPress = (id) => {
        Alert.alert(
            'Delete', 'Are you sure you want to delete this category?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.dispatch(deleteCategory(id))
                        this.getData()
                    }
                },
            ],
            { cancelable: true }
        )
    }

    renderItem = ({ item, index }) => (
        <ListItem icon onLongPress={() => this._onLongPress(item.id)}>
            <Left><Icon name={item.icon} /></Left>
            <Body style={styles.body}>
                <Text style={styles.textMenu}>
                    {item.name}
                </Text>
            </Body>
        </ListItem>
    )

    _keyExtractor = (item, index) => item.id.toString();

    render(){
        return (
            <Container>

                {/* ============ Drawer ============*/}
                <View style={styles.thumbnailBar}>
                    <Thumbnail style={styles.thumbnail} source={{ uri: 'https://cdn.moneysmart.id/wp-content/uploads/2019/03/08124226/Untitled-design-2.jpeg' }} />
                </View>
                <Text style={styles.name}>Steve Jobs</Text>

                <ScrollView>
                    <View>
                        <FlatList
                            data={this.props.categories.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.renderItem}
                        />
                        <ListItem icon style={{marginBottom: 40}}>
                            <Left><Icon name='add-circle'/></Left>
                            <Body style={styles.body}>
                                <Text style={styles.textMenu} onPress={() => { this.setModal(true) }}>
                                    Add Category
                                </Text>
                            </Body>
                        </ListItem>
                    </View>
                </ScrollView>

                {/* ============ Add Category ============ */}
                <Modal transparent 
                visible={this.state.modalVisible} 
                onRequestClose={() => { }}>
                    <TouchableOpacity onPress={() => { this.setModal(!this.state.modalVisible); }} 
                    style={styles.back}>
                        <View style={styles.modalBar}>
                            <View style={styles.modal}>
                                <Form>
                                    <Item last>
                                        <Input placeholderTextColor='#aaa' 
                                        placeholder='Category Name'
                                        onChangeText={(text) => this.setState({name:text})} />
                                    </Item>
                                    <Item last>
                                        <Input placeholderTextColor='#aaa' 
                                        placeholder='Icon Name' 
                                        onChangeText={(text) => this.setState({icon:text})}/>
                                    </Item>
                                    <View style={styles.buttonBar}>
                                        <TouchableOpacity style={{marginRight: 7}} 
                                        onPress={this.addCategory}>
                                            <Text style={styles.btnAdd}>
                                                Add
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.setModal(!this.state.modalVisible); }}>
                                            <Text style={styles.btnCancel}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </Form>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>

            </Container>
        )
    }
}

Drawer.protoType = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({    
    back: {
        height: '100%',
        backgroundColor: '#aaaaaa70'
    },

    // ============ Modal Add Category ============
    modalBar: {             
        padding: 60, 
        paddingTop: 220 
    },
    modal: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 7
    },
    buttonBar: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end' 
    },
    btnAdd: { 
        marginTop: 15, 
        fontWeight: '500', 
        fontSize: 20, 
        textAlign: 'right' 
    },
    btnCancel: { 
        marginTop: 15, 
        fontSize: 20, 
        textAlign: 'right', 
        color: '#aaa' 
    },

    // ============ Drawer ============
    thumbnailBar: { 
        alignItems: 'center', 
        marginTop: 45 
    },
    thumbnail: { 
        borderRadius: 100, 
        width: 100, 
        height: 100 
    },
    name: { 
        fontSize: 22, 
        fontWeight: '600', 
        color: '#000', 
        textAlign: 'center', 
        marginTop: 18,
        marginBottom: 70 
    },
    body: { borderBottomColor: 'transparent' },
    textMenu: { 
        fontSize: 20, 
        fontWeight: '600', 
        color: '#000' 
    },
});

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Drawer)