import React, {PureComponent} from 'react';
import {getClubInfoForId, getClubTypes} from '../../services/home';
import {message, Spin, BackTop} from 'antd';
import Articles from '../../components/Articles/index'
import './Detail.css'
import clubBg from '../../assets/club-bg.png'
export default class Club extends PureComponent {
    state = {
        isLoading: true,
        clubInfo: {},
        clubTypes: [],
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        const href = window.location.href
        const assId = href.slice(href.lastIndexOf('/') + 1)
        if (assId != '' && assId != 'club') {
            getClubTypes({})
                .then(res => {
                    this.setState({
                        clubTypes: res.data
                    })
                }).catch(res => {
                message.error('获取数据失败')
            })
            getClubInfoForId({
                id: assId
            }).then(res => {
                this.setState({
                    isLoading: false,
                    clubInfo: res.data
                })
            }).catch(res => {
                message.error('获取数据失败')
            })
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        const {isLoading, clubInfo, clubTypes} = this.state
        const articleTypesObj = {}
        clubTypes.forEach(item => {
            articleTypesObj[item.pmname] = item.pmvalue
        })
        return (
            <div>
                {clubInfo.id ? (<div>
                    <div className="club-content" style={{backgroundImage: 'url(' + clubBg + ')'}}>
                        <div className="club-info">
                            <span className="ci-name"> {clubInfo.name}</span>
                            <p>{articleTypesObj[clubInfo.category]}</p>
                            <p>
                                <span>简介：</span>
                                {clubInfo.profile ? clubInfo.profile : '暂无'}
                            </p>
                            <p>
                                <span>宗旨：</span>
                                {clubInfo.purpose ? clubInfo.purpose : '暂无'}
                            </p>
                            <p>
                                <span>活动领域：</span>
                                {clubInfo.actField ? clubInfo.actField : '暂无'}
                            </p>
                        </div>
                    </div>
                    {clubInfo.id ? (<Articles assId={clubInfo.id}/>) : ''}
                    <BackTop/>
                </div>) : (<Spin/>)}
            </div>
        )
    }
}