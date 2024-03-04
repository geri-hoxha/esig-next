import numeral from 'numeral';

function IsNullOrWhiteSpace(input: string) {
    return !input || !input.trim();
}

export const toCurrencyStandardFormatCurrency: (input: number, currency?: string, showDecimalPlaces?: boolean, currencyFirst?: boolean) => string = (
    input,
    currency = '',
    showDecimalPlaces = true,
    currencyFirst = false
) => {
    const format = '0,0' + (showDecimalPlaces ? '.00' : '');

    const formattedNumber = numeral(input).format(format);

    if (currencyFirst) {
        return IsNullOrWhiteSpace(currency) ? '' : `${currency} ` + formattedNumber;
    }

    return `${formattedNumber.toString()}${IsNullOrWhiteSpace(currency) ? '' : ' ' + currency}`;
};