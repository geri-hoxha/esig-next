"use client";
import _request from "@/request";
import { BshCurrency } from "@/types";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const token =
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpLWG5uUl90YkYtXzlPcHRFOHppaCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJnZXJpLmhveGhhQHVuaXFhLmFsIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5lc2lnLmFsLyIsInN1YiI6ImF1dGgwfDY1MzkwMGY3MTJkMGRhMTdmYTZmNTA1ZSIsImF1ZCI6WyJhcGkuZXNpZy5hbCIsImh0dHBzOi8vZXNpZy5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzE3MDcwMDg5LCJleHAiOjE3MTcxNTY0ODksInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJ1OVM4Wmw1aEo3MnlEWXdzaGg2NktiaVhCRVVmN205MCIsInBlcm1pc3Npb25zIjpbImFnZW5jeTpyZWFkIiwiYXV0aDA6cmVhZCIsImJsb2NrZWQtb2JqZWN0czpyZWFkIiwiYnJhbmNoOnJlYWQiLCJjbGllbnRzOnJlYWQiLCJjb25maWd1cmF0aW9uczpyZWFkIiwiZmluYW5jZTpyZWFkIiwiaGVhbHRoL2RlcGFydG1lbnQtc2FsZXM6Y2FuY2VsIiwiaGVhbHRoOnJlaW5zdXJhbmNlLWV4Y2VsIiwiaGVhbHRoL3JlcG9ydHM6Y2FuY2VsIiwiaGVhbHRoL3JlcG9ydHM6Y3JlYXRlIiwiaGVhbHRoL3JlcG9ydHM6cmVhZCIsImhlYWx0aC9yZXBvcnRzOnJlYWQtYWdlbmN5IiwiaGVhbHRoL3JlcG9ydHM6cmVhZC1icmFuY2giLCJoZWFsdGgvcmVwb3J0czp1cGRhdGUiLCJoZWFsdGgvc2FsZXM6YWRqdXN0LXByZW1pdW0iLCJoZWFsdGgvc2FsZXM6YnJhbmNoLXJlYWRBbGwiLCJoZWFsdGgvc2FsZXM6Y2FuY2VsIiwiaGVhbHRoL3NhbGVzOmNyZWF0ZSIsImhlYWx0aC9zYWxlczpjcmVhdGUtYW50aXR1bW9yIiwiaGVhbHRoL3NhbGVzOmNyZWF0ZS1oZWFsdGgtcGx1cyIsImhlYWx0aC9zYWxlczpjcmVhdGUtaGVhbHRoLXRyYXZlbCIsImhlYWx0aC9zYWxlczpjcmVhdGUtaGVhbHRoLXRyYXZlbC1lbWJhc3N5IiwiaGVhbHRoL3NhbGVzOmNyZWF0ZS1wcml2YXRlLWhlYWx0aCIsImhlYWx0aC9zYWxlczpyZWFkIiwiaGVhbHRoL3NhbGVzOnJlYWQtYWdlbmN5IiwiaGVhbHRoL3NhbGVzOnJlYWRBbGwiLCJoZWFsdGgvc2FsZXM6cmVhZC1icmFuY2giLCJoZWFsdGgvc2FsZXM6dXBkYXRlIiwiaG9zcGl0YWxzOnJlYWQiLCJpbnN1cmVyczpyZWFkIiwiaW50ZXJtZWRpYXJpZXM6cmVhZCIsImludm9pY2U6cmVhZCIsImludm9pY2U6cmVhZEFsbCIsImludm9pY2U6dW5saW1pdGVkVGltZS11cGRhdGUiLCJtYXJpbmUvcmVwb3J0czpjYW5jZWwiLCJtYXJpbmUvcmVwb3J0czpjcmVhdGUiLCJtYXJpbmUvcmVwb3J0czpyZWFkIiwibWFyaW5lL3JlcG9ydHM6cmVhZC1hZ2VuY3kiLCJtYXJpbmUvcmVwb3J0czpyZWFkLWJyYW5jaCIsIm1hcmluZS9yZXBvcnRzOnVwZGF0ZSIsIm1hcmluZS9zYWxlczpjYW5jZWwiLCJtYXJpbmUvc2FsZXM6Y3JlYXRlIiwibWFyaW5lL3NhbGVzOnJlYWQiLCJtYXJpbmUvc2FsZXM6cmVhZC1hZ2VuY3kiLCJtYXJpbmUvc2FsZXM6cmVhZC1icmFuY2giLCJtYXJpbmUvc2FsZXM6dXBkYXRlIiwibW90b3IvY29uZmlndXJhdGlvbnM6dmVoaWNsZXMiLCJtb3Rvci9kZXBhcnRtZW50LXNhbGVzOmNhbmNlbCIsIm1vdG9yL3JlcG9ydHM6Y2FuY2VsIiwibW90b3IvcmVwb3J0czpjcmVhdGUiLCJtb3Rvci9yZXBvcnRzOnJlYWQiLCJtb3Rvci9yZXBvcnRzOnJlYWQtYWdlbmN5IiwibW90b3IvcmVwb3J0czpyZWFkLWJyYW5jaCIsIm1vdG9yL3JlcG9ydHM6dXBkYXRlIiwibW90b3Ivc2FsZXM6YXV0b3Nvcy11bmxpbWl0ZWQtcHJvZC15ZWFyIiwibW90b3Ivc2FsZXM6YnJhbmNoLXJlYWRBbGwiLCJtb3Rvci9zYWxlczpjYW5jZWwiLCJtb3Rvci9zYWxlczpjcmVhdGUiLCJtb3Rvci9zYWxlczpjcmVhdGUtYm9yZGVyIiwibW90b3Ivc2FsZXM6Y3JlYXRlLWNhc2NvIiwibW90b3Ivc2FsZXM6Y3JlYXRlLW1pbmljYXNjbyIsIm1vdG9yL3NhbGVzOmNyZWF0ZS1wYXNzZW5nZXIiLCJtb3Rvci9zYWxlczpjcmVhdGUtdHBsIiwibW90b3Ivc2FsZXM6cmVhZCIsIm1vdG9yL3NhbGVzOnJlYWQtYWdlbmN5IiwibW90b3Ivc2FsZXM6cmVhZEFsbCIsIm1vdG9yL3NhbGVzOnJlYWQtYnJhbmNoIiwibW90b3Ivc2FsZXM6dXBkYXRlIiwicHJvZHVjdHM6cmVhZCIsInByb2R1Y3QtdGVtcGxhdGU6cmVhZEFsbCIsInByb3BlcnR5L2NvbmZpZ3VyYXRpb25zOmJhbmsiLCJwcm9wZXJ0eS9kZXBhcnRtZW50LXNhbGVzOmNhbmNlbCIsInByb3BlcnR5L3JlcG9ydHM6Y2FuY2VsIiwicHJvcGVydHkvcmVwb3J0czpjcmVhdGUiLCJwcm9wZXJ0eS9yZXBvcnRzOnJlYWQiLCJwcm9wZXJ0eS9yZXBvcnRzOnJlYWQtYWdlbmN5IiwicHJvcGVydHkvcmVwb3J0czpyZWFkLWJyYW5jaCIsInByb3BlcnR5L3JlcG9ydHM6dXBkYXRlIiwicHJvcGVydHkvc2FsZXM6Y2FuY2VsIiwicHJvcGVydHkvc2FsZXM6Y3JlYXRlIiwicHJvcGVydHkvc2FsZXM6Y3JlYXRlLWJ1aWxkZXJsaWFiaWxpdHk2NTAiLCJwcm9wZXJ0eS9zYWxlczpjcmVhdGUtYnVpbGRlcmxpYWJpbGl0eTY5MyIsInByb3BlcnR5L3NhbGVzOmNyZWF0ZS1maXJlIiwicHJvcGVydHkvc2FsZXM6cmVhZCIsInByb3BlcnR5L3NhbGVzOnJlYWQtYWdlbmN5IiwicHJvcGVydHkvc2FsZXM6cmVhZEFsbCIsInByb3BlcnR5L3NhbGVzOnJlYWQtYnJhbmNoIiwicHJvcGVydHkvc2FsZXM6dXBkYXRlIiwic2FsZXM6c2lnYWwiLCJ1bmRlcndyaXRlcnM6cmVhZCJdfQ.UM0pa89Ro6a57sqBJBgL8DzR5S6ZZP2ItAMgSXsdaJ5iPisAPf1wdYqXWpeVkU2Jy9PrXCDTQOaZ5pM09P-pG4e4Q6L1xtyeZ3lU2VlNv8clfg1SZDsC11H59nZme18T9bB9aojjuSnmXLsqj85B-nrgiM5Eo3qX5PUWk-rEhm6OP6M5yOg8MuZzF-v24xETEnXZYgLTr4aNjfai4qiM48hygvOltUppEGrPeO_PoUe6htzPRv_LraHcejkYQDdBlYPrKmdmcARoMNPxr84uLR_TmVpj9aM0IJWPAtP2c5oCqBxcTe1tZm6Vammo5m6b8DSjg4anflYs-6YJmpkSQA";

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await _request("/currency/rates", token);
    setCurrencies(response.data?.splice(0, 3));
  };

  return (
    <div className="hidden lg:flex items-center gap-8">
      {currencies.map((currency: BshCurrency, index: number) => {
        return (
          <div key={index} className="flex items-center">
            <Image
              src={currency.flagUrl}
              alt="Flag"
              width={27}
              height={20}
              style={{ width: 27, height: 20 }}
              priority
            />
            <span className="px-1 text-gray-600 font-bold	text-sm">
              {currency.currencyCode}
            </span>
            {currency.changeInRate >= 0 ? (
              <TrendingUp
                className="text-esig-success"
                size={24}
                strokeWidth={2}
              />
            ) : (
              <TrendingDown
                className="text-esig-error"
                size={24}
                strokeWidth={2}
              />
            )}
            <span className="px-2 text-gray-600 font-bold	text-sm">
              {currency.currencyRate.toFixed(2)}
            </span>
            <span
              className={`font-bold ${
                currency.changeInRate >= 0
                  ? `text-esig-success`
                  : `text-esig-error`
              }`}
            >
              {((currency.changeInRate / currency.currencyRate) * 100).toFixed(
                2
              ) ?? 0}
              %
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default Currencies;
