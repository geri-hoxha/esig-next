import { Exclude, Expose, plainToClass, Transform } from "class-transformer";
import { Dayjs } from "dayjs";
import AddressModel from "./Address";

@Exclude()
class PersonObjectModel {
  @Expose()
  customerId?: string;

  @Expose()
  age?: number;

  @Expose()
  displayName?: string;

  @Expose()
  taxNumber?: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  email?: string;

  @Expose()
  fathersName?: string;

  @Expose()
  birthday?: Dayjs;

  @Expose()
  genderType?: string;

  @Expose()
  @Transform(({ value }) => {
    return plainToClass(AddressModel, value);
  })
  address?: [];

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  reportName?: string;
  @Expose()
  waitingPeriod?: string;
}

export default PersonObjectModel;