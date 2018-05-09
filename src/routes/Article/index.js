import React, {PureComponent} from 'react';
import {getArticleForId, getArticleTypes} from '../../services/home';
import {message, Spin, BackTop} from 'antd';
import moment from 'moment'
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
                    <div>
                        <h2>{article.title}</h2>
                        {/* <span>{article.assId}</span>*/}
                        <span>{articleTypesObj[article.type]}</span>
                        <p>{article.lastupdTime ?
                            moment(article.lastupdTime).format('YYYY-MM-DD HH:mm')
                            : moment(article.insertTime).format('YYYY-MM-DD HH:mm')
                        }</p>
                        <div
                            dangerouslySetInnerHTML={{__html: article.content}}>

                        </div>
                    </div>
                ) : (<Spin/>)}


                <BackTop/>
            </div>
        )
    }
}