import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Login from './components/login/Login'
import Main from './components/Main'
import Banner from './components/banner/BannerAssembler'
import Form from './containers/SearchForm'
import PageList from './containers/PageList'
import {SIGN_IN_SUCCESS} from './constants/Constant'
import {keys} from './reducers'
import storage from './utils/storage'

const clearOld = function (storeState) {
    keys.filter(k => k != 'header').map(k => storeState[k]={});
};

const validUser = store => {
    return (nextState,replace) => {
        const storeState = store.getState();
        const old = storage.local.data('state');
        if(old!=null){
            clearOld(storeState);
            return;
        }
        const {header} = storeState;
        const {user} = header||{};
        const {response} = user||{};
        const {state} = response||{};
        clearOld(storeState);
        if(state != SIGN_IN_SUCCESS){
            replace('/signIn');
        }
    }
};

export default function routes(store){
    return (
        <Route >
            <Route path='/signIn' component={Login}/>
            <Route path='/' onEnter={validUser(store)} component={App}>
                <Route path='/list/:list' component={Main}>
                    <IndexRoute components={{Form,PageList}}/>
                    <Route path='banner' components={{Form,PageList}}/>
                </Route>
            </Route>
        </Route>
    )
}
