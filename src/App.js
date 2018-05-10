import React, {Component} from 'react'
import  BaseLayout  from './layouts/index'
import Home from './routes/Home/index'
import DataDownload from './routes/DataDownload/index'
import ArticleDetail from './routes/Article/Detail.js'
import Articles from './routes/Article/Articles'
import Clubs from './routes/Club/Club'
import ClubDetail from './routes/Club/Detail'
import {Route, HashRouter, Switch} from 'react-router-dom'
import './assets/base.css'
class App extends Component {
    render() {
        return (
            <HashRouter>
                <BaseLayout>
                    <Switch>
                        <Route exact component={Home} path="/"/>
                        <Route exact path='/'/>
                        <Route component={DataDownload} path='/dataDownload'/>
                        <Route component={ArticleDetail} path='/article/details/:id'/>
                        <Route component={Articles} path='/articles'/>
                        <Route component={Clubs} path='/clubs'/>
                        <Route component={ClubDetail} path='/club/info/:id'/>
                    </Switch>
                </BaseLayout>
            </HashRouter>
        );
    }
}

export default App;
