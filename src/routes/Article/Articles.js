import React, {Component} from 'react';
import {message, Spin, Pagination, Button, Tag} from 'antd';
import {getArticleTypes, getArticlesForType, getArticlesForAssId} from '../../services/home';
import {Link} from 'react-router-dom';
import moment from 'moment'
import './Articles.css'
import bg from '../../assets/new-article.png'
import titleBg from '../../assets/new-article-title-bg.png'
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
            <div className="articles fixclear">
                {/*  <div className="left">
                 <img src={bg} alt=""/>
                 </div>*/}

                <div className="artile-types">
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
                <div className="right">
                    {
                        isLoading ? <Spin/> : (
                            <ul className="articles-list">
                                {
                                    list.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="new-art-item">
                                                    <Link
                                                        className="new-art-title"
                                                        target='_blank'
                                                        to={{
                                                            data: {
                                                                id: item.id
                                                            },
                                                            pathname: '/article/details/' + item.id,
                                                        }
                                                        }> {item.title}
                                                    </Link>
                                                    <Tag color="blue">{articleTypeObj[item.type]}</Tag>
                                                    <span className="new-art-time">
                                                        {item.lastupdTime ?
                                                            moment(item.lastupdTime).format('YYYY-MM-DD HH:mm')
                                                            : moment(item.insertTime).format('YYYY-MM-DD HH:mm')
                                                        }
                                               </span>
                                                </div>
                                                <div className="new-art-content">
                                                    内容预览：{ item.content
                                                    .replace(/<[^>]+>/g, "")
                                                    .replace(/&[a-zA-Z]{1,10};/, '')
                                                    .slice(0, 100)
                                                }...
                                                </div>
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
                        <Button type="dashed">共{pagination.total}条</Button>
                        <Button
                            size={"large"}
                            onClick={this.handelChangePageNo.bind(this, 1)}
                            disabled={pagination.pageSize * pagination.currentPage >= pagination.total}
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