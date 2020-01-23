using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ReactPage.Models
{
	public class CityMySqlRepository : IRepository<City>
	{
		private readonly IDbConnection _connection;
		
		public IEnumerable<City> List { get; private set; }

		public CityMySqlRepository(IConfiguration config)
		{
			_connection = new MySqlConnection(config["ConnectionString"]);
			
			List = _connection.Query<City>("SELECT * FROM tblcities").ToList();
		}

		public void Create(City item)
		{
			_connection.Execute($"INSERT INTO `tblcities` (`CityID`, `CityName`) VALUES (NULL, '{item.CityName}');");
			List = _connection.Query<City>("SELECT * FROM tblcities").ToList();
		}

		public void Delete(City item)
		{
			_connection.Execute($"DELETE FROM `tblemployee` WHERE `tblemployee`.`EmployeeID` = {item.CityID}");
			List = _connection.Query<City>("SELECT * FROM tblcities").ToList();
		}

		public List<City> Query(ISpecification<City> specification)
		{
			List<City> cities = List.Where(specification.Specificied).ToList();
			return cities;
		}

		public void Update(City item)
		{
			_connection.Execute($"UPDATE `tblcities` SET `Name` = '{item.CityName}' WHERE `tblcities`.`CityID` = {item.CityID}");
			List = _connection.Query<City>("SELECT * FROM tblcities").ToList();
		}
	}
}
