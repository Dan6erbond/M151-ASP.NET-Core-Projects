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
		private EmployeeMySqlRepository EmployeeRepository = new EmployeeMySqlRepository();
		private CityMySqlRepository CityRepository = new CityMySqlRepository();

        [HttpGet("")]
        public IEnumerable<Employee> Index()
		{
			return EmployeeRepository.List;
		}

        [HttpPost("Create")]
        public void Create(Employee employee)
        {
            EmployeeRepository.Create(employee);
        }

        [HttpGet("Details/{id}")]
        public Employee Details(int id)
        {
            return EmployeeRepository.Query(new EmployeeSpecification(id)).First();
        }

        [HttpPut("Edit")]
        public void Edit(Employee employee)
        {
            EmployeeRepository.Update(employee);
        }

        [HttpDelete("Delete/{id}")]
        public void Delete(int id)
        {
            EmployeeRepository.Delete(EmployeeRepository.Query(new EmployeeSpecification(id)).First());
        }

        [HttpGet("Cities")]
        public IEnumerable<City> Cities()
        {
            return CityRepository.List;
        }
    }
}
