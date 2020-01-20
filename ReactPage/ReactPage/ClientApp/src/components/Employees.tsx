import * as React from 'react';
import { connect } from 'react-redux';

export class EmployeeData {
    employeeID: number = 0;
    name: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
}

interface EmployeesProps {

}

interface EmployeesState {
    empList: EmployeeData[];
    loading: boolean;
} 

class Employees extends React.Component<EmployeesProps, EmployeesState> {
    constructor(props: EmployeesProps) {
        super(props);
        this.state = { empList: [], loading: true };

        fetch('api/employees')
            .then(response => response.json() as Promise<EmployeeData[]>)
            .then(data => {
                this.setState({ empList: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeTable(this.state.empList);
        return <div>
            <h1>Employee Data</h1>
            <p>This component demonstrates fetching Employee data from the server.</p>
            {contents}
        </div>;
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
                    </tr>
                )}
            </tbody>
        </table>;
    }  
}

export default connect()(Employees);
