import React, {Component} from 'react'
import {message, Spin, Tag, Button} from 'antd'
import {getClubTypes, getClubUnionInfos} from '../../services/home'
import {Link} from 'react-router-dom';
import './Club.css'
import clubsBg from '../../assets/clubs-bg.jpg'
import clubNameBg from '../../assets/club-name-bg.png'
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
                <div className="club">
                    <div className="clubs-describe-content"
                         style={{backgroundImage: 'url(' + clubsBg + ')'}}>
                        <div className="clubs-describe">
                            社团是学校丰富校园文化的主力军，
                            现在广商有{pagination.total}个社团，
                            共分为{clubTypes.length}大类：
                            {
                                clubTypes.map((item, index) => (
                                    <span
                                        key={index}>{ item.pmvalue}{index + 1 != clubTypes.length ? '、' : ''}</span>
                                ))
                            }。
                        </div>
                    </div>
                    <div className="club-type">
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
                    {
                        isLoading ? (<div className="span-loading"><Spin/></div>) : (
                            <ul className="club-list fixclear">
                                {
                                    list.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="club-name"
                                                     style={{backgroundImage: 'url(' + clubNameBg + ')'}}>
                                                    <Link
                                                        target="_blank"
                                                        to={{
                                                            data: {
                                                                id: item.id
                                                            },
                                                            pathname: '/club/info/' + item.id,
                                                        }
                                                        }> {item.name}</Link>
                                                </div>
                                                <p className="club-profile">
                                                    {item.profile == '' ? '暂无' : item.profile}
                                                </p>
                                            </li>)
                                    })
                                }
                            </ul>
                        )
                    }
                    <div className="page-action">
                        <Button
                            size={"large"}
                            onClick={this.handelChangePageNo.bind(this, -1)}
                            disabled={pagination.currentPage < 2}
                            type="primary"
                            icon="left"
                            shape="circle"
                            loading={isLoading}/>
                        <Button type="dashed">共{pagination.total}个</Button>
                        <Button
                            size={"large"}
                            onClick={this.handelChangePageNo.bind(this, 1)}
                            disabled={pagination.pageSize * pagination.currentPage > pagination.total}
                            type="primary"
                            icon="right"
                            shape="circle"
                            loading={isLoading}/>
                    </div>
                </div>
            </div>
        )
    }
}