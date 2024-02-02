USE PharmacyProj

CREATE TABLE Pharmacy (
    PharmacyId INT IDENTITY(1,1) NOT NULL,
    Name VARCHAR(250) NOT NULL,
    Address VARCHAR(250) NOT NULL,
    City VARCHAR(250) NOT NULL,
    State VARCHAR(250) NOT NULL,
    Zip VARCHAR(5) NOT NULL,
    FilledPerscriptions INT NOT NULL,
CreatedDate DATETIME NOT NULL,
    UpdateDate DATETIME NULL,
    CreatedBy VARCHAR(250) NOT NULL,
    UpdatedBy VARCHAR(250) NULL    
);

--Insert data into Pharmacy table
INSERT INTO Pharmacy (Address, City, CreatedBy, CreatedDate, FilledPrescriptions, Name, PharmacyId, State, UpdatedBy, UpdatedDate, Zip) 
VALUES
    ('123 Main St', 'Dallas', 'ben@test.com', '2024-01-09T17:23:10.492743', 50, 'Walgreens', 1, 'TX', NULL, NULL, '12345'),
    ('456 Oak St', 'Frisco', 'ben@test.com', '2024-01-09T17:23:10.492783', 75, 'CVS', 2, 'TX', NULL, NULL, '23456'),
    ('789 Pine St', 'Richardson', 'ben@test.com', '2024-01-09T17:23:10.492785', 100, 'Walmart Pharmacy', 3, 'TX', NULL, NULL, '34567'),
    ('101 Elm St', 'McKinney', 'ben@test.com', '2024-01-09T17:23:10.492788', 125, 'Kroger Pharmacy', 4, 'TX', NULL, NULL, '45678'),
    ('202 Birch St', 'Frisco', 'ben@test.com', '2024-01-09T17:23:10.492790', 150, 'HEB Pharmacy', 5, 'TX', NULL, NULL, '56789');

CREATE TABLE PHARMACISTS (
    PharmacistId INT PRIMARY KEY IDENTITY(1,1),
    PharmacyId INT FOREIGN KEY REFERENCES Pharmacy(PharmacyId) NOT NULL,
    FirstName VARCHAR(250) NOT NULL,
    LastName VARCHAR(250) NOT NULL,
    Age INT NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NULL,
    CreatedDate DATETIME NOT NULL,
    UpdateDate DATETIME NULL,
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

CREATE TABLE Warehouse (
    WarehouseId INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(250) NOT NULL,
    Address VARCHAR(250) NOT NULL,
    City VARCHAR(250) NOT NULL,
    StateCode VARCHAR(2) NOT NULL,
    Zip VARCHAR(5) NOT NULL,
	CreatedDate DATETIME NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIME NULL, 
	UpdatedBy VARCHAR(250) NULL
);

INSERT INTO Warehouse (Name, Address, City, StateCode, Zip, CreatedDate, CreatedBy)
VALUES
    ('Doctor Supplies', '123 Main St', 'TechCity', 'TC', '12345', '2024-02-01', 'ben@test.com'),
    ('Pharmacy Central', '456 Innovation Ave', 'TechVille', 'TV', '54321', '2024-02-01', 'ben@test.com'),
    ('Drug World', '789 Circuit Rd', 'Techopolis', 'TP', '98765', '2024-02-01', 'ben@test.com');

CREATE TABLE Drug (
    DrugId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    DrugName VARCHAR(250) NOT NULL,
	CreatedDate DATETIME NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIME NULL, 
	UpdatedBy VARCHAR(250) NULL
);

INSERT INTO Drug (DrugName, CreatedDate, CreatedBy)
VALUES
    ('Aspirin', '2024-02-01', 'ben@test.com'),
    ('Lipitor', '2024-02-01', 'ben@test.com'),
    ('Tylenol', '2024-02-01', 'ben@test.com');

CREATE TABLE Delivery (
	DeliveryId INT PRIMARY KEY IDENTITY(1,1),
    WarehouseId INT FOREIGN KEY REFERENCES Warehouse(WarehouseId) NOT NULL,
    PharmacyId INT FOREIGN KEY REFERENCES Pharmacy(PharmacyId) NOT NULL,
    DrugId INT FOREIGN KEY REFERENCES Drug(DrugId) NOT NULL,
    UnitCount INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    DeliveryDate DATETIME NOT NULL,
	CreatedDate DATETIME NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIME NULL, 
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

INSERT INTO Sale (PharmacistId, PharmacyId, DrugId, SalePrice, UnitsSold, CreatedDate, CreatedBy)
VALUES
    (1, 3, 2, 100, 10.5, 1050, '2024-02-01', '2024-02-01', 'ben@test.com'),
    (2, 1, 3, 75, 8.2, 615, '2024-02-02', '2024-02-01', 'ben@test.com'),
    (3, 4, 1, 120, 5.7, 684, '2024-02-03', '2024-02-01', 'ben@test.com'),
    (1, 2, 2, 50, 12.0, 600, '2024-02-04', '2024-02-01', 'ben@test.com'),
    (4, 5, 1, 90, 7.5, 675, '2024-02-05', '2024-02-01', 'ben@test.com'),
    (2, 3, 3, 80, 9.8, 784, '2024-02-06', '2024-02-01', 'ben@test.com'),
    (5, 1, 1, 110, 6.4, 704, '2024-02-07', '2024-02-01', 'ben@test.com'),
    (3, 4, 2, 60, 11.3, 678, '2024-02-08', '2024-02-01', 'ben@test.com'),
    (1, 5, 3, 70, 8.9, 623, '2024-02-09', '2024-02-01', 'ben@test.com'),
    (4, 2, 1, 95, 7.0, 665, '2024-02-10', '2024-02-01', 'ben@test.com'),
    (5, 5, 2, 105, 10.1, 1055, '2024-02-11', '2024-02-01', 'ben@test.com'),
    (3, 1, 3, 65, 9.5, 617.5, '2024-02-12', '2024-02-01', 'ben@test.com'),
    (2, 3, 1, 85, 6.8, 578, '2024-02-13', '2024-02-01', 'ben@test.com'),
    (1, 4, 2, 75, 11.7, 877.5, '2024-02-14', '2024-02-01', 'ben@test.com'),
    (4, 2, 3, 110, 8.4, 924, '2024-02-15', '2024-02-01', 'ben@test.com'),
    (5, 1, 1, 100, 10.0, 1000, '2024-02-16', '2024-02-01', 'ben@test.com'),
    (3, 5, 2, 80, 7.2, 576, '2024-02-17', '2024-02-01', 'ben@test.com'),
    (2, 4, 3, 90, 9.3, 837, '2024-02-18', '2024-02-01', 'ben@test.com'),
    (1, 2, 1, 120, 6.5, 780, '2024-02-19', '2024-02-01', 'ben@test.com'),
    (4, 3, 2, 65, 11.0, 715, '2024-02-20', '2024-02-01', 'ben@test.com'),
    (5, 1, 3, 95, 8.7, 826.5, '2024-02-21', '2024-02-01', 'ben@test.com'),
    (3, 5, 1, 110, 7.8, 858, '2024-02-22', '2024-02-01', 'ben@test.com'),
    (2, 4, 2, 75, 10.2, 765, '2024-02-23', '2024-02-01', 'ben@test.com'),
    (1, 2, 3, 85, 9.0, 765, '2024-02-24', '2024-02-01', 'ben@test.com'),
    (4, 3, 1, 105, 8.6, 903, '2024-02-25', '2024-02-01', 'ben@test.com'),
    (5, 5, 2, 95, 7.4, 703, '2024-02-26', '2024-02-01', 'ben@test.com'),
    (3, 1, 3, 70, 10.5, 735, '2024-02-27', '2024-02-01', 'ben@test.com'),
    (2, 3, 1, 80, 6.9, 552, '2024-02-28', '2024-02-01', 'ben@test.com'),
    (1, 4, 2, 100, 11.1, 1110, '2024-02-29', '2024-02-01', 'ben@test.com'),
    (4, 2, 3, 60, 9.7, 582, '2024-03-01', '2024-02-01', 'ben@test.com'),
    (5, 1, 1, 90, 8.0, 720, '2024-03-02', '2024-02-01', 'ben@test.com'),
    (3, 5, 2, 110, 7.3, 803, '2024-03-03', '2024-02-01', 'ben@test.com'),
    (2, 4, 3, 75, 10.0, 750, '2024-03-04', '2024-02-01', 'ben@test.com'),
    (1, 2, 1, 85, 9.4, 799, '2024-03-05', '2024-02-01', 'ben@test.com'),
    (4, 3, 2, 95, 8.2, 779, '2024-03-06', '2024-02-01', 'ben@test.com'),
    (5, 1, 3, 120, 7.6, 912, '2024-03-07', '2024-02-01', 'ben@test.com'),
    (3, 5, 1, 65, 11.5, 747.5, '2024-03-08', '2024-02-01', 'ben@test.com'),
    (2, 4, 2, 75, 9.1, 682.5, '2024-03-09', '2024-02-01', 'ben@test.com'),
    (1, 2, 3, 110, 8.5, 935, '2024-03-10', '2024-02-01', 'ben@test.com'),
    (4, 3, 1, 100, 7.9, 790, '2024-03-11', '2024-02-01', 'ben@test.com'),
    (5, 5, 2, 80, 10.3, 824, '2024-03-12', '2024-02-01', 'ben@test.com'),
    (3, 1, 3, 90, 9.6, 864, '2024-03-13', '2024-02-01', 'ben@test.com'),
    (2, 3, 1, 75, 6.7, 502.5, '2024-03-14', '2024-02-01', 'ben@test.com'),
    (1, 4, 2, 105, 11.2, 1176, '2024-03-15', '2024-02-01', 'ben@test.com'),
    (4, 2, 3, 95, 8.8, 836, '2024-03-16', '2024-02-01', 'ben@test.com'),
    (5, 1, 1, 65, 7.7, 500.5, '2024-03-17', '2024-02-01', 'ben@test.com'),
    (3, 5, 2, 85, 10.8, 918, '2024-03-18', '2024-02-01', 'ben@test.com'),
    (2, 4, 3, 110, 9.2, 1012, '2024-03-19', '2024-02-01', 'ben@test.com'),
    (1, 2, 1, 80, 6.6, 528, '2024-03-20', '2024-02-01', 'ben@test.com'),
    (4, 3, 2, 120, 10.4, 1248, '2024-03-21', '2024-02-01', 'ben@test.com');