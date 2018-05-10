import React, {Component} from 'react'
import ClubUnion from './ClubUnion'
import Club from '../Club/Club'
import {BackTop} from 'antd'
import Articles from '../../components/Articles/index'
import './index.css'
import bg from '../../assets/home-bg-2.jpg'
import NewArticle from './NewArticle'
export default class Home extends Component {
    componentDidMount() {

    }

    render() {
        return (<div>
            <div className="home-bg">
                <img src={bg}/>
            </div>
            <ClubUnion/>
            {/*<Club/>*/}
            {/*<Articles/>*/}
            <NewArticle/>
            <BackTop/>

        </div>)
    }
}