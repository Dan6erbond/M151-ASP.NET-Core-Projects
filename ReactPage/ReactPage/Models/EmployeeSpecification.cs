using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPage.Models
{
	public class EmployeeSpecification : ISpecification<Employee>
	{

		private int? EmployeeID = null;

		public EmployeeSpecification(int? employeeID = null)
		{
			this.EmployeeID = employeeID;
		}

		public bool Specificied(Employee item)
		{
			if (EmployeeID != null && item.EmployeeID != EmployeeID)
			{
				return false;
			}
			return true;
		}
	}
}
