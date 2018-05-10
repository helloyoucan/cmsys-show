import React, {Component} from 'react';
import {message, Spin} from 'antd';
import bg from '../../assets/home-bg-1.png';
import depmTitleBg from '../../assets/depm-title-bg.png';
import depmNameTitleBg from '../../assets/depm-name-title-bg.png';
import './ClubUnion.css'

import {getClubUnionInfo, getClubUnionDepartments} from '../../services/home';
export default class ClubUnion extends Component {
    state = {
        isLoading: true,
        clubUnionInfo: {},
        departments: []
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        getClubUnionInfo({})
            .then(res => {
                this.setState({
                    isLoading: false,
                    clubUnionInfo: res.data[0]
                })
            }).catch(res => {
            message.error('获取数据失败')
        })
        this.getData()
    }

    getData() {
        getClubUnionDepartments({})
            .then(res => {
                console.log(res)
                this.setState({
                    isLoading: false,
                    departments: res.data
                })
            }).catch(res => {
            message.error('获取数据失败')
        })
    }

    render() {
        const {clubUnionInfo, departments} = this.state
        return (
            <div>
                <div style={{backgroundImage: 'url(' + bg + ')'}} className="clubUnion fixclear">
                    <div className="cu-content">
                        <div className="title">
                            社团联合会
                        </div>
                        <div className="introduce">
                            {clubUnionInfo.remarks}：
                            {clubUnionInfo.pmvalue}
                        </div>
                    </div>
                </div>
                <div className="departments">
                    <div className="title"
                         style={{backgroundImage: 'url(' + depmTitleBg + ')'}}>社联部门
                    </div>
                    <ul className="depms-list fixclear">
                        {
                            departments.map((item, index) => {
                                return (<li key={index}>
                                    <div className="depm-name" style={{backgroundImage: 'url(' + depmNameTitleBg + ')'}}>
                                        {item.name}
                                    </div>

                                    <p className="depm-describe">{item.info}</p>
                                </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}