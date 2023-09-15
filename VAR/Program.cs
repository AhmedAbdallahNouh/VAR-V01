using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using VAR.Models;
using VAR.Repositries;

namespace VAR
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);


            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddDbContext<VarDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("default")));

            builder.Services.AddScoped<IAdminRepo, AdminRepo>(); //Ingect IAdminRepo
            builder.Services.AddScoped<IPlaystationRepo, PlaystationRepo>(); //Ingect IPlaystationRepo
            builder.Services.AddScoped<IAuthnticationRepo, AuthnticationRepo>(); //Ingect IAuthnticationRepo
            builder.Services.AddScoped<IItemRepo, ItemRepo>(); //Ingect ItemRepo
            builder.Services.AddScoped<IOrderRepo, OrderRepo>(); //Ingect IOrderRepo
            builder.Services.AddScoped<IOrderItemDetailsRepo, OrderItemDetailsRepo>(); //Ingect IOrderItemDetailsRepo



            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(9);
                options.Cookie.HttpOnly = false;
                options.Cookie.IsEssential = true;
            });

            builder.Services.AddAuthentication(
                CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
                {
                    option.LoginPath = "/Account/Login";
                    option.ExpireTimeSpan = TimeSpan.FromHours(9);
                    option.Cookie.HttpOnly = false;
                    option.Cookie.IsEssential = true;
                });

           

            var app = builder.Build();
            // Update the database if it is not updated
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var dbContext = services.GetRequiredService<VarDbContext>();
                    dbContext.Database.Migrate();
                }
                catch (Exception ex)
                {
                    // Handle any errors that occur during database migration
                    // You can log the error or perform any other actions here
                    Console.WriteLine("An error occurred while applying database migrations: " + ex.Message);
                }
            }

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Account}/{action=Login}/{id?}");

            app.Run();
        }
    }
}