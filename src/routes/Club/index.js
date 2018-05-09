import React, {PureComponent} from 'react';
import {getClubInfoForId, getClubTypes} from '../../services/home';
import {message, Spin, BackTop} from 'antd';
import Articles from '../../components/Articles/index'
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
                    <span> {clubInfo.name}</span>
                    <p>{articleTypesObj[clubInfo.category]}</p>
                    <p>
                        <span>简介：</span>
                        {clubInfo.profile}
                    </p>
                    <p>
                        <span>宗旨：</span>
                        {clubInfo.purpose}
                    </p>
                    <p>
                        <span>活动领域：</span>
                        {clubInfo.actField}
                    </p>
                    {clubInfo.id ? (<Articles assId={clubInfo.id}/>) : ''}
                    <BackTop/>
                </div>) : (<Spin/>)}
            </div>
        )
    }
}