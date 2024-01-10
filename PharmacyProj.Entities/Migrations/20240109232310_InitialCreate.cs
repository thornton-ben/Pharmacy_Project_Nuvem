using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PharmacyProj.Entities.Migrations
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PharmacyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilledPrescriptions = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pharmacy", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Pharmacy",
                columns: new[] { "Id", "Address", "City", "CreatedBy", "CreatedDate", "FilledPrescriptions", "Name", "PharmacyId", "State", "UpdatedBy", "UpdatedDate", "Zip" },
                values: new object[,]
                {
                    { 1, "123 Main St", "Dallas", "ben@test.com", new DateTime(2024, 1, 9, 17, 23, 10, 492, DateTimeKind.Local).AddTicks(743), 50, "Walgreens", 1, "TX", null, null, "12345" },
                    { 2, "456 Oak St", "Frisco", "ben@test.com", new DateTime(2024, 1, 9, 17, 23, 10, 492, DateTimeKind.Local).AddTicks(783), 75, "CVS", 2, "TX", null, null, "23456" },
                    { 3, "789 Pine St", "Richardson", "ben@test.com", new DateTime(2024, 1, 9, 17, 23, 10, 492, DateTimeKind.Local).AddTicks(785), 100, "Walmart Pharmacy", 3, "TX", null, null, "34567" },
                    { 4, "101 Elm St", "McKinney", "ben@test.com", new DateTime(2024, 1, 9, 17, 23, 10, 492, DateTimeKind.Local).AddTicks(788), 125, "Kroger Pharmacy", 4, "TX", null, null, "45678" },
                    { 5, "202 Birch St", "Frisco", "ben@test.com", new DateTime(2024, 1, 9, 17, 23, 10, 492, DateTimeKind.Local).AddTicks(790), 150, "HEB Pharmacy", 5, "TX", null, null, "56789" }
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
