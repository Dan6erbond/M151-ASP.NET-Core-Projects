using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPage.Models
{
	public class EmployeeSpecification : ISpecification<Employee>
	{

		private readonly int? _employeeId = null;

		public EmployeeSpecification(int? employeeId = null)
		{
			this._employeeId = employeeId;
		}

		public bool Specificied(Employee item)
		{
			if (_employeeId != null && item.EmployeeID != _employeeId)
			{
				return false;
			}
			return true;
		}
	}
}
