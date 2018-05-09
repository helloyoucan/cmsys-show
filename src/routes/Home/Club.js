import React, {Component} from 'react'
import {message, Spin, Tag, Button} from 'antd'
import {getClubTypes, getClubUnionInfos} from '../../services/home'
import {Link} from 'react-router-dom';
export default class Club extends Component {
    state = {
        isLoading: true,
        tagPmname: '',
        clubTypes: [],
        type: '',
        clubs: {
            list: [],
            pagination: {
                total: 0,
                currentPage: 1,
                pageSize: 10
            }
        }
    }

    componentDidMount() {
        getClubTypes({})
            .then(res => {
                this.setState({
                    clubTypes: res.data
                })
            }).catch(res => {
            message.error('获取数据失败')
        })
        this.getData()
    }

    getData(params) {
        this.setState({
            isLoading: true
        })
        getClubUnionInfos({
            type: this.state.type,
            pageNo: 1,
            pageSize: 10,
            ...params
        })
            .then(res => {
                this.setState({
                    isLoading: false,
                    clubs: res.data
                })
            }).catch(res => {
            message.error('获取数据失败')
        })
    }

    handelChangePageNo(changeVal) {
        const pageNo = this.state.clubs.pagination.currentPage
        this.getData({
            pageNo: pageNo + changeVal
        })
    }

    handelCLickClubType(type) {
        this.setState({
            tagPmname: type,
            type
        }, () => {
            this.getData({})
        })

    }

    render() {
        const {tagPmname, clubTypes, clubs: {list, pagination}, isLoading} = this.state
        return (
            <div>
                <div>
                    <p>社团类型</p>
                    <div>
                        <Tag
                            onClick={this.handelCLickClubType.bind(this, '')}
                            color={tagPmname == '' ? '#108ee9' : ''}>
                            全部
                        </Tag>
                        {
                            clubTypes.map((item, index) => (
                                <Tag
                                    key={index}
                                    color={tagPmname == item.pmname ? '#108ee9' : ''}
                                    onClick={this.handelCLickClubType.bind(this, item.pmname)}>
                                    {item.pmvalue}
                                </Tag>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <p>社团</p>
                    <Button
                        onClick={this.handelChangePageNo.bind(this, -1)}
                        disabled={pagination.currentPage < 2}
                        type="primary"
                        icon="left"
                        shape="circle"
                        loading={isLoading}/>
                    <Button
                        onClick={this.handelChangePageNo.bind(this, 1)}
                        disabled={pagination.pageSize * pagination.currentPage > pagination.total}
                        type="primary"
                        icon="right"
                        shape="circle"
                        loading={isLoading}/>
                    {
                        isLoading ? <Spin/> : (
                            <ul>
                                {
                                    list.map((item, index) => {
                                        return (<li key={index}>
                                            <Link to={{
                                                data: {
                                                    id: item.id
                                                },
                                                pathname: '/club/' + item.id,
                                            }
                                            }> {item.name}</Link>
                                        </li>)
                                    })
                                }
                            </ul>
                        )
                    }

                </div>
            </div>
        )
    }
}