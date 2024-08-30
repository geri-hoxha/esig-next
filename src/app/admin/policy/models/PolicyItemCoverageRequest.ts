import { Exclude, Expose, plainToClass, Transform, TransformFnParams } from "class-transformer";
import type { LimitRecord, PolicyItemCoverageRequest } from "../type";
import LimitRecordModel from "./LimitRecord";

@Exclude()
class PolicyItemCoverageRequestModel implements PolicyItemCoverageRequest {
  @Expose()
  premium: number = 0;

  @Expose()
  @Transform(({ obj }: TransformFnParams) => {
    return obj.sumInsured * obj.itemObjectValue;
  })
  insuredAmount: number = 0;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return plainToClass(LimitRecordModel, value);
  })
  franchiseLimit: LimitRecord | null = null;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return plainToClass(LimitRecordModel, value);
  })
  deductibleLimit: LimitRecord | null = null;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return plainToClass(LimitRecordModel, value);
  })
  eventLimit: LimitRecord | null = null;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return plainToClass(LimitRecordModel, value);
  })
  personLimit: LimitRecord | null = null;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return plainToClass(LimitRecordModel, value);
  })
  periodLimit: LimitRecord | null = null;

  @Expose()
  productCoverageId: string = "";
}

export default PolicyItemCoverageRequestModel;