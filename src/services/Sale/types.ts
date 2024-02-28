import dayjs from "dayjs";

export interface IPolicyRequest {
    serial: string;
    insuranceSectorType: string;
    text: string;
    currencyType: string;
    vatDateUtc: dayjs.Dayjs | null;
    startDateUtc: dayjs.Dayjs;
    endDateUtc: dayjs.Dayjs | null;
    durationId: string | null;
    bonusCommissionRate: number;
    agencyCommissionRate: number;
    intermediaryCommissionRate: number;
    adjustedPremium: number | null;
    agencyId: string | null;
    underwriterId: string | null;
    intermediaryId: string | null;
    productId: string;
    items: any[];
    beneficiaries: any[];
    insurers: any[];
    policyHolders: any[];
    policyUsers: any[];
    paymentType: string;
    metadata: string | null;
}