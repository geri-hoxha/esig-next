import { Exclude, Expose, Transform, plainToClass } from "class-transformer";
import { PolicyItemInsuredObjectRequest } from "../type";
import { ObjectModelDTO } from "../page";

@Exclude()
class PolicyItemInsuredObjectRequestModel
    implements PolicyItemInsuredObjectRequest {

    static modelParameter: ObjectModelDTO;

    @Expose()
    id: string = "";

    @Expose()
    @Transform(() => {
        return PolicyItemInsuredObjectRequestModel.modelParameter.objectType;
    })
    objectType: string = "";

    @Expose()
    @Transform(({ value, obj }) => {
        return plainToClass(PolicyItemInsuredObjectRequestModel.modelParameter.obj, value);
    })
    object: any;

    @Expose()
    objectValue: number = 0;
}

export default PolicyItemInsuredObjectRequestModel;