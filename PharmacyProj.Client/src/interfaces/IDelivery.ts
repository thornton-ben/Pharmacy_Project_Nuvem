export default interface IDelivery {
  deliveryId: number
  warehouseId: number
  pharmacyId: number
  drugId: number
  unitCount: number
  unitPrice: number
  totalPrice?: number
  deliveryDate: Date
  createdDate: Date
  updatedDate?: Date | null
  updateby?: string | null
  createdBy: string
} 