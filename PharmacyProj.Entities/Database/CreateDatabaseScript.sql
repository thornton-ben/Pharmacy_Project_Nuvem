﻿USE PharmacyDb

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Pharmacy')
BEGIN

CREATE TABLE Pharmacy (
    PharmacyId INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(250) NOT NULL,
    Address VARCHAR(250) NOT NULL,
    City VARCHAR(250) NOT NULL,
    State VARCHAR(250) NOT NULL,
    Zip VARCHAR(5) NOT NULL,
    FilledPrescriptions INT NOT NULL,
CreatedDate DATETIMEOFFSET NOT NULL,
    UpdatedDate DATETIMEOFFSET NULL,
    CreatedBy VARCHAR(250) NOT NULL,
    UpdatedBy VARCHAR(250) NULL    
);


--Insert data into Pharmacy table
INSERT INTO Pharmacy (Address, City, CreatedBy, CreatedDate, FilledPrescriptions, Name, State, UpdatedBy, UpdatedDate, Zip) 
VALUES
    ('123 Main St', 'Dallas', 'ben@test.com', '2024-01-09T17:23:10.492743', 50, 'Walgreens', 'TX', NULL, NULL, '12345'),
    ('456 Oak St', 'Frisco', 'ben@test.com', '2024-01-09T17:23:10.492783', 75, 'CVS', 'TX', NULL, NULL, '23456'),
    ('789 Pine St', 'Richardson', 'ben@test.com', '2024-01-09T17:23:10.492785', 100, 'Walmart Pharmacy', 'TX', NULL, NULL, '34567'),
    ('101 Elm St', 'McKinney', 'ben@test.com', '2024-01-09T17:23:10.492788', 125, 'Kroger Pharmacy', 'TX', NULL, NULL, '45678'),
    ('202 Birch St', 'Frisco', 'ben@test.com', '2024-01-09T17:23:10.492790', 150, 'HEB Pharmacy', 'TX', NULL, NULL, '56789');

END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Pharmacist')
BEGIN

CREATE TABLE Pharmacist (
    PharmacistId INT PRIMARY KEY IDENTITY(1,1),
    PharmacyId INT FOREIGN KEY REFERENCES Pharmacy(PharmacyId) NOT NULL,
    FirstName VARCHAR(250) NOT NULL,
    LastName VARCHAR(250) NOT NULL,
    Age INT NOT NULL,
    StartDate DATETIMEOFFSET NOT NULL,
    EndDate DATETIMEOFFSET NULL,
    CreatedDate DATETIMEOFFSET NOT NULL,
    UpdateDate DATETIMEOFFSET NULL,
    CreatedBy VARCHAR(250) NOT NULL,
    UpdatedBy VARCHAR(250) NULL 
);

INSERT INTO Pharmacist (PharmacyId, FirstName, LastName, Age, StartDate, CreatedDate, CreatedBy)
VALUES
    (1, 'Alice', 'Turner', 28, '2015-03-20', '2023-03-20', 'ben@test.com'),
    (1, 'Elijah', 'Harris', 35, '2010-05-20', '2023-03-20', 'ben@test.com'),
    (2, 'Lena', 'Patel', 42, '2007-07-03', '2023-03-20', 'ben@test.com'),
    (2, 'Jordan', 'Mitchell', 25, '2022-03-20', '2023-03-20', 'ben@test.com'),
    (3, 'Olivia', 'Carter', 30, '2018-03-20', '2023-03-20', 'ben@test.com'),
    (3, 'Miles', 'Anderson', 45, '2005-03-20', '2023-03-20', 'ben@test.com'),
    (4, 'Zara', 'Nguyen', 64, '1985-03-20', '2023-03-20', 'ben@test.com'),
    (4, 'Samuel', 'Foster', 53, '1995-03-20', '2023-03-20', 'ben@test.com'),
    (5, 'Maya', 'Taylor', 56, '1993-03-20', '2023-03-20', 'ben@test.com'),
    (5, 'Caleb', 'Robinson', 70, '1975-03-20', '2023-03-20', 'ben@test.com');

END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Warehouse')
BEGIN

CREATE TABLE Warehouse (
    WarehouseId INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(250) NOT NULL,
    Address VARCHAR(250) NOT NULL,
    City VARCHAR(250) NOT NULL,
    StateCode VARCHAR(2) NOT NULL,
    Zip VARCHAR(5) NOT NULL,
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);

