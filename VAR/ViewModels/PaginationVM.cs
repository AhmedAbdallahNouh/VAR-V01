using VAR.Models;

namespace VAR.ViewModels

{
    public class PaginationVM
    {
        public int Total { get; set; }
        public int Page { get; set; }
        public bool Filter { get; set; }
        public double AllOrdersTotalPrice { get; set; }
        public List<Order>? Orders { get; set; } = new List<Order>();
        public PaginationVM(int Total, int Page,bool Filter, double AllOrdersTotalPrice, List<Order> Orders)
        {
            this.Total = Total;
            this.Page = Page;
            this.Orders = Orders;
            this.AllOrdersTotalPrice = AllOrdersTotalPrice;
            this.Filter = Filter;


        }
    }
}
