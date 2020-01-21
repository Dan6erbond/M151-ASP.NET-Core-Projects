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
		private EmployeeRepository Repository = new EmployeeRepository();

		public IEnumerable<Employee> Index()
		{
			return Repository.List;
		}
	}
}
