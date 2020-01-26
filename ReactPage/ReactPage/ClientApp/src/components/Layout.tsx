import * as React from 'react';
import Navbar from "./Navbar";
import {Breadcrumb, Layout} from 'antd';
import {RouteComponentProps} from "react-router";

const {Header, Footer, Content} = Layout;

export default (props: { children?: React.ReactNode }) => (
    <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
            <Navbar/>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
            {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
);