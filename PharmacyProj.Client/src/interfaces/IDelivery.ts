export default interface IDelivery {
  deliveryId: number
  warehouseName: number
  pharmacyName: number
  drugName: number
  unitCount: number
  unitPrice: number
  totalPrice?: number
  deliveryDate: Date
  createdDate: Date
  updatedDate?: Date | null
  updateby?: string | null
  createdBy: string
} 