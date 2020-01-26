import * as React from 'react';

import {Menu, Icon} from 'antd';
import {ClickParam} from "antd/es/menu";
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

interface IProps {
}

interface IState {
    current: string;
}

export default class Navbar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            current: 'home'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} style={{ lineHeight: '64px' }} mode="horizontal">
                <Menu.Item key="mail">
                    <Icon type="home"/><span><a href="/">Home</a></span>
                </Menu.Item>
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            Custom
                        </span>
                    }>
                    <Menu.ItemGroup title="Employees">
                        <Menu.Item key="setting:1">
                            <Link to={"/employees"}>Employees</Link>                            
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                            <Link to={"/employees/add"}>Add Employee</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        );
    }

    private handleClick(e: ClickParam) {
        this.setState({
            current: e.key,
        });
    }
}