export default interface IPharmacy {
  pharmacyId: number
  name: string
  filledPrescriptions: number
  address: string
  city: string
  state: string
  zip: string
  createdDate: Date
  updatedDate?: Date | null
  updateby?: string | null
  createdBy: string
} 