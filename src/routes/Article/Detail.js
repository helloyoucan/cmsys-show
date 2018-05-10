import React, {PureComponent} from 'react';
import {getArticleForId, getArticleTypes} from '../../services/home';
import {message, Spin, BackTop, Tag} from 'antd';
import moment from 'moment'
import articleBg from '../../assets/article-bg.png'
import './Detail.css'
export default class Article extends PureComponent {
    state = {
        isLoading: true,
        article: {},
        articleTypes: []
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        const href = window.location.href
        const id = href.slice(href.lastIndexOf('/') + 1)
        if (id != '' && id != 'article') {
            getArticleTypes({})
                .then(res => {
                    this.setState({
                        articleTypes: res.data
                    })
                }).catch(res => {
                message.error('获取数据失败')
            })
            getArticleForId({
                id: id
            }).then(res => {
                this.setState({
                    isLoading: false,
                    article: res.data
                })
            }).catch(res => {
                message.error('获取数据失败')
            })
        } else {
            this.props.history.push('/')
        }
    }

    render() {
        const {isLoading, article, articleTypes} = this.state
        const articleTypesObj = {}
        articleTypes.forEach(item => {
            articleTypesObj[item.pmname] = item.pmvalue
        })
        return (
            <div>
                {article.id ? (
                    <div className="art-detail">
                        <div className="artd-title" style={{backgroundImage: 'url(' + articleBg + ')'}}>
                            <h2>{article.title}</h2>
                            {/* <span>{article.assId}</span>*/}
                            <Tag
                                color={"#108ee9"}>
                                {articleTypesObj[article.type]}
                            </Tag>
                            <p>发布时间：{article.lastupdTime ?
                                moment(article.lastupdTime).format('YYYY-MM-DD HH:mm')
                                : moment(article.insertTime).format('YYYY-MM-DD HH:mm')
                            }</p>
                        </div>

                        <div
                            className="adrd-content"
                            dangerouslySetInnerHTML={{__html: article.content}}>

                        </div>
                    </div>
                ) : (<Spin/>)}


                <BackTop/>
            </div>
        )
    }
}