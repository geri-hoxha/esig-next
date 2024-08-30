import { Expose, Transform, plainToClass, Exclude, ClassConstructor } from "class-transformer";
import type { ObjectType, PolicyItemRequest } from "../type";
import dayjs from "dayjs";
import PolicyItemInsuredObjectRequestModel from "./PolicyItemInsuredObjectRequest";
import PolicyItemCoverageRequestModel from "./PolicyItemCoverageRequest";
import AddressModel from "./Address";
import { ObjectModelDTO } from "../page";

@Exclude()
class PolicyItemRequestModel implements PolicyItemRequest {
    static modelParameter: ObjectModelDTO;

    @Expose()
    @Transform(({ value }) => String(value) || '')
    text = "";

    @Expose()
    @Transform(() => null)
    issuedDateUtc = null;

    @Expose()
    @Transform(() => null)
    startDateUtc = dayjs();

    @Expose()
    @Transform(() => null)
    endDateUtc = null;

    @Expose()
    @Transform(({ value }) => value || '')
    productTemplateId = "";

    @Expose()
    @Transform(({ value, obj }) => {
        PolicyItemInsuredObjectRequestModel.modelParameter = PolicyItemRequestModel.modelParameter
        return plainToClass(PolicyItemInsuredObjectRequestModel, value) || [];
    })
    insuredObjects = [];

    @Expose()
    @Transform(({ value }) => {
        return plainToClass(PolicyItemCoverageRequestModel, value) || [];
    })
    coverages = [];

    @Expose()
    @Transform(({ value = [] }) => {
        return value.map((address: AddressModel) => {
            return plainToClass(AddressModel, address)
        });
    })
    riskAddresses = [];
}

export default PolicyItemRequestModel;
