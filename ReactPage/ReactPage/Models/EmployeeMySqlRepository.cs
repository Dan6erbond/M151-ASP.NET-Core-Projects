using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ReactPage.Models
{
	public class EmployeeMySqlRepository : IRepository<Employee>
	{
		private readonly IDbConnection _connection;
		public IEnumerable<Employee> List { get; private set; }
		
		public EmployeeMySqlRepository(IConfiguration config)
		{
			_connection = new MySqlConnection(config["ConnectionStrings:Default"]);
			
			List = _connection.Query<Employee>("SELECT * FROM tblemployee").ToList();
		}

		public void Create(Employee item)
		{
			_connection.Execute($"INSERT INTO `tblemployee` (`EmployeeID`, `Name`, `City`, `Department`, `Gender`) VALUES (NULL, '{item.Name}', '{item.City}', '{item.Department}', '{item.Gender}');");
			List = _connection.Query<Employee>("SELECT * FROM tblemployee").ToList();
		}

		public void Delete(Employee item)
		{
			_connection.Execute($"DELETE FROM `tblemployee` WHERE `tblemployee`.`EmployeeID` = {item.EmployeeID}");
			List = _connection.Query<Employee>("SELECT * FROM tblemployee").ToList();
		}

		public List<Employee> Query(ISpecification<Employee> specification)
		{
			List<Employee> employees = List.Where(specification.Specificied).ToList();
			return employees;
		}

		public void Update(Employee item)
		{
			_connection.Execute($"UPDATE `tblemployee` SET `Name` = '{item.Name}', `City` = '{item.City}', `Department` = '{item.Department}', `Gender` = '{item.Gender}' WHERE `tblemployee`.`EmployeeID` = {item.EmployeeID}");
			List = _connection.Query<Employee>("SELECT * FROM tblemployee").ToList();
		}
	}
}
