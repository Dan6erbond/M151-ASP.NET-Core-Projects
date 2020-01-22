"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var EmployeeData = /** @class */ (function () {
    function EmployeeData() {
        this.employeeID = 0;
        this.name = "";
        this.gender = "";
        this.city = "";
        this.department = "";
    }
    return EmployeeData;
}());
exports.EmployeeData = EmployeeData;
var Employees = /** @class */ (function (_super) {
    __extends(Employees, _super);
    function Employees(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { empList: [], loading: true };
        fetch('api/employee')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ empList: data, loading: false });
        });
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.handleEdit = _this.handleEdit.bind(_this);
        return _this;
    }
    Employees.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderEmployeeTable(this.state.empList);
        return React.createElement("div", null,
            React.createElement("h1", null, "Employee Data"),
            React.createElement("p", null, "This component demonstrates fetching Employee data from the server."),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/employees/add" }, "Create New")),
            contents);
    };
    Employees.prototype.handleDelete = function (id) {
        var _this = this;
        if (!window.confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/employee/Delete/' + id, {
                method: 'delete'
            }).then(function (_data) {
                _this.setState({
                    empList: _this.state.empList.filter(function (rec) {
                        return (rec.employeeID != id);
                    })
                });
            });
        }
    };
    Employees.prototype.handleEdit = function (id) {
        this.props.history.push("/employees/edit/" + id);
    };
    // Returns the HTML table to the render() method.  
    Employees.prototype.renderEmployeeTable = function (empList) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "EmployeeId"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Gender"),
                    React.createElement("th", null, "Department"),
                    React.createElement("th", null, "City"),
                    React.createElement("th", null))),
            React.createElement("tbody", null, empList.map(function (emp) {
                return React.createElement("tr", { key: emp.employeeID },
                    React.createElement("td", null),
                    React.createElement("td", null, emp.employeeID),
                    React.createElement("td", null, emp.name),
                    React.createElement("td", null, emp.gender),
                    React.createElement("td", null, emp.department),
                    React.createElement("td", null, emp.city),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleEdit(emp.employeeID); } }, "Edit"),
                        "  |",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleDelete(emp.employeeID); } }, "Delete")));
            })));
    };
    return Employees;
}(React.Component));
exports.default = react_redux_1.connect()(Employees);
//# sourceMappingURL=Employees.js.map