INSERT INTO Warehouse (Name, Address, City, StateCode, Zip, CreatedDate, CreatedBy)
VALUES
    ('Doctor Supplies', '123 Main St', 'TechCity', 'TC', '12345', '2024-02-01', 'ben@test.com'),
    ('Pharmacy Central', '456 Innovation Ave', 'TechVille', 'TV', '54321', '2024-02-01', 'ben@test.com'),
    ('Drug World', '789 Circuit Rd', 'Techopolis', 'TP', '98765', '2024-02-01', 'ben@test.com');

END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Drug')
BEGIN

CREATE TABLE Drug (
    DrugId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    DrugName VARCHAR(250) NOT NULL,
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);

INSERT INTO Drug (DrugName, CreatedDate, CreatedBy)
VALUES
    ('Aspirin', '2024-02-01', 'ben@test.com'),
    ('Lipitor', '2024-02-01', 'ben@test.com'),
    ('Tylenol', '2024-02-01', 'ben@test.com');

END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Delivery')
BEGIN

CREATE TABLE Delivery (
	DeliveryId INT PRIMARY KEY IDENTITY(1,1),
    WarehouseId INT FOREIGN KEY REFERENCES Warehouse(WarehouseId) NOT NULL,
    PharmacyId INT FOREIGN KEY REFERENCES Pharmacy(PharmacyId) NOT NULL,
    DrugId INT FOREIGN KEY REFERENCES Drug(DrugId) NOT NULL,
    UnitCount INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    DeliveryDate DATETIMEOFFSET NOT NULL,
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);

INSERT INTO Delivery (WarehouseId, PharmacyId, DrugId, UnitCount, UnitPrice, TotalPrice, DeliveryDate, CreatedDate, CreatedBy)
VALUES 
  (1, 2, 3, 100, 10.5, 1050, '2024-02-05', '2024-01-15', 'ben@test.com'),
  (2, 4, 1, 75, 8.2, 615, '2024-02-12', '2024-01-16', 'ben@test.com'),
  (3, 1, 2, 120, 5.7, 684, '2024-02-18', '2024-01-17', 'ben@test.com'),
  (1, 3, 3, 90, 12.3, 1107, '2024-02-23', '2024-01-18', 'ben@test.com'),
  (2, 5, 1, 110, 7.8, 858, '2024-02-07', '2024-01-19', 'ben@test.com'),
  (3, 2, 2, 80, 9.6, 768, '2024-02-15', '2024-01-20', 'ben@test.com'),
  (1, 4, 3, 95, 11.1, 1054.5, '2024-02-28', '2024-01-21', 'ben@test.com'),
  (2, 1, 1, 130, 6.4, 832, '2024-02-03', '2024-01-22', 'ben@test.com'),
  (3, 3, 2, 85, 8.9, 756.5, '2024-02-10', '2024-01-23', 'ben@test.com'),
  (1, 5, 3, 105, 10.8, 1134, '2024-02-21', '2024-01-24', 'ben@test.com'),
  (2, 2, 1, 70, 7.2, 504, '2024-02-14', '2024-01-25', 'ben@test.com'),
  (3, 4, 2, 125, 9.3, 1162.5, '2024-02-26', '2024-01-26', 'ben@test.com'),
  (1, 1, 3, 100, 11.6, 1160, '2024-02-01', '2024-01-27', 'ben@test.com'),
  (2, 3, 1, 80, 8.7, 696, '2024-02-11', '2024-01-28', 'ben@test.com'),
  (3, 5, 2, 110, 10.5, 1155, '2024-02-20', '2024-01-29', 'ben@test.com'),
  (1, 2, 3, 90, 7.8, 702, '2024-02-24', '2024-01-30', 'ben@test.com'),
  (2, 4, 1, 120, 9.2, 1104, '2024-02-05', '2024-01-31', 'ben@test.com'),
  (3, 1, 2, 75, 6.5, 487.5, '2024-02-13', '2024-02-01', 'ben@test.com'),
  (1, 3, 3, 110, 10.1, 1111, '2024-02-19', '2024-02-02', 'ben@test.com'),
  (2, 5, 1, 85, 8.4, 714, '2024-02-25', '2024-02-03', 'ben@test.com');

END

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PharmacySales')
BEGIN

CREATE TABLE PharmacySales (
    SaleId INT PRIMARY KEY IDENTITY(1,1),
    PharmacistId INT FOREIGN KEY REFERENCES Pharmacist(PharmacistId),
    PharmacyId INT FOREIGN KEY REFERENCES Pharmacy(PharmacyId),
    DrugId INT FOREIGN KEY REFERENCES Drug(DrugId),
    SalePrice DECIMAL(10, 2) NOT NULL,
    UnitsSold Decimal NOT NULL,
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
  );

