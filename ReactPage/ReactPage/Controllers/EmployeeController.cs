using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using ReactPage.Models;

namespace ReactPage.Controllers
{
	[Route("api/employee")]
	public class EmployeeController : Controller
    {
        private readonly IRepository<Employee> _employeeRepository; 
        private readonly IRepository<City> _cityRepository;

        public EmployeeController(IRepository<Employee> employeeRepository, IRepository<City> cityRepository)
        {
            _employeeRepository = employeeRepository;
            _cityRepository = cityRepository;
        }

        [HttpGet("")]
        public IEnumerable<Employee> Index()
		{
			return _employeeRepository.List;
		}

        [HttpPost("Create")]
        public void Create(Employee employee)
        {
            _employeeRepository.Create(employee);
        }

        [HttpGet("Details/{id}")]
        public Employee Details(int id)
        {
            return _employeeRepository.Query(new EmployeeSpecification(id)).First();
        }

        [HttpPut("Edit")]
        public void Edit(Employee employee)
        {
            _employeeRepository.Update(employee);
        }

        [HttpDelete("Delete/{id}")]
        public void Delete(int id)
        {
            _employeeRepository.Delete(_employeeRepository.Query(new EmployeeSpecification(id)).First());
        }

        [HttpGet("Cities")]
        public IEnumerable<City> Cities()
        {
            return _cityRepository.List;
        }
    }
}
