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
	[Route("api/employees")]
	public class EmployeeController : Controller
	{
		public IEnumerable<Employee> Index()
		{
			string connectionString = "server=localhost;port=3306;user=root;password=;database=employee_manager_react";

			List<Employee> employees = new List<Employee>();
			using (IDbConnection db = new MySqlConnection(connectionString))
			{
				employees = db.Query<Employee>("SELECT * FROM tblemployee").ToList();
				return employees;
			}
		}
	}
}
