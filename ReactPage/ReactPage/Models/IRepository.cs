using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPage.Models
{
	public interface IRepository<T>
	{
		IEnumerable<T> List { get; }
		
		public void Create(T item);
		public void Update(T item);
		public void Delete(T item);

		public List<T> Query(ISpecification<T> specification);
	}
}
