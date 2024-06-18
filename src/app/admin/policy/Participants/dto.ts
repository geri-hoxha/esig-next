import { Exclude, Expose, Transform, Type, plainToClass } from 'class-transformer';
import PolicyUsers from './PolicyUser';
import { IParticipants } from '../context';


class ParticipantModel {
    private static isFirstTransformation: boolean = true;

    @Expose({ groups: ['policyUsers'] as (keyof IParticipants)[] })
    @Transform(({ value }) => value === 'true' ? true : false)
    extraCharge?: boolean;

    @Expose({ groups: ['policyHolders'] as (keyof IParticipants)[] })
    @Transform(({value}: {value: boolean}) => {
        if(typeof value === 'boolean') return value;

        if (ParticipantModel.isFirstTransformation) {
            ParticipantModel.isFirstTransformation = false;
            return true;
        }
        return false;
    })
    isLeader?: boolean;
}

export default ParticipantModel;