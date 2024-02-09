-- =============================================
-- Author: Benjamin Thornton
-- Create date: 2/1/2024
-- Description:	All delivery records with Warhouse From and Pharmacy To names
-- =============================================

USE [PharmacyDb]
GO

CREATE PROCEDURE [dbo].[DeliveryDetailReport]
AS
BEGIN
    SELECT
        d.DeliveryDate,
        w.Name AS 'WarehouseName',
        p.Name AS 'PharmacyName',
        dr.DrugName,
        d.UnitCount,
        d.UnitPrice,
        d.TotalPrice,
        d.CreatedDate,
        d.CreatedBy
    FROM
        dbo.Delivery d
    INNER JOIN Warehouse w ON d.WarehouseId = w.WarehouseId
    INNER JOIN Pharmacy p ON d.PharmacyId = p.PharmacyId
    INNER JOIN Drug dr ON d.DrugId = dr.DrugId;
END
GO