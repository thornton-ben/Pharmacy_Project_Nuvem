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
    GROUP BY
        PS.PharmacistId,
        PS.DrugId
)
SELECT
    PH.PharmacistId,
    PH.FirstName, 
	PH.LastName,
 P.PharmacyId,
    P.Name AS PharmacyName,
    PD.DrugId,
    D.DrugName,
    PD.TotalUnitsSoldByPharmacist,
    PD2.TotalUnitsSoldByPharmacy
FROM
    Pharmacist PH
INNER JOIN
    Pharmacy P ON PH.PharmacyId = P.PharmacyId
INNER JOIN
    PharmacistDrugSales PD ON PH.PharmacistId = PD.PharmacistId
INNER JOIN
    Drug D ON PD.DrugId = D.DrugId
INNER JOIN (
    SELECT
        PS.DrugId,
        SUM(PS.UnitsSold) AS TotalUnitsSoldByPharmacy
    FROM
        PharmacySale PS
    GROUP BY
        PS.DrugId
) PD2 ON PD.DrugId = PD2.DrugId
ORDER BY PharmacistId, TotalUnitsSoldByPharmacist DESC
END
GO

