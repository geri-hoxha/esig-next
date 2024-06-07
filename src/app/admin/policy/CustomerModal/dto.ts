import { Exclude, Expose, Transform, plainToClass } from 'class-transformer';
import { Address, ComputeCustomerCommand_Request, CustomerModel, OrganizationRequest, PersonRequest } from '../type';
import { Dayjs } from 'dayjs';

@Exclude()
class ComputeCustomerCommand_Request_Model implements Partial<ComputeCustomerCommand_Request> {
    @Expose()
    taxNumber?: string;

    @Expose()
    isLocal?: boolean;

    @Expose()
    @Transform(({ obj, value }: { obj: CustomerModel, value: string }) => {
        if (obj.contactType === 'Organization') {
            return obj.displayName
        }
        return value
    })
    firstName?: string;

    @Expose()
    lastName?: string | null;

    @Expose()
    phoneNumber?: string | null;

    @Expose()
    email?: string | null;

    @Expose()
    address?: Address;

    @Expose({})
    contactType?: string;

    @Expose()
    @Transform(({ obj }: { obj: CustomerModel }): PersonRequestModel | null => {
        if (obj.contactType !== 'Person') return null;

        return plainToClass(PersonRequestModel, obj);

    })
    personData?: PersonRequest | null;

    @Expose()
    @Transform(({ obj }: { obj: CustomerModel }): OrganizationRequestModel | null => {
        if (obj.contactType !== 'Organization') return null;

        return plainToClass(OrganizationRequestModel, obj);
    })
    organizationData?: OrganizationRequest | null;

}

export default ComputeCustomerCommand_Request_Model;

@Exclude()
class OrganizationRequestModel implements Partial<OrganizationRequest> {
    @Expose()
    isActive?: boolean;

    @Expose()
    businessDescription?: string;

    @Expose()
    administrator?: string;

    @Expose()
    organizationLegalFormType?: string;

    @Expose()
    organizationBusinessSizeType?: string;

    @Expose()
    organizationOwnershipType?: string;

    @Expose()
    organizationSectorType?: string;

}

@Exclude()
class PersonRequestModel implements Partial<PersonRequest> {
    @Expose()
    fathersName?: string;

    @Expose()
    birthday?: Dayjs;

    @Expose()
    genderType?: string;
}