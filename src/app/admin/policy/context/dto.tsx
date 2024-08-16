import { Exclude, Expose, Transform, Type, plainToClass } from 'class-transformer';
import PolicyUsers from './PolicyUser';
import { IParticipants } from '../context';

class PolicyItemModel {
 
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


    

    {
        "text": "",
        "productTemplateId": "00000000-29d0-46eb-9944-7795a5fdec40",
        "issuedDateUtc": "2024-08-16T14:52:03.131Z",
        "startDateUtc": "2024-08-16T14:34:48.588Z",
        "endDateUtc": "2025-08-15T14:34:48.588Z",
        "insuredObjects": [
          {
            "id": "293dbc3f-4303-2930-8c7b-d3da26be84dd",
            "objectType": "Vehicle",
            "object": {
              "vin": "1VWAN7A3XEC115537",
              "plate": "AB822AA",
              "region": "SARANDE",
              "type": "AUTOVETURE",
              "make": "VOLKSWAGEN",
              "model": "PASSAT",
              "fuel": "NAFTE",
              "volume": 1968,
              "motorPower": 103,
              "productionYear": 2014,
              "maxAuthorizedCapacity": 2110,
              "seats": 5,
              "ownerTaxNumber": "H80417048U",
              "color": "GRI E ERRET",
              "reportTime": "2024-08-16 16:18:18.0",
              "internalCategoryTpl": "B1",
              "internalClassificationTpl": "B1/2.1",
              "classificationTpl": "B1/2",
              "classificationBorder": "",
              "ownerCustomerId": null,
              "ownerDrivingPermitNo": "0000000312244",
              "ownerFirstName": "ALTIN",
              "ownerFathersName": "NURI",
              "ownerLastName": "GJINIKA",
              "ownerGender": "M",
              "ownerBirthday": "1978-04-17",
              "ownerType": "F"
            },
            "objectValue": 32423
          }
        ],
        "coverages": [
          
        ],
        "riskAddresses": [
          {
            "country": "ALBANIA / SHQIPERIA"
          }
        ]
      }
}

export default PolicyItemModel;