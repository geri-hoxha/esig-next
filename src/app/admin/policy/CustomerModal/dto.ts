import { Exclude, Expose, Transform, plainToClass } from 'class-transformer';
import type { ComputeCustomerCommand_Request, CustomerModel, OrganizationRequest, PersonRequest } from '../type';
import { Dayjs } from 'dayjs';
import type { Address } from '../type';

@Exclude()
class ComputeCustomerCommand_Request_Model implements Partial<ComputeCustomerCommand_Request> {
    @Exclude()
    private static splitReportName(obj: CustomerModel, fieldName: 'firstName' | 'lastName') {

        const haveReportName = !!obj.reportName?.trim();

        if (!haveReportName) return ''

        const splittedArray = obj.reportName.split('|');

        const result: { [key: string]: string } = {};

        splittedArray.forEach(item => {
            result[item] = item;
        });

        return result[fieldName]
    }

    @Expose()
    taxNumber?: string;

    @Expose()
    isLocal?: boolean;

    @Expose()
    @Transform(({ obj }: { obj: CustomerModel, value: string }) => {
        if (obj.contactType === 'Organization') {
            return obj.displayName
        }

        return ComputeCustomerCommand_Request_Model.splitReportName(obj, 'firstName')
    })
    firstName?: string;

    @Expose({ groups: ['Person'] })
    @Transform(({ obj }: { obj: CustomerModel, value: string }) => {
        return ComputeCustomerCommand_Request_Model.splitReportName(obj, 'lastName')
    })
    lastName?: string | null;

    @Expose()
    phoneNumber?: string | null;

    @Expose()
    email?: string | null;

    @Expose()
    address?: Address;

    @Expose({})
    contactType?: string;

    @Expose({ groups: ['Person'] })
    @Transform(({ obj }: { obj: CustomerModel }): PersonRequestModel | null => {

        return plainToClass(PersonRequestModel, obj);

    })
    personData?: PersonRequest | null;

    @Expose({ groups: ['Organization'] })
    @Transform(({ obj }: { obj: CustomerModel }): OrganizationRequestModel | null => {

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