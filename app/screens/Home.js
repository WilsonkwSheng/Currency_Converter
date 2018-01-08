import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';

import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        lastConvertedDate: PropTypes.object,
    };

    handlePressBaseCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency' });
    };

    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency' });
    };

    handleTextChange = (text) => {
        this.props.dispatch(changeCurrencyAmount(text));
    };

    handleSwapCurrency = () => {
        this.props.dispatch(swapCurrency());
    };

    handleOptionPress = () => {
        this.props.navigation.navigate('Options');
    };

    render() {
        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        if (this.props.isFetching) {
            quotePrice = '...';
        }

        return (
            <Container>
                <StatusBar translucent={false} barStyle="light-content" />
                <Header 
                    onPress={this.handleOptionPress}
                />
                <KeyboardAvoidingView behavior="padding">
                <Logo />
                <InputWithButton 
                    buttonText={this.props.baseCurrency}
                    onPress={this.handlePressBaseCurrency}
                    defaultValue={this.props.amount.toString()}
                    keyboardType="numeric"
                    onChangeText={this.handleTextChange}
                />
                <InputWithButton 
                    onPress={this.handlePressQuoteCurrency}
                    buttonText={this.props.quoteCurrency} 
                    editable={false} 
                    value={quotePrice}
                />
                <LastConverted
                    base={this.props.baseCurrency}
                    quote={this.props.quoteCurrency}
                    date={this.props.lastConvertedDate}
                    conversionRate={this.props.conversionRate}
                />
                <ClearButton 
                    text="Reverse Currencies"
                    onPress={this.handleSwapCurrency}
                />
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = (state) => { // state is get the latest updated state from redux store
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};

    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    };
};

export default connect(mapStateToProps)(Home);