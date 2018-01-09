import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Seperator } from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
    };
    
    handlePress = (currency) => {
        const { type } = this.props.navigation.state.params;
        // pull the { type } from Home.js to CurrencyList.js
        if (type === 'base') {
          this.props.dispatch(changeBaseCurrency(currency));
          // currency is referring to item and to be passed/dispatch but not yet running reducer function
        } else if (type === 'quote') {
          this.props.dispatch(changeQuoteCurrency(currency));
        }
        this.props.navigation.goBack(null);
    };

    render() {
        let comparisonCurrency = this.props.baseCurrency;
        if (this.props.navigation.state.params.type === 'quote') {
            comparisonCurrency = this.props.quoteCurrency;
        }

        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={false} barStyle="default"/>
                <FlatList
                    data={currencies}
                    renderItem={({item}) => (
                        <ListItem 
                            text={item} 
                            selected={item === comparisonCurrency}
                            onPress={() => this.handlePress(item)}
                        />
                    )}
                    keyExtractor={item => item }
                    ItemSeparatorComponent={Seperator}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
    };
};

export default connect(mapStateToProps)(CurrencyList);