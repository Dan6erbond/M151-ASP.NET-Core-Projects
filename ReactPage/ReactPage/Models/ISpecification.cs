using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPage.Models
{
	public interface ISpecification<T>
	{
		public Boolean Specificied(T item);
	}
}
