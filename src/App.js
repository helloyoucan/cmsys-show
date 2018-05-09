import React, {Component} from 'react'
import  BaseLayout  from './layouts/index'
import Home from './routes/Home/index'
import DataDownload from './routes/DataDownload/index'
import Article from './routes/Article/index'
import Club from './routes/Club/index'
import {Route, HashRouter, Switch} from 'react-router-dom'
class App extends Component {
    render() {
        return (
            <HashRouter>
                <BaseLayout>
                    <Switch>
                        <Route exact component={Home} path="/"/>
                        <Route exact path='/'/>
                        <Route component={DataDownload} path='/dataDownload'/>
                        <Route component={Article} path='/article/:id'/>
                        <Route component={Club} path='/club'/>
                    </Switch>
                </BaseLayout>
            </HashRouter>
        );
    }
}

export default App;
