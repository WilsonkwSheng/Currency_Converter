import { NavigationActions } from 'react-navigation';
import Navigator from '../config/routes';

const initialState = Navigator.router.getStateForAction(NavigationActions.init())

export default (state, action) => {
    const nextState = Navigator.router.getStateForAction(action, state);
    return nextState || state;
};