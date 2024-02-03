USE [PharmacyProj]
GO

CREATE PROCEDURE [dbo].[sp_GetWarehouseProfitList] 
AS
BEGIN
    SELECT
        W.Name AS WarehouseName,       
        SUM(D.TotalPrice) AS TotalDeliveryRevenue,
        SUM(D.UnitCount) AS TotalUnitCount,
        AVG(D.TotalPrice / D.UnitCount) AS AverageProfitPerUnit
    FROM
        Warehouse W
    JOIN
        Delivery D ON W.WarehouseId = D.WarehouseId
    GROUP BY
        W.Name
    ORDER BY
        TotalDeliveryRevenue DESC;
END
GO