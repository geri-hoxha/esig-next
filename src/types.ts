import { Dayjs } from "dayjs";

export interface BshCurrency {
    flagUrl: string;
    currencyCode: string;
    currencyName: string;
    currencyRate: number;
    changeInRate: number;
    lastUpdateDate: Dayjs;
}