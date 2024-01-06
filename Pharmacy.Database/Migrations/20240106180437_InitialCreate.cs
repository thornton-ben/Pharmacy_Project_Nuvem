using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PharmacyProj.Database.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pharmacy",
                columns: table => new
                {
                    PharmacyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FilledPrescriptions = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pharmacy", x => x.PharmacyId);
                });

            migrationBuilder.InsertData(
                table: "Pharmacy",
                columns: new[] { "PharmacyId", "Address", "City", "CreatedDate", "FilledPrescriptions", "Name", "State", "UpdatedDate", "Zip" },
                values: new object[,]
                {
                    { 1, "123 Main St", "Dallas", new DateTime(2024, 1, 6, 12, 4, 37, 605, DateTimeKind.Local).AddTicks(7936), 50, "Walgreens", "TX", null, "12345" },
                    { 2, "456 Oak St", "Frisco", new DateTime(2024, 1, 6, 12, 4, 37, 605, DateTimeKind.Local).AddTicks(7975), 75, "CVS", "TX", null, "23456" },
                    { 3, "789 Pine St", "Richardson", new DateTime(2024, 1, 6, 12, 4, 37, 605, DateTimeKind.Local).AddTicks(7977), 100, "Walmart Pharmacy", "TX", null, "34567" },
                    { 4, "101 Elm St", "McKinney", new DateTime(2024, 1, 6, 12, 4, 37, 605, DateTimeKind.Local).AddTicks(7979), 125, "Kroger Pharmacy", "TX", null, "45678" },
                    { 5, "202 Birch St", "Frisco", new DateTime(2024, 1, 6, 12, 4, 37, 605, DateTimeKind.Local).AddTicks(7981), 150, "HEB Pharmacy", "TX", null, "56789" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pharmacy");
        }
    }
}
