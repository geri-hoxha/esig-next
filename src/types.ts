import { Dayjs } from "dayjs";

export interface BshCurrency {
    flagUrl: string;
    currencyCode: string;
    currencyName: string;
    currencyRate: number;
    changeInRate: number;
    lastUpdateDate: Dayjs;
}

export interface PolicyParticipantInsurerRequest {
    ownershipPercentage: number;
    isLeader: boolean;
    insurerId: string;
}

export interface PolicyParticipantPolicyHolderRequest {
    ownershipPercentage: number;
    isLeader: boolean;
    customerId: string;
}

export interface PolicyParticipantPolicyUserRequest {
    customerId: string;
    extraCharge: boolean;
}

export interface PolicyParticipantBeneficiaryRequest {
    ownershipPercentage: number;
    customerId: string;
    customerModel: CustomerModel | null;
}

export interface PolicyParticipantInvoiceRecipientRequest {
    invoiceSplitPercentage: number;
    customerId: string;
}

export interface CustomerModel extends BaseEntityModel {
    taxNumber: string;
    isLocal: boolean;
    displayName: string;
    reportName: string;
    searchName: string;
    contactType: string;
    phoneNumber: string | null;
    email: string | null;
    address: Address;
    fathersName: string | null;
    birthday: Dayjs | null;
    genderType: string | null;
    isActive: boolean | null;
    businessDescription: string | null;
    administrator: string | null;
    organizationLegalFormType: string | null;
    organizationBusinessSizeType: string | null;
    organizationOwnershipType: string | null;
    organizationSectorType: string | null;
}

export interface BaseEntityModel {
    id: string;
    isSystemEntity: boolean;
    createdOnUtc: Dayjs;
    updatedOnUtc: Dayjs | null;
    createdBy: string;
    updatedBy: string | null;
    iosaId: number | null;
}

export interface Address {
    country: string;
    city?: string | null;
    postalCode?: string | null;
    streetAddress?: string | null;
    streetAddress2?: string | null;
    latitude?: number | null;
    longitude?: number | null;
}