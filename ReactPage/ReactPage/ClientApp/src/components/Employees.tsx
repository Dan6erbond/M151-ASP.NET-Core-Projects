import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Container from "./Container";

export class EmployeeData {
    employeeID: number = 0;
    name: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
}

interface IState {
    empList: EmployeeData[];
    loading: boolean;
}

class Employees extends React.Component<RouteComponentProps<{}>, IState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { empList: [], loading: true };

        fetch('api/employee')
            .then(response => response.json() as Promise<EmployeeData[]>)
            .then(data => {
                this.setState({ empList: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...Test</em></p>
            : this.renderEmployeeTable(this.state.empList);
        return (
            <Container path={["Employees"]}>
                <div>
                    <h1>Employee Data</h1>
                    <p>This component demonstrates fetching Employee data from the server.</p>
                    <p>
                        <Link to="/employees/add">Create New</Link>
                    </p>
                    {contents}
                </div>
            </Container>
        );
    }

    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/employee/Delete/' + id, {
                method: 'delete'
            }).then(_data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.employeeID != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/employees/edit/" + id);
    }

    // Returns the HTML table to the render() method.  
    private renderEmployeeTable(empList: EmployeeData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>EmployeeId</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>City</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.employeeID}>
                        <td></td>
                        <td>{emp.employeeID}</td>
                        <td>{emp.name}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.department}</td>
                        <td>{emp.city}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.employeeID)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.employeeID)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export default connect()(Employees);
