-- =============================================
-- Author: Benjamin Thornton
-- Create date: 2/1/2024
-- Description:	All Warehouse records with a column showing total delivery revenue and total unit count for each, and total revenue/units average profit.
-- =============================================

USE [PharmacyDb]
GO

CREATE PROCEDURE [dbo].[GetWarehouseProfitList] 
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