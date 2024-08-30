import { Exclude, Expose } from "class-transformer";
import { Dayjs } from "dayjs";

@Exclude()
class VehicleObjectModel {
    @Expose()
    vin?: string;

    @Expose()
    plate?: string;

    @Expose()
    region?: string;

    @Expose()
    type?: string;

    @Expose()
    make?: string;

    @Expose()
    model?: string;

    @Expose()
    fuel?: string;

    @Expose()
    volume?: number;

    @Expose()
    motorPower?: number;

    @Expose()
    productionYear?: number;

    @Expose()
    maxAuthorizedCapacity?: number;

    @Expose()
    seats?: number;

    @Expose()
    ownerTaxNumber?: string;

    @Expose()
    color?: string;

    @Expose()
    reportTime?: Dayjs;

    @Expose()
    internalCategoryTpl?: string;

    @Expose()
    internalClassificationTpl?: string;

    @Expose()
    classificationTpl?: string;

    @Expose()
    classificationBorder?: string;

    @Expose()
    ownerCustomerId?: string;

    @Expose()
    ownerDrivingPermitNo?: string;

    @Expose()
    ownerFirstName?: string;

    @Expose()
    ownerFathersName?: string;

    @Expose()
    ownerLastName?: string;

    @Expose()
    ownerGender?: string;

    @Expose()
    ownerBirthday?: Dayjs;

    @Expose()
    ownerType?: string;
}



export default VehicleObjectModel;