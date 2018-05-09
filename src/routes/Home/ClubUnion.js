import React, {Component} from 'react';
import {message, Spin} from 'antd';
import logo from '../../assets/logo.png';
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
                <div>
                    <img src={logo} alt="" className="logo"/>
                    <p> {clubUnionInfo.remarks}</p>
                    <p> {clubUnionInfo.pmvalue}</p>
                </div>
                <div>
                    <p>社联部门</p>
                    <ul>
                        {
                            departments.map((item, index) => {
                                return (<li key={index}>
                                    <p>{item.name}</p>
                                    <p>{item.info}</p>
                                </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}