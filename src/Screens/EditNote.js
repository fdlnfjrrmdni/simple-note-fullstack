import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, View, Item, Picker, Form, Input, Textarea, Text } from 'native-base';
import { editNote } from '../Publics/redux/actions/notes';
import { getCategories } from '../Publics/redux/actions/categories';
import { connect } from 'react-redux';

import Headers from '../Components/Headers';

class EditNote extends Component{
    goBack = () => {
        const { navigation } = this.props;
        navigation.navigate('Home');
    }

    constructor(props) {
        super(props);
        this.Categories = this.props.categories.data;
        this.state = {
            category_id: '',
            category: '',
            note: '',
            title: '',
            id: ''
        };
    }

    componentDidMount = () => {
        this.getData();

        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.setState({ loading: true })
                this.getData()
            })
        ]
    }

    componentWillUnmount = () => {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    getData = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'null')
        const title = navigation.getParam('title', 'null')
        const note = navigation.getParam('note', 'null')
        const category = navigation.getParam('category', 'null')
        const category_id = navigation.getParam('category_id', 'null')

        this.setState({
            id: id,
            title: title,
            note: note,
            category: category,
            category_id: category_id
        })

        this.Categories.map((category) => {
            if (category.name == category) this.setState({ category_id: category.id })
        })

        this.props.dispatch(getCategories())
    }

    updateCategory = (input) => {
        this.setState({ category: input })
        {
            this.Categories.map((category) => {
                if (category.name == input) this.setState({ category_id: category.id })
            })
        }
    }

    updateNote = () => {
        const { id, title, note, category, category_id } = this.state;
        if (title !== '' && category !== '') {
            this.props.dispatch(editNote(id,{ title, note, category_id }))
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        console.log('category_id : '+this.state.category_id);
        console.log('category : '+this.state.category);
        return (
            <Container>
                <Headers
                    title='EDIT NOTE'
                    iconLeft='arrow-back'
                    iconRight='checkmark-circle-outline'
                    iconRightColor='#3DB39E'
                    leftPress={this.goBack}
                    rightPress={this.updateNote}
                />
                <Content>
                    
                    <Form>
                        <View style={styles.input}>
                            <Input
                                placeholder='ADD TITLE ...'
                                placeholderTextColor='#c4c4c4'
                                style={styles.inputTitle}
                                onChangeText={(text) => this.setState({ title: text })}
                                value={this.state.title} />
                            <Textarea
                                rowSpan={9}
                                placeholder='ADD DESCRIPTION ...'
                                placeholderTextColor='#c4c4c4'
                                style={styles.inputDescription}
                                onChangeText={(text) => this.setState({ note: text })}
                                value={this.state.note} />
                        </View>

                        <View style={styles.categoryBar}>
                            <Text style={styles.categoryText}>CATEGORY</Text>
                            <Item picker style={styles.picker}>
                                <Picker selectedValue={this.state.category} onValueChange={this.updateCategory}>
                                    <Item label='ADD CATEGORY' />
                                    {this.Categories.map((category, key) =>
                                        <Item key={category.id} label={category.name} value={category.name} />)
                                    }
                                </Picker>
                            </Item>

                        </View>
                    </Form>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 20, marginTop: 40
    },
    inputTitle: {
        fontSize: 24,
        fontWeight: '400',
        marginLeft: 5
    },
    inputDescription: {
        fontSize: 24,
        fontWeight: '400'
    },
    categoryBar: {
        padding: 30,
        width: 250
    },
    categoryText: {
        fontWeight: '600',
        marginBottom: 10
    },
    picker: {
        backgroundColor: '#fff',
        paddingLeft: 15,
        borderBottomColor: 'transparent',
        elevation: 5,
    },
});

const mapStateToProps = (state) => {
    return {
        notes: state.notes,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(EditNote)