using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPage.Models
{
	public class CityMySqlRepository : IRepository<City>
	{
		private readonly String connectionString = "server=localhost;port=3306;user=root;password=;database=employee_manager_react";
		public IEnumerable<City> List
		{
			get
			{
				List<City> cities = new List<City>();
				using (IDbConnection conn = new MySqlConnection(connectionString))
				{
					cities = conn.Query<City>("SELECT * FROM tblcities").ToList();
					return cities;
				}
			}
		}

		public void Create(City item)
		{
			using (IDbConnection conn = new MySqlConnection(connectionString))
			{
				conn.Execute($"INSERT INTO `tblcities` (`CityID`, `CityName`) VALUES (NULL, '{item.CityName}');");
			}
		}

		public void Delete(City item)
		{
			using (IDbConnection conn = new MySqlConnection(connectionString))
			{
				conn.Execute($"DELETE FROM `tblemployee` WHERE `tblemployee`.`EmployeeID` = {item.CityID}");
			}
		}

		public List<City> Query(ISpecification<City> specification)
		{
			List<City> cities = List.Where(city => specification.Specificied(city)).ToList();
			return cities;
		}

		public void Update(City item)
		{
			using (IDbConnection conn = new MySqlConnection(connectionString))
			{
				conn.Execute($"UPDATE `tblcities` SET `Name` = '{item.CityName}' WHERE `tblcities`.`CityID` = {item.CityID}");
			}
		}
	}
}
