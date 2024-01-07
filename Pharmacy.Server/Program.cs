using PharmacyProj.Database;
using Microsoft.EntityFrameworkCore;
using PharmacyProj.Server;
using PharmacyProj.Server.Interfaces;
using PharmacyProj.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<PharmacyDbContext>(options =>
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly("PharmacyProj.Database"))
    );

builder.Services.AddScoped<IPharmacyService, PharmacyService>();


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

app.Run();
