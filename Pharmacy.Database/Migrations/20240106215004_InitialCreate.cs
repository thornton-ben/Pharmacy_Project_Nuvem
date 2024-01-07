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
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilledPrescriptions = table.Column<int>(type: "int", nullable: false),
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
                    { 1, "123 Main St", "Dallas", new DateTime(2024, 1, 6, 15, 50, 4, 314, DateTimeKind.Local).AddTicks(4836), 50, "Walgreens", "TX", null, "12345" },
                    { 2, "456 Oak St", "Frisco", new DateTime(2024, 1, 6, 15, 50, 4, 314, DateTimeKind.Local).AddTicks(4873), 75, "CVS", "TX", null, "23456" },
                    { 3, "789 Pine St", "Richardson", new DateTime(2024, 1, 6, 15, 50, 4, 314, DateTimeKind.Local).AddTicks(4876), 100, "Walmart Pharmacy", "TX", null, "34567" },
                    { 4, "101 Elm St", "McKinney", new DateTime(2024, 1, 6, 15, 50, 4, 314, DateTimeKind.Local).AddTicks(4878), 125, "Kroger Pharmacy", "TX", null, "45678" },
                    { 5, "202 Birch St", "Frisco", new DateTime(2024, 1, 6, 15, 50, 4, 314, DateTimeKind.Local).AddTicks(4880), 150, "HEB Pharmacy", "TX", null, "56789" }
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
