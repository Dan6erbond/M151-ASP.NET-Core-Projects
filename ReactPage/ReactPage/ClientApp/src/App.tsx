import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import Employees from './components/Employees';
import NotFound from './components/NotFound';
import './custom.css'

export default () => (
    <Router>
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/employees' component={Employees} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </Router>
);
