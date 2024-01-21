import IPharmacy from "./IPharmacy"

export default interface IState {
  data: IPharmacy[]
  selectedPharmacy: IPharmacy | null | undefined
  status: "idle" | "loading" | "failed" | "succeeded"
  error: "loading" | "saving" | ""
}
