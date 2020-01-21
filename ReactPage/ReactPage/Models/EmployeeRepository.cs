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
				using (IDbConnection db = new MySqlConnection(connectionString))
				{
					employees = db.Query<Employee>("SELECT * FROM tblemployee").ToList();
					return employees;
				}
			}
		}

		public void Create(Employee item)
		{
			throw new NotImplementedException();
		}

		public void Delete(Employee item)
		{
			throw new NotImplementedException();
		}

		public List<Employee> Query(ISpecification<Employee> specification)
		{
			throw new NotImplementedException();
		}

		public void Update(Employee item)
		{
			throw new NotImplementedException();
		}
	}
}