INSERT INTO PharmacySales (PharmacistId, PharmacyId, DrugId, SalePrice, UnitsSold, CreatedDate, CreatedBy)
VALUES
   (2, 3, 2, 15.99, 25, '2024-02-03', 'ben@test.com'),
(7, 2, 1, 10.50, 10, '2024-02-03', 'ben@test.com'),
(1, 4, 3, 5.75, 30, '2024-02-03', 'ben@test.com'),
(5, 1, 2, 8.25, 15, '2024-02-03', 'ben@test.com'),
(9, 5, 1, 12.00, 20, '2024-02-03', 'ben@test.com'),
(3, 3, 1, 9.99, 18, '2024-02-03', 'ben@test.com'),
(8, 1, 2, 14.50, 22, '2024-02-03', 'ben@test.com'),
(6, 4, 3, 6.75, 12, '2024-02-03', 'ben@test.com'),
(4, 2, 1, 11.25, 28, '2024-02-03', 'ben@test.com'),
(10, 5, 2, 7.50, 25, '2024-02-03', 'ben@test.com'),
(1, 1, 3, 10.99, 15, '2024-02-03', 'ben@test.com'),
(7, 3, 1, 8.50, 20, '2024-02-03', 'ben@test.com'),
(2, 5, 2, 13.25, 10, '2024-02-03', 'ben@test.com'),
(9, 4, 3, 5.00, 30, '2024-02-03', 'ben@test.com'),
(3, 2, 1, 10.99, 25, '2024-02-03', 'ben@test.com'),
(8, 1, 2, 14.50, 22, '2024-02-03', 'ben@test.com'),
(6, 4, 3, 6.75, 12, '2024-02-03', 'ben@test.com'),
(4, 2, 1, 11.25, 28, '2024-02-03', 'ben@test.com'),
(10, 5, 2, 7.50, 25, '2024-02-03', 'ben@test.com'),
(1, 1, 3, 10.99, 15, '2024-02-03', 'ben@test.com'),
(7, 3, 1, 8.50, 20, '2024-02-03', 'ben@test.com'),
(2, 5, 2, 13.25, 10, '2024-02-03', 'ben@test.com'),
(9, 4, 3, 5.00, 30, '2024-02-03', 'ben@test.com'),
(3, 2, 1, 10.99, 25, '2024-02-03', 'ben@test.com'),
(8, 1, 2, 14.50, 22, '2024-02-03', 'ben@test.com'),
(6, 4, 3, 6.75, 12, '2024-02-03', 'ben@test.com'),
(4, 2, 1, 11.25, 28, '2024-02-03', 'ben@test.com'),
(10, 5, 2, 7.50, 25, '2024-02-03', 'ben@test.com'),
(1, 1, 3, 10.99, 15, '2024-02-03', 'ben@test.com'),
(7, 3, 1, 8.50, 20, '2024-02-03', 'ben@test.com'),
(2, 5, 2, 13.25, 10, '2024-02-03', 'ben@test.com'),
(9, 4, 3, 5.00, 30, '2024-02-03', 'ben@test.com'),
(3, 2, 1, 10.99, 25, '2024-02-03', 'ben@test.com'),
(8, 1, 2, 14.50, 22, '2024-02-03', 'ben@test.com'),
(6, 4, 3, 6.75, 12, '2024-02-03', 'ben@test.com'),
(4, 2, 1, 11.25, 28, '2024-02-03', 'ben@test.com'),
(10, 5, 2, 7.50, 25, '2024-02-03', 'ben@test.com'),
(1, 1, 3, 10.99, 15, '2024-02-03', 'ben@test.com'),
(7, 3, 1, 8.50, 20, '2024-02-03', 'ben@test.com'),
(2, 5, 2, 13.25, 10, '2024-02-03', 'ben@test.com'),
(9, 4, 3, 5.00, 30, '2024-02-03', 'ben@test.com'),
(3, 2, 1, 10.99, 25, '2024-02-03', 'ben@test.com'),
(8, 1, 2, 14.50, 22, '2024-02-03', 'ben@test.com'),
(6, 4, 3, 6.75, 12, '2024-02-03', 'ben@test.com'),
(4, 2, 1, 11.25, 28, '2024-02-03', 'ben@test.com'),
(10, 5, 2, 7.50, 25, '2024-02-03', 'ben@test.com'),
(1, 1, 3, 10.99, 15, '2024-02-03', 'ben@test.com'),
(7, 3, 1, 8.50, 20, '2024-02-03', 'ben@test.com'),
(2, 5, 2, 13.25, 10, '2024-02-03', 'ben@test.com');
END