export default interface IDrug {
  warehouseId: number
  name: string
  address: string
  city: string
  state: string
  zip: string
  createdDate: Date
  updatedDate?: Date | null
  updateby?: string | null
  createdBy: string
} 