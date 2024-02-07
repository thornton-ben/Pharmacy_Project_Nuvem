USE [PharmacyDb]
GO

CREATE PROCEDURE [dbo].[PharmacistProductionReport]
AS
BEGIN
WITH PharmacistDrugSales AS (
    SELECT
        PS.PharmacistId,
        PS.DrugId,
        SUM(PS.UnitsSold) AS TotalUnitsSoldByPharmacist
    FROM
        PharmacySale PS
    JOIN Pharmacist P ON PS.PharmacistId = P.PharmacistId
    GROUP BY
        PS.PharmacistId,
        PS.DrugId
),
PharmacyTotalUnitsSold AS (
    SELECT
        PS.DrugId,
        SUM(PS.UnitsSold) AS TotalUnitsSoldByPharmacy
    FROM
        PharmacySale PS
    JOIN Pharmacist P ON PS.PharmacistId = P.PharmacistId
    GROUP BY
        PS.DrugId
)
SELECT
    P.FirstName, 
    P.LastName,
    PH.Name AS PharmacyName,
    D.DrugName,
    PD.TotalUnitsSoldByPharmacist,
    PT.TotalUnitsSoldByPharmacy
FROM
    Pharmacist P
JOIN PharmacistDrugSales PD ON P.PharmacistId = PD.PharmacistId
JOIN Drug D ON PD.DrugId = D.DrugId
JOIN Pharmacy PH ON P.PharmacyId = PH.PharmacyId
JOIN PharmacyTotalUnitsSold PT ON PD.DrugId = PT.DrugId
ORDER BY 
    PharmacyName, 
    LastName, 
    TotalUnitsSoldByPharmacist DESC;
END
GO

