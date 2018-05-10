import React, {Component} from 'react';
import logo from '../assets/logo.png';
import bg from '../assets/home-bg.jpg';
import {Link} from 'react-router-dom'
import {Layout, Menu, Icon, Row, Col} from 'antd';
import './index.css';
const {Header, Content, Footer} = Layout;

export default class BaseLayout extends Component {
    state = {
        current: '0',
    }
    handleClick = (e) => {
        // this.setState({
        //     current: e.key,
        // });
    }

    render() {
        return (
            <div>
                <header>
                    <div className="logo-content">
                        <Link to="/">
                            <img src={logo} alt="LOGO" className="nav-logo"/>
                        </Link>
                        广州商学院社团文化展示网站
                    </div>
                    <nav>
                        <Menu
                            mode="horizontal"
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/articles">推文</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/clubs">社团</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/dataDownload">资料下载</Link></Menu.Item>
                        </Menu>
                    </nav>
                </header>
                <div style={{background: '#fff', minHeight: 380}}>
                    {this.props.children}
                </div>
                <Footer style={{textAlign: 'center'}}>
                    Copyright <Icon type="copyright"/> 2018 14商业软件1班
                </Footer>
            </div>
        );
    }
}