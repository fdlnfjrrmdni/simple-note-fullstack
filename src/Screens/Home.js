import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, 
        StatusBar, ScrollView, 
        FlatList, Modal, Alert } from 'react-native';
import { View, Text, Container } from 'native-base';
import { fetch, deleteNote, moreNotes } from '../Publics/redux/actions/notes';
import { connect } from 'react-redux';

import Fabs from '../Components/Fabs';
import Search from '../Components/Search';
import DummyNotes from '../Assets/DummyData/Notes';
import Cards from '../Components/Cards';
import Headers from '../Components/Headers';

class Home extends Component {
    toNote = () => {
        const { navigation } = this.props;
        navigation.navigate('Note');
    }

    toAddNote = () => {
        const { navigation } = this.props;
        navigation.navigate('AddNote');
    }

    toggleDrawer = () => {
        const { navigation } = this.props;
        navigation.toggleDrawer();
    }

    setModal(visible) { 
        this.setState({ modalVisible: visible }); 
    }

    fetchData = (search, sort) => {
        this.props.dispatch(fetch(search, sort));
    }

    componentDidMount = () => {
        this.fetchData();

        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.setState({loading: true})
                this.fetchData()
            })
        ]
    }

    componentWillUnmount = () => {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    _onPress = (id, title, note, category, category_id) => {
        const {navigation} = this.props
        navigation.navigate('Note', {
            id: id,
            title: title,
            note: note,
            category: category,
            category_id: category_id
        })
    }

    _onLongPress = (id) => {
        Alert.alert(
            'Delete', 'Are you sure you want to delete this note?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.dispatch(deleteNote(id))
                        this.fetchData()
                    }
                },
            ],
            {cancelable: true}
        )
    }

    _keyExtractor = (item, index) => item.id.toString();

    // moreData = () => {
    //     console.log("page : " + this.props.notes.page);
    //     console.log("total page : " + this.props.notes.totalPage);
	// 	// if (this.props.notes.page !== this.props.notes.totalPage) {
    //     //     this.props.notes.page++
    //     //     this.props.dispatch(moreNotes(this.props.notes.page))
    //         // console.log("data+"+this.props.notes.page);
    //     // }
	// }

    render() {
        return (
            <Container>

                <StatusBar hidden />

                {/* ============== Header ============== */}
                <Headers
                    thumbnail
                    leftPress={this.toggleDrawer}
                    title='NOTE APP'
                    rightPress={() => {this.setModal(true)}}
                    iconRight='funnel'
                    iconRightColor='#000'
                />

                {/* ============== Sort Dropdown ============== */}
                <Modal transparent 
                animationType="none" 
                visible={this.state.modalVisible} 
                onRequestClose={() => { }}>
                    <TouchableOpacity style={{height: '100%'}}
                    onPress={() => { this.setModal(!this.state.modalVisible); }} >    
                        <View style={{ paddingRight: 15, paddingLeft: 200, paddingTop: 50 }}>
                            <View style={styles.modal}>
                                <TouchableOpacity onPress={() => { 
                                    this.fetchData(undefined,'asc');
                                    this.setModal(!this.state.modalVisible);
                                    }} >
                                    <Text style={{padding: 10}}>ASCENDING</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { 
                                    this.fetchData(undefined,'desc');
                                    this.setModal(!this.state.modalVisible);
                                    }} >
                                    <Text style={{padding: 10}}>DESCENDING</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* ============== Search ============== */}
                <Search />

                {/* ============== Content ============== */}
                <ScrollView>
                    <View style={styles.content}>
                        <FlatList
                            numColumns={2}
                            data={this.props.notes.data}
                            keyExtractor={this._keyExtractor}
                            // onEndReachedThreshold={0.5}
                            // onEndReached={this.moreData()}
                            renderItem={
                                ({ item, index }) => (
                                    <Cards
                                        press={() => this._onPress(item.id, item.title, item.note, item.category, item.category_id)}
                                        longPress={() => this._onLongPress(item.id)}
                                        date={item.time}
                                        title={item.title}
                                        category={item.category}
                                        content={item.note}
                                        navigation={this.props.navigation} 
                                        data={item}
                                    />
                                )
                            }
                            refreshing={this.props.notes.isLoading}
                            onRefresh={this.fetchData}
                        />
                    </View>
                </ScrollView>

                {/* ============== Fab Add Note ============== */}
                <Fabs press={this.toAddNote}/>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        elevation: 7,
        backgroundColor: '#fff',
        padding: 15,
    },
        content: {
        marginLeft: 27,
        justifyContent: 'space-between',
        paddingTop: 120
    }
});

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(Home)