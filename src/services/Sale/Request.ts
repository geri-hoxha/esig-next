import { Dayjs } from "dayjs";
import { IPolicyRequest } from "./types";

class PolicyRequest {
    private policyRequest: IPolicyRequest;

    constructor() {
        // @ts-ignore
        this.policyRequest = null;
    }

    public setSerial(serial: string) {
        this.policyRequest.serial = serial;
    }

    public setInsuranceSectorType(insuranceSectorType: string) {
        this.policyRequest.insuranceSectorType = insuranceSectorType;
    }

    public setText(serial: string) {
        this.policyRequest.serial = serial;
    }

    public setCurrencyType(currencyType: string) {
        this.policyRequest.currencyType = currencyType;
    }

    public setVatDateUtc(vatDateUtc: Dayjs) {
        this.policyRequest.vatDateUtc = vatDateUtc;
    }

    public setStartDateUtc(startDateUtc: Dayjs) {
        this.policyRequest.startDateUtc = startDateUtc;
    }

    public setEndDateUtc(endDateUtc: Dayjs) {
        this.policyRequest.endDateUtc = endDateUtc;
    }

    public setDurationId(durationId: string) {
        this.policyRequest.durationId = durationId;
    }

    public setBonusCommissionRate(bonusCommissionRate: number) {
        this.policyRequest.bonusCommissionRate = bonusCommissionRate;
    }

    public setAgencyCommissionRate(agencyCommissionRate: number) {
        this.policyRequest.agencyCommissionRate = agencyCommissionRate;
    }

    public setIntermediaryCommissionRate(intermediaryCommissionRate: number) {
        this.policyRequest.intermediaryCommissionRate = intermediaryCommissionRate;
    }

    public setAdjustedPremium(adjustedPremium: number | null) {
        this.policyRequest.adjustedPremium = adjustedPremium;
    }

    public setAgencyId(agencyId: string | null) {
        this.policyRequest.agencyId = agencyId;
    }

    public setUnderwriterId(underwriterId: string | null) {
        this.policyRequest.underwriterId = underwriterId;
    }

    public setIntermediaryId(intermediaryId: string | null) {
        this.policyRequest.intermediaryId = intermediaryId;
    }

    public setProductId(productId: string) {
        this.policyRequest.productId = productId;
    }

    public setItems(items: any[]) {
        // todo
        this.policyRequest.items = items;
    }

    public setBeneficiaries(beneficiaries: any[]) {
        // todo
        this.policyRequest.beneficiaries = beneficiaries;
    }

    public setInsurers(insurers: any[]) {
        // todo
        this.policyRequest.insurers = insurers;
    }

    public setPolicyHolders(policyHolders: any[]) {
        // todo
        this.policyRequest.policyHolders = policyHolders;
    }

    public setPolicyUsers(policyUsers: any[]) {
        // todo
        this.policyRequest.policyUsers = policyUsers;
    }

    public setPaymentType(paymentType: string) {
        this.policyRequest.paymentType = paymentType;
    }

    public setMetadata(metadata: string | null) {
        this.policyRequest.metadata = metadata;
    }
}

export default PolicyRequest;