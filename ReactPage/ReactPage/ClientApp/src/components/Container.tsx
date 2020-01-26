import * as React from 'react';
import {Breadcrumb} from "antd";

export default (props: { path: Array<string|JSX.Element>, children?: React.ReactNode }) => (
    <React.Fragment>
        <Breadcrumb style={{margin: '16px 0'}}>
            {props.path.map(p => <Breadcrumb.Item key={props.path.indexOf(p)}>{p}</Breadcrumb.Item>)}
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>{props.children}</div>
    </React.Fragment>
);