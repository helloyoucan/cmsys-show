import React, {PureComponent} from 'react';
import {getPage} from '../../services/dataDownload';
import {Pagination, message, Spin, List, Avatar, Button} from 'antd';
export default class DataDownload extends PureComponent {
    state = {
        isLoading: true,
        data: {
            list: [],
            pagination: {
                total: 0,
                currentPage: 1,
                pageSize: 10
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData(params) {
        this.setState({
            isLoading: true
        })
        getPage({
            pageNo: 1,
            pageSize: 10,
            ...params
        }).then(res => {
            this.setState({
                isLoading: false,
                data: {
                    list: this.state.data.list.concat(res.data.list),
                    pagination: res.data.pagination
                }
            })
        }).catch(res => {
            message.error('获取数据失败')
        })
    }

    /*onShowSizeChange(current, pageSize) {
     this.getData({
     pageNo: current,
     pageSize: pageSize,
     })
     }*/

    onLoadMore() {
        this.getData({
            pageNo: this.state.data.pagination.currentPage + 1
        })
    }

    render() {
        const {isLoading, data: {list, pagination}} = this.state
        const loadMore = pagination.pageSize * pagination.currentPage <= pagination.total ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {isLoading && <Spin />}
                {!isLoading && <Button onClick={this.onLoadMore.bind(this)}>加载更多</Button>}
            </div>
        ) : null;
        return (

            <div>
                <List
                    loading={isLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item, index) => ( <li key={index}>
                        <p>{item.name} <a href={item.path}>下载</a></p>
                    </li>)}
                />
                {/*{
                 isLoading ?
                 (<Spin/>) :
                 (<ul>
                 {list.map((item, index) => {
                 return ( <li key={index}>
                 <p>{item.name}</p>
                 <a href={item.path}>下载</a>
                 </li>)
                 })}
                 </ul>
                 )
                 }
                 <Pagination
                 showSizeChanger
                 onShowSizeChange={this.onShowSizeChange.bind(this)}
                 defaultCurrent={pagination.pageNo}
                 total={pagination.total}/>*/}
            </div>
        )
    }
}