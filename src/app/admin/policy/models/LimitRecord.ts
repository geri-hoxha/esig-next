import { Exclude, Expose, plainToClass, Transform, TransformFnParams } from "class-transformer";
import type { LimitRecord, PolicyItemCoverageRequest } from "../type";

@Exclude()
class LimitRecordModel implements LimitRecord {
  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return value || false;
  })
  enabled: boolean = false;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return value || undefined;
  })
  value: number | null = null;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return value || undefined;
  })
  limitType: string | null = null;

  @Expose()
  @Transform(({ value }: TransformFnParams) => {
    return value || undefined;
  })
  minValue: number | null = null;

  @Expose()
  @Transform(({ value }) => value || undefined, { toPlainOnly: true })
  maxValue: number | null = null;
}

export default LimitRecordModel;