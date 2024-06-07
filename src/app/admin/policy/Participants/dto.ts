import { Exclude, Expose, Transform, Type, plainToClass } from 'class-transformer';
import PolicyUsers from './PolicyUser';


class PolicyUserModel {
    @Type(() => Boolean)
    extraCharge?: boolean;

    @Expose({ groups: ['policyUsers'] }) 
    isLeader?: boolean; 
}

export default PolicyUserModel;