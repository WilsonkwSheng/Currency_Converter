import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput'

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.74';

class Home extends Component {
    handlePressBaseCurrency = () => {
        console.log('press base');
    }

    handleQuoteBaseCurrency = () => {
        console.log('press quote');
    }

    handleTextChange = (text) => {
        console.log('change text', text);
    }

    render() {
        return (
            <Container>
                <StatusBar translucent={false} barStyle="light-content" />
                <Logo />
                <InputWithButton 
                    buttonText={TEMP_BASE_CURRENCY}
                    onPress={this.handlePressBaseCurrency}
                    defaultValue={TEMP_BASE_PRICE}
                    keyboardType="numeric"
                    onChangeText={this.handleTextChange}
                />
                <InputWithButton 
                    onPress={this.handleQuoteBaseCurrency}
                    buttonText={TEMP_QUOTE_CURRENCY} 
                    editable={false} 
                    defaultValue={TEMP_QUOTE_PRICE}
                />
            </Container>
        );
    }
}

export default Home;