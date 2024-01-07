﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PharmacyProj.Database;

#nullable disable

namespace PharmacyProj.Database.Migrations
{
    [DbContext(typeof(PharmacyDbContext))]
    partial class PharmacyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PharmacyProj.Database.Models.Pharmacy", b =>
                {
                    b.Property<int>("PharmacyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PharmacyId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("FilledPrescriptions")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PharmacyId");

                    b.ToTable("Pharmacy");

                    b.HasData(
                        new
                        {
                            PharmacyId = 1,
                            Address = "123 Main St",
                            City = "Dallas",
                            CreatedDate = new DateTime(2024, 1, 7, 16, 59, 25, 652, DateTimeKind.Local).AddTicks(4699),
                            FilledPrescriptions = 50,
                            Name = "Walgreens",
                            State = "TX",
                            Zip = "12345"
                        },
                        new
                        {
                            PharmacyId = 2,
                            Address = "456 Oak St",
                            City = "Frisco",
                            CreatedDate = new DateTime(2024, 1, 7, 16, 59, 25, 652, DateTimeKind.Local).AddTicks(4738),
                            FilledPrescriptions = 75,
                            Name = "CVS",
                            State = "TX",
                            Zip = "23456"
                        },
                        new
                        {
                            PharmacyId = 3,
                            Address = "789 Pine St",
                            City = "Richardson",
                            CreatedDate = new DateTime(2024, 1, 7, 16, 59, 25, 652, DateTimeKind.Local).AddTicks(4741),
                            FilledPrescriptions = 100,
                            Name = "Walmart Pharmacy",
                            State = "TX",
                            Zip = "34567"
                        },
                        new
                        {
                            PharmacyId = 4,
                            Address = "101 Elm St",
                            City = "McKinney",
                            CreatedDate = new DateTime(2024, 1, 7, 16, 59, 25, 652, DateTimeKind.Local).AddTicks(4744),
                            FilledPrescriptions = 125,
                            Name = "Kroger Pharmacy",
                            State = "TX",
                            Zip = "45678"
                        },
                        new
                        {
                            PharmacyId = 5,
                            Address = "202 Birch St",
                            City = "Frisco",
                            CreatedDate = new DateTime(2024, 1, 7, 16, 59, 25, 652, DateTimeKind.Local).AddTicks(4746),
                            FilledPrescriptions = 150,
                            Name = "HEB Pharmacy",
                            State = "TX",
                            Zip = "56789"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
