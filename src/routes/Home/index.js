import React, {Component} from 'react';
import ClubUnion from './ClubUnion'
import Club from './Club'
import {BackTop} from 'antd'
import Articles from '../../components/Articles/index'
export default class Home extends Component {
    componentDidMount() {

    }

    render() {
        return (<div>
            <ClubUnion/>
            <Club/>
            <Articles/>
            <BackTop/>
        </div>)
    }
}