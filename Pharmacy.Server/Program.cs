using Microsoft.EntityFrameworkCore;
using PharmacyProj.Services;
using PharmacyProj.Services.Interfaces;
using PharmacyProj.Services.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContextPool<PharmacyDbContext>(options =>
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly("PharmacyProj.Entities"))
    );

builder.Services.AddScoped<IPharmacyService, PharmacyService>();
builder.Services.AddScoped<IDeliveryService, DeliveryService>();
builder.Services.AddScoped<IWarehouseService, WarehouseService>();
builder.Services.AddScoped<IPharmacySaleService, PharmacySaleService>();
builder.Services.AddScoped<IPharmacistService, PharmacistService>();


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.Services.CreateScope().ServiceProvider.GetRequiredService<PharmacyDbContext>().Database.Migrate();

app.Run();
