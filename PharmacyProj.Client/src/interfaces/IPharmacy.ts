export default interface IPharmacy {
  id: number
  name: string
  filledPrescriptions: number
  address: string
  city: string
  stateCode: string
  zip: string
  createdDate: Date
  updatedDate?: Date | null
  updateby?: string | null
  createdBy: string
} 