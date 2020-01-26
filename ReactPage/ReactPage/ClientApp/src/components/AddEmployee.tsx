import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {Link, NavLink} from 'react-router-dom';
import {EmployeeData} from './Employees';
import Container from "./Container";
import {Button, Descriptions, PageHeader} from "antd";

interface RouteParams {
    empid: string;
}

interface AddEmployeeDataState {
    title: string;
    empid: number;
    loading: boolean;
    cityList: Array<any>;
    empData: EmployeeData;
}

export default class AddEmployee extends React.Component<RouteComponentProps<RouteParams>, AddEmployeeDataState> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);
        this.state = {title: "", empid: Number(this.props.match.params.empid), loading: true, cityList: [], empData: new EmployeeData};

        fetch('api/employee/Cities')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({cityList: data});
            });

        if (this.state.empid > 0) {
            fetch('api/employee/Details/' + this.state.empid)
                .then(response => response.json() as Promise<EmployeeData>)
                .then(data => {
                    this.setState({title: "Edit", loading: false, empData: data});
                });
        } else { // This will set state for Add employee
            this.setState({title: "Create", loading: false, cityList: [], empData: new EmployeeData});
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);
            
        let header = this.state.empid > 0 ? this.renderHeader() : <div><h1>{this.state.title}</h1><h3>Employee</h3></div>;
            
        const path = this.state.empid > 0 ? [<Link to={"/employees"}>Employees</Link>, "Edit"] : ["Employees", "Add"];

        return (
            <Container path={path}>
                <div>
                    {header}
                    <hr/>
                    {contents}
                </div>
            </Container>
        );
    }
    
    private renderHeader() {
        return (
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Edit Employee"
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Name">{this.state.empData.name}</Descriptions.Item>
                    <Descriptions.Item label="City">{this.state.empData.city}</Descriptions.Item>
                    <Descriptions.Item label="Department">{this.state.empData.department}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{this.state.empData.gender}</Descriptions.Item>
                </Descriptions>
            </PageHeader>
        );
    }

    // This will handle the submit form event.  
    private handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // PUT request for Edit employee.  
        if (this.state.empData.employeeID) {
            fetch('api/employee/Edit', {
                method: 'PUT',
                body: data,
            }).then(_data => {
                this.props.history.push("/employees");
            })
        }
        // POST request for Add employee.  
        else {
            fetch('api/employee/Create', {
                method: 'POST',
                body: data,
            }).then(_data => {
                this.props.history.push("/employees");
            })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
        e.preventDefault();
        this.props.history.push("/employees");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeID}/>
                </div>
                < div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name}
                               required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender"
                                defaultValue={this.state.empData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department">Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department"
                               defaultValue={this.state.empData.department} required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City"
                                defaultValue={this.state.empData.city} required>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={cityList.indexOf(city)} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        )
    }
}