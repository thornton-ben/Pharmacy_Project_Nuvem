export default interface IPharmacist {
  pharmacistId: number
  pharmacyId: number
  firstName: string
  lastName: string
  age: number
  createdDate: Date
  updatedDate?: Date | null
  updateby?: string | null
  createdBy: string
} 