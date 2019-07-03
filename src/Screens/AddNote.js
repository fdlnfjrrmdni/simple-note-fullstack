import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import Headers from '../Components/Headers';
import FormNote from '../Components/FormNote';

class AddNote extends Component {
    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {
        return (
            <Container>
                <Headers 
                title='ADD NOTE'
                iconLeft='arrow-back'
                iconRight='checkmark-circle-outline'
                iconRightColor='#3DB39E'
                leftPress={this.goBack}
                rightPress={this.goBack}
                />
                <Content>
                    <FormNote />
                </Content>
            </Container>
        );
    }
}

export default AddNote;