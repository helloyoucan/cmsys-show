import React, {Component} from 'react';
import {message, Spin, Pagination, Button, Tag} from 'antd';
import {getArticleTypes, getArticlesForType, getArticlesForAssId} from '../../services/home';
import {Link} from 'react-router-dom';
import moment from 'moment'
export default class Articles extends Component {
    state = {
        isLoading: true,
        articleType: [],
        tagPmname: '',
        type: '',
        articles: {
            list: [],
            pagination: {
                total: 0,
                currentPage: 1,
                pageSize: 10
            }
        }
    }

    componentDidMount() {
        getArticleTypes({})
            .then(res => {
                this.setState({
                    articleType: res.data
                })
            }).catch(res => {
            message.error('获取数据失败')
        })
        this.getData()
    }

    getData(parmas) {
        this.setState({
            isLoading: true
        })
        const assId = this.props.assId
        if (assId) {
            getArticlesForAssId({
                assId,
                pageNo: 1,
                pageSize: 10,
                ...parmas
            })
                .then(res => {
                    this.setState({
                        isLoading: false,
                        articles: res.data
                    })
                }).catch(res => {
                message.error('获取数据失败')
            })
        } else {
            getArticlesForType({
                type: this.state.type,
                pageNo: 1,
                pageSize: 10,
                ...parmas
            })
                .then(res => {
                    this.setState({
                        isLoading: false,
                        articles: res.data
                    })
                }).catch(res => {
                message.error('获取数据失败')
            })
        }
    }

    handelClickArticleType(type) {
        this.setState({
            tagPmname: type,
            type
        }, () => {
            this.getData({})
        })
    }

    handelChangePageNo(changeVal) {
        const pageNo = this.state.articles.pagination.currentPage
        this.getData({
            pageNo: pageNo + changeVal
        })
    }

    render() {
        const {tagPmname, articleType, articles: {list, pagination}, isLoading} = this.state
        const assId = this.props.assId
        let articleTypeObj = {}
        articleType.forEach(item => {
            articleTypeObj[item.pmname] = item.pmvalue
        })
        return (
            <div>
                {
                    assId ? '' : (
                        <div>
                            <p>推文类型</p>
                            <Tag
                                onClick={this.handelClickArticleType.bind(this, '')}
                                color={tagPmname == '' ? '#108ee9' : ''}>
                                全部
                            </Tag>
                            {
                                articleType.map((item, index) => (
                                    <Tag
                                        key={index}
                                        color={tagPmname == item.pmname ? '#108ee9' : ''}
                                        onClick={this.handelClickArticleType.bind(this, item.pmname)}>
                                        {item.pmvalue}
                                    </Tag>
                                ))
                            }
                        </div>
                    )
                }
                <div>
                    <p>推文列表</p>
                    <Button
                        onClick={this.handelChangePageNo.bind(this, -1)}
                        disabled={pagination.currentPage < 2}
                        type="primary"
                        icon="left"
                        shape="circle"
                        loading={isLoading}/>
                    <Button
                        onClick={this.handelChangePageNo.bind(this, 1)}
                        disabled={pagination.pageSize * pagination.currentPage >= pagination.total}
                        type="primary"
                        icon="right"
                        shape="circle"
                        loading={isLoading}/>
                    {
                        isLoading ? <Spin/> : (
                            <ul>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <Link
                                                    target='_blank'
                                                    to={{
                                                        data: {
                                                            id: item.id
                                                        },
                                                        pathname: '/article/' + item.id,
                                                    }
                                                    }> {item.title}
                                                </Link>
                                                {item.lastupdTime ?
                                                    moment(item.lastupdTime).format('YYYY-MM-DD HH:mm')
                                                    : moment(item.insertTime).format('YYYY-MM-DD HH:mm')
                                                }
                                                <p>
                                                    {articleTypeObj[item.type]}
                                                </p>
                                                <div>
                                                    { item.content
                                                        .replace(/<[^>]+>/g, "")
                                                        .replace(/&[a-zA-Z]{1,10};/, '')
                                                        .slice(0, 200)
                                                    }
                                                </div>
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