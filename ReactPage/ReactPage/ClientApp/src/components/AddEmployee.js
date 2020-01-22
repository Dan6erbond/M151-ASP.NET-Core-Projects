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
var Employees_1 = require("./Employees");
var AddEmployee = /** @class */ (function (_super) {
    __extends(AddEmployee, _super);
    function AddEmployee(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { title: "", loading: true, cityList: [], empData: new Employees_1.EmployeeData };
        fetch('api/employee/Cities')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ cityList: data });
        });
        var empid = Number(_this.props.match.params.empid);
        if (empid > 0) {
            fetch('api/employee/Details/' + empid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Edit", loading: false, empData: data });
            });
        }
        // This will set state for Add employee  
        else {
            _this.state = { title: "Create", loading: false, cityList: [], empData: new Employees_1.EmployeeData };
        }
        // This binding is necessary to make "this" work in the callback  
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddEmployee.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm(this.state.cityList);
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Employee"),
            React.createElement("hr", null),
            contents);
    };
    // This will handle the submit form event.  
    AddEmployee.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.currentTarget);
        // PUT request for Edit employee.  
        if (this.state.empData.employeeID) {
            fetch('api/employee/Edit', {
                method: 'PUT',
                body: data,
            }).then(function (_data) {
                _this.props.history.push("/employees");
            });
        }
        // POST request for Add employee.  
        else {
            fetch('api/employee/Create', {
                method: 'POST',
                body: data,
            }).then(function (_data) {
                _this.props.history.push("/employees");
            });
        }
    };
    // This will handle Cancel button click event.  
    AddEmployee.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/employees");
    };
    // Returns the HTML Form to the render() method.  
    AddEmployee.prototype.renderCreateForm = function (cityList) {
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "employeeId", value: this.state.empData.employeeID })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Name" }, "Name"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "name", defaultValue: this.state.empData.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Gender" }, "Gender"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "gender", defaultValue: this.state.empData.gender, required: true },
                        React.createElement("option", { value: "" }, "-- Select Gender --"),
                        React.createElement("option", { value: "Male" }, "Male"),
                        React.createElement("option", { value: "Female" }, "Female")))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Department" }, "Department"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Department", defaultValue: this.state.empData.department, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "City" }, "City"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "City", defaultValue: this.state.empData.city, required: true },
                        React.createElement("option", { value: "" }, "-- Select City --"),
                        cityList.map(function (city) {
                            return React.createElement("option", { key: city.cityId, value: city.cityName }, city.cityName);
                        })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "Cancel"))));
    };
    return AddEmployee;
}(React.Component));
exports.default = AddEmployee;
//# sourceMappingURL=AddEmployee.js.map