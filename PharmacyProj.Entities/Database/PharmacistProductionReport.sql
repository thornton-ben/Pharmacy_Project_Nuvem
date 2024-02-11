-- =============================================
-- Author: Benjamin Thornton
-- Create date: 2/1/2024
-- Description:	List all Pharmacists each with Pharmacy Name they work at, name of the drugs they sold, total unit count that their pharmacy sold the drug, 
-- and rank them for total unit count times
-- =============================================


USE [PharmacyDb]
GO

CREATE PROCEDURE [dbo].[PharmacistProductionReport]
AS
BEGIN
WITH PharmacistDrugSales AS (
    SELECT
        PS.PharmacistId,
        PS.DrugId,
        SUM(PS.UnitsSold) AS TotalUnitsSoldByPharmacist,
        SUM(PS.UnitsSold * PS.SalePrice) AS Revenue
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
    PT.TotalUnitsSoldByPharmacy,
    RANK() OVER(PARTITION BY P.FirstName, P.LastName ORDER BY PD.Revenue DESC) AS RevenueRank
FROM
    Pharmacist P
JOIN PharmacistDrugSales PD ON P.PharmacistId = PD.PharmacistId
JOIN Drug D ON PD.DrugId = D.DrugId
JOIN Pharmacy PH ON P.PharmacyId = PH.PharmacyId
JOIN PharmacyTotalUnitsSold PT ON PD.DrugId = PT.DrugId
ORDER BY 
    PharmacyName, 
    LastName, 
    RevenueRank;
END
GO

