import { Dayjs } from "dayjs";

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

export interface PersonRequest {
    fathersName: string | null;
    birthday: Dayjs;
    genderType: string;
}

export interface OrganizationRequest {
    isActive: boolean;
    businessDescription: string | null;
    administrator: string | null;
    organizationLegalFormType: string | null;
    organizationBusinessSizeType: string | null;
    organizationOwnershipType: string | null;
    organizationSectorType: string | null;
}
export interface ComputeCustomerCommand_Request {
    taxNumber: string;
    isLocal: boolean;
    firstName: string;
    lastName: string | null;
    phoneNumber: string | null;
    email: string | null;
    address: Address;
    contactType: string;
    personData: PersonRequest | null;
    organizationData: OrganizationRequest | null;
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

export interface PolicyParticipantPolicyHolderRequest {
    ownershipPercentage: number;
    isLeader: boolean;
    customerId: string;
}

export interface PolicyParticipantBeneficiaryRequest {
    ownershipPercentage: number;
    customerId: string;
    customerModel: CustomerModel | null;
}

export interface PolicyParticipantPolicyUserRequest {
    customerId: string;
    extraCharge: boolean;
}

export interface PolicyParticipantInvoiceRecipientRequest {
    invoiceSplitPercentage: number;
    customerId: string;
}

export interface PolicyParticipantInsurerRequest {
    ownershipPercentage: number;
    isLeader: boolean;
    insurerId: string;
}

export interface BeginRequest {
    productId: string;
    metadata: { [key: string]: any; };
}


export interface PolicyItemInsuredObjectRequest<T = any> {
    id: string;
    objectType: string;
    object: T;
    objectValue: number;
}

export type ObjectType = 'Vehicle' | 'Property' | 'Person';

export interface LimitRecord {
    enabled: boolean;
    value: number | null;
    limitType: string | null;
    minValue: number | null;
    maxValue: number | null;
}

export interface PolicyItemCoverageRequest {
    premium: number;
    insuredAmount: number;
    franchiseLimit: LimitRecord | null;
    deductibleLimit: LimitRecord | null;
    eventLimit: LimitRecord | null;
    personLimit: LimitRecord | null;
    periodLimit: LimitRecord | null;
    productCoverageId: string;
}


export interface PolicyItemRequest {
    text: string;
    issuedDateUtc: Dayjs | null;
    startDateUtc: Dayjs;
    endDateUtc: Dayjs | null;
    productTemplateId: string;
    insuredObjects: PolicyItemInsuredObjectRequest[];
    coverages: PolicyItemCoverageRequest[];
    riskAddresses: Address[];
}

export interface PolicyRenewalRequest {
    index: number;
    startDateUtc: Dayjs;
    endDateUtc: Dayjs;
    premium: number;
    sumInsured: number;
}

export interface PolicyInstallmentRequest {
    installmentDateOffset: Dayjs;
    amount: number;
}

export interface IssueRequest extends BeginRequest {
    serial: string;
    text: string;
    currencyType: string;
    issueDateUtc: Dayjs;
    startDateUtc: Dayjs;
    endDateUtc: Dayjs | null;
    retroactiveDateUtc: Dayjs | null;
    durationId: string | null;
    bonusCommissionRate: number;
    agencyCommissionRate: number;
    intermediaryCommissionRate: number;
    adjustedPremium: number | null;
    agencyId: string;
    underwriterId: string | null;
    intermediaryId: string | null;
    items: PolicyItemRequest[];
    beneficiaries: PolicyParticipantBeneficiaryRequest[];
    insurers: PolicyParticipantInsurerRequest[];
    policyHolders: PolicyParticipantPolicyHolderRequest[];
    invoiceRecipients: PolicyParticipantInvoiceRecipientRequest[];
    policyUsers: PolicyParticipantPolicyUserRequest[];
    paymentType: string;
    distributionChannel: string;
    policyInstallments: PolicyInstallmentRequest[];
    policyRenewalRequests: PolicyRenewalRequest[];
}

export interface IUi {
    premium: number;
    loading: boolean;
    disabled: boolean;
    premiumMethod: () => Promise<void>
}

export interface SmartEnumOfCurrencyTypeAndString {
    name: string | null;
    value: string | null;
}
export interface BaseEnumOfCurrencyType extends SmartEnumOfCurrencyTypeAndString {
    text: string;
}

export interface ProductConfiguration extends BaseEntityModel {
    canSell: boolean;
    canCancel: boolean;
    canReturn: boolean;
    canDuplicate: boolean;
    canAdjustPremium: boolean;
    hasInstallments: boolean;
    hasRenewals: boolean;
    bonusCommissionRate: number;
    agencyCommissionRate: number;
    intermediaryCommissionRate: number;
    defaultStartDateUtcDiff: number;
    minStartDateUtcDiff: number;
    maxStartDateUtcDiff: number;
    defaultIssueDateUtcDiff: number;
    minIssueDateUtcDiff: number;
    maxIssueDateUtcDiff: number;
    minBeneficiaryCount: number;
    maxBeneficiaryCount: number;
    minPolicyHolderCount: number;
    maxPolicyHolderCount: number;
    minPolicyUserCount: number;
    maxPolicyUserCount: number;
    minInsurerCount: number;
    maxInsurerCount: number;
    minInvoiceRecipientCount: number;
    maxInvoiceRecipientCount: number;
    currencyTypesAllowed: BaseEnumOfCurrencyType[];
    paymentTypesAllowed: BaseEnumOfCurrencyType[];
    distributionChannelTypesAllowed: BaseEnumOfCurrencyType[];
    waitingPeriodTypeAllowed: BaseEnumOfCurrencyType[];
    riskAddressTypesAllowed: BaseEnumOfCurrencyType[];
    //
    productId: string;
    productTemplateId: string | null;
    agencyId: string | null;
    // for front-end
    isSelling: boolean;
  }