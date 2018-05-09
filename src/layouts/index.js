import React, {Component} from 'react';
import logo from '../assets/logo.png';
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
            <Layout>
                <Header style={{position: 'fixed', width: '100%', zIndex: 999}}>
                    <Col xs={0} sm={0} md={1} lg={1} xl={4}></Col>
                    <Col xs={24} sm={24} md={22} lg={22} xl={16}>
                        <Link to="/">
                            <img src={logo} alt="" className="logo"/>
                        </Link>

                        <Menu
                            theme="dark"
                            mode="horizontal"
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/dataDownload">资料下载</Link></Menu.Item>
                        </Menu>
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={1} xl={4}></Col>
                </Header>
                <Row>
                    <Col xs={0} sm={0} md={1} lg={1} xl={4}></Col>
                    <Col xs={24} sm={24} md={22} lg={22} xl={16}>
                        <Content style={{padding: '16px 50px 0', marginTop: 64}}>
                            <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                                {this.props.children}
                            </div>
                        </Content>
                    </Col>
                    <Col xs={0} sm={0} md={1} lg={1} xl={4}></Col>
                </Row>
                <Footer style={{textAlign: 'center'}}>
                    Copyright <Icon type="copyright"/> 2018 14商业软件1班
                </Footer>
            </Layout>
        );
    }
}