import IDelivery from "./IDelivery"
import IPharmacy from "./IPharmacy"

export interface IPharmacyState {
  data: IPharmacy[] | IDelivery[];
  status: "idle" | "loading" | "failed" | "succeeded" | "saving";
  error: any;
}
