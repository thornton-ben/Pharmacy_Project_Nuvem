USE [PharmacyProj]
GO

CREATE PROCEDURE [dbo].[sp_PharmacistProductionReport]
AS
BEGIN
    SELECT
        P.PharmacistId ,
        P.FirstName,
        P.LastName,
        Ph.Name AS PharmacyName,
        D.DrugName,
        SUM(S.UnitsSold) AS TotalUnitCount,
        RANK() OVER (ORDER BY SUM(S.UnitsSold * S.SalePrice) DESC) AS Rank
    FROM
       PHARMACISTS P
        JOIN Pharmacy Ph ON P.PharmacyId = Ph.PharmacyId
        JOIN PharmacySales S ON P.PharmacistId = S.PharmacistId
        JOIN Drug D ON S.DrugId = D.DrugId
    GROUP BY
        P.PharmacistId ,
        Ph.Name,
        D.DrugName
    ORDER BY
        Rank;
END
GO

