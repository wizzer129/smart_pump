import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Routes from './components/routing/Routes';

import './App.css';

const App = () => {
    useEffect(() => {
        setAuthToken(localStorage.token);
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

export default App;
