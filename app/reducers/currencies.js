import { CHANGE_CURRENCY_AMOUNT, SWAP_CURRENCY } from '../actions/currencies'; // swapCurrency, changeCurrencyAmount debugging purpose

const initialState = {
    baseCurrency: 'USD',
    quoteCurrency: 'GBP',
    amount: 100,
    conversions: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CURRENCY_AMOUNT:
            return {
                ...state,
                amount: action.amount || 0,
            };
        case SWAP_CURRENCY:
            return {
                ...state,
                baseCurrency: state.quoteCurrency,
                quoteCurrency: state.baseCurrency,
            };
        default: 
            return state;
    }
};

// console.log('initialState', initialState);
// console.log('swapCurrency', reducer(initialState, swapCurrency()));
// console.log('changeCurrencyAmount', reducer(initialState, changeCurrencyAmount('222')));

export default reducer;