﻿using System;
using System.Globalization;
using System.Threading;
using Microsoft.EntityFrameworkCore;
//using System.Globalization;
using VAR.Models;
using VAR.ViewModels;

namespace VAR.Repositries
{
    public class OrderRepo : IOrderRepo
    {
        private readonly VarDbContext dbContext;

        public OrderRepo(VarDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<List<Order>> getAll()
        {
            return await dbContext.Orders.Include(o=> o.Admin).Include(o=>o.Playstation).ToListAsync();
        }

        public PaginationVM getOrdersPagination(int page, int size)
        {
            var allOrders = dbContext.Orders.Include(o => o.Admin).Include(o => o.Playstation).Include(o => o.OrderItemDetails).OrderByDescending(o => o.StartTime).ToList();
            var result = allOrders.Skip((page - 1) * size).Take(size).ToList();
            //var result = (dbContext.Orders.Include(o => o.Admin).Include(o => o.Playstation).Include(o => o.OrderItemDetails)).OrderByDescending(o => o.StartTime).Skip((page - 1) * size).Take(size).ToList();
            var total = dbContext.Orders.Count();
            var pages = (int)Math.Ceiling((decimal)total / size);

            var allOrdersTotalPrice = allOrders.Sum(o => o.TotalPrice);
            double orderCafeTotalPrice = 0;
            foreach (var order in allOrders)
            {
                orderCafeTotalPrice += order.OrderItemDetails.Sum(oid => oid.TotalPrice);
            };
            var orderGamingTotalPrice = allOrdersTotalPrice - orderCafeTotalPrice;
            PaginationVM paginationVM = new PaginationVM(total, pages, false, allOrdersTotalPrice , result ,orderCafeTotalPrice , orderGamingTotalPrice);
            return paginationVM;
        }
        public PaginationVM GetFilteredOrdersPagination(FilteredOrdersPaginationVM filteredOrdersPaginationVM)
        {
            //var endDate = new DateTime(filteredOrdersPaginationVM.EndTime.Day) 
            var endOfDayTime = new DateTime((int)(filteredOrdersPaginationVM.EndTime?.Year), (int)(filteredOrdersPaginationVM.EndTime?.Month), (int)(filteredOrdersPaginationVM.EndTime?.Day), 23, 59, 59);
            var query = dbContext.Orders
                .Include(o => o.Admin)
                .Include(o => o.Playstation)
                .Include(o => o.OrderItemDetails)
                .Where(o =>
                         (string.IsNullOrEmpty(filteredOrdersPaginationVM.AdminName) || o.Admin.Name == filteredOrdersPaginationVM.AdminName) &&
                         (string.IsNullOrEmpty(filteredOrdersPaginationVM.PlaystationRoomName) || o.Playstation.RoomName == filteredOrdersPaginationVM.PlaystationRoomName) &&
                         (!filteredOrdersPaginationVM.StartTime.HasValue || (o.StartTime >= filteredOrdersPaginationVM.StartTime && o.StartTime <= endOfDayTime) )
                        //&& (!filteredOrdersPaginationVM.EndTime.HasValue || o.EndTime <= filteredOrdersPaginationVM.EndTime)

                       ).OrderByDescending(o => o.StartTime).ToList();


            var total = query.Count();
            var pages = (int)Math.Ceiling((decimal)total / filteredOrdersPaginationVM.size);

            var result = query.Skip((filteredOrdersPaginationVM.page - 1) * filteredOrdersPaginationVM.size).Take(filteredOrdersPaginationVM.size).ToList();
            var allOrdersTotalPrice = query.Sum(o => o.TotalPrice);
            double orderCafeTotalPrice = 0;
            foreach (var order in query)
            {
                orderCafeTotalPrice += order.OrderItemDetails.Sum(oid => oid.TotalPrice);
            };
            var orderGamingTotalPrice = allOrdersTotalPrice - orderCafeTotalPrice;
            var paginationVM = new PaginationVM(total, pages, true, allOrdersTotalPrice, result,orderCafeTotalPrice ,orderGamingTotalPrice);
            return paginationVM;
        }
        public async Task<Order?> getById(int id)
        {
            return await dbContext.Orders.Include(o => o.Admin).Include(o => o.Playstation).Include(o => o.OrderItemDetails).ThenInclude(oid => oid.Item).SingleOrDefaultAsync(o => o.Id == id);
        }
        //public async Task<Item?> getByNumber(int number)
        //{
        //    return await dbContext.Orders.SingleOrDefaultAsync(o => o.Number == number);
        //}
        public  Order? Add(OrderVM orderVM)
        {

            Order order = new Order()
            {
                StartTime = orderVM.StartTime !=null ? DateTime.Parse(orderVM.StartTime):null,
                EndTime = orderVM.EndTime != null ? DateTime.Parse(orderVM.EndTime) : null ,
                TotalPrice = orderVM.TotalPrice,
                Discount = orderVM.Discount,
                adminID = orderVM.adminID,
                playstationID = orderVM.playstationID
            };

            dbContext.Orders.Add(order);
            dbContext.SaveChanges();
            return order;
        }
        public async Task<Order?> edit(Order order)
        {
            dbContext.Update(order);
            await dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> delete(int id)
        {
            Order? order = await getById(id);
            if (order != null)
            {
                dbContext.Remove(order);
                await dbContext.SaveChangesAsync();
            }
            return order;
        }
    }
}
