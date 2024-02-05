export default interface IPharmacySale {
  pharmacySaleId: number
  pharmacistId: number
  drugId: number
  salePrice: number
  createdDate: Date
  updatedDate?: Date | null
  updateby?: string | null
  createdBy: string
} 