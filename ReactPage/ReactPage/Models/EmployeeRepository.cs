using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPage.Models
{
	public class EmployeeRepository : IRepository<Employee>
	{
		private readonly String connectionString = "server=localhost;port=3306;user=root;password=;database=employee_manager_react";
		public IEnumerable<Employee> List
		{
			get
			{
				List<Employee> employees = new List<Employee>();
				using (IDbConnection conn = new MySqlConnection(connectionString))
				{
					employees = conn.Query<Employee>("SELECT * FROM tblemployee").ToList();
					return employees;
				}
			}
		}

		public void Create(Employee item)
		{
			using (IDbConnection conn = new MySqlConnection(connectionString))
			{
				conn.Execute($"INSERT INTO `tblemployee` (`EmployeeID`, `Name`, `City`, `Department`, `Gender`) VALUES (NULL, '{item.Name}', '{item.City}', '{item.Department}', '{item.Gender}');");
			}
		}

		public void Delete(Employee item)
		{
			using (IDbConnection conn = new MySqlConnection(connectionString))
			{
				conn.Execute($"DELETE FROM `tblemployee` WHERE `tblemployee`.`EmployeeID` = {item.EmployeeID}");
			}
		}

		public List<Employee> Query(ISpecification<Employee> specification)
		{
			List<Employee> employees = new List<Employee>();
			foreach(Employee employee in List)
			{
				if (specification.Specificied(employee))
				{
					employees.Add(employee);
				}
			}
			return employees;
		}

		public void Update(Employee item)
		{
			using (IDbConnection conn = new MySqlConnection(connectionString))
			{
				conn.Execute($"UPDATE `tblemployee` SET `Name` = '${item.Name}', `City` = '${item.City}', `Department` = '${item.Department}', `Gender` = '${item.Gender}' WHERE `tblemployee`.`EmployeeID` = ${item.EmployeeID}");
			}
		}
	}
}
