import { Exclude, Expose, Transform, plainToClass } from 'class-transformer';
import { Address, ComputeCustomerCommand_Request, OrganizationRequest, PersonRequest } from '../type';

@Exclude()
class ComputeCustomerCommand_Request_Model implements Partial<ComputeCustomerCommand_Request> {
    @Expose()
    taxNumber?: string;

    @Expose()
    isLocal?: boolean;
    
    @Expose()
    firstName?: string;
    
    @Expose()
    lastName?: string | null;

    @Expose()
    phoneNumber?: string | null;
    
    @Expose()
    email?: string | null;
    
    @Expose()
    address?: Address;
    
    @Expose()
    contactType?: string;
    
    @Expose()
    personData?: PersonRequest | null;
    
    @Expose()
    organizationData?: OrganizationRequest | null;
 
}

export default ComputeCustomerCommand_Request_Model;