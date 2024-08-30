import { Exclude, Expose } from "class-transformer";
import { Address } from "../type";

@Exclude()
class AddressModel implements Address {
  @Expose()
  country: string = "";

  @Expose()
  city?: string | null;

  @Expose()
  postalCode?: string | null;

  @Expose()
  streetAddress?: string | null;

  @Expose()
  streetAddress2?: string | null;

  @Expose()
  latitude?: number | null;

  @Expose()
  longitude?: number | null;
}

export default AddressModel;