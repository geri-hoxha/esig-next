"use client";
import _request from "@/request";
import { BshCurrency } from "@/types";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const token =
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpLWG5uUl90YkYtXzlPcHRFOHppaCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJnZXJpLmhveGhhQHVuaXFhLmFsIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5lc2lnLmFsLyIsInN1YiI6ImF1dGgwfDY1MzkwMGY3MTJkMGRhMTdmYTZmNTA1ZSIsImF1ZCI6WyJhcGkuZXNpZy5hbCIsImh0dHBzOi8vZXNpZy5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzE1MTU5MzQ4LCJleHAiOjE3MTUyNDU3NDgsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJ1OVM4Wmw1aEo3MnlEWXdzaGg2NktiaVhCRVVmN205MCIsInBlcm1pc3Npb25zIjpbImFnZW5jeTpyZWFkIiwiYXV0aDA6cmVhZCIsImJsb2NrZWQtb2JqZWN0czpyZWFkIiwiYnJhbmNoOnJlYWQiLCJjbGllbnRzOnJlYWQiLCJjb25maWd1cmF0aW9uczpyZWFkIiwiZmluYW5jZTpyZWFkIiwiaGVhbHRoL2RlcGFydG1lbnQtc2FsZXM6Y2FuY2VsIiwiaGVhbHRoL3JlcG9ydHM6Y2FuY2VsIiwiaGVhbHRoL3JlcG9ydHM6Y3JlYXRlIiwiaGVhbHRoL3JlcG9ydHM6cmVhZCIsImhlYWx0aC9yZXBvcnRzOnJlYWQtYWdlbmN5IiwiaGVhbHRoL3JlcG9ydHM6cmVhZC1icmFuY2giLCJoZWFsdGgvcmVwb3J0czp1cGRhdGUiLCJoZWFsdGgvc2FsZXM6YWRqdXN0LXByZW1pdW0iLCJoZWFsdGgvc2FsZXM6YnJhbmNoLXJlYWRBbGwiLCJoZWFsdGgvc2FsZXM6Y2FuY2VsIiwiaGVhbHRoL3NhbGVzOmNyZWF0ZSIsImhlYWx0aC9zYWxlczpjcmVhdGUtYW50aXR1bW9yIiwiaGVhbHRoL3NhbGVzOmNyZWF0ZS1oZWFsdGgtcGx1cyIsImhlYWx0aC9zYWxlczpjcmVhdGUtaGVhbHRoLXRyYXZlbCIsImhlYWx0aC9zYWxlczpjcmVhdGUtaGVhbHRoLXRyYXZlbC1lbWJhc3N5IiwiaGVhbHRoL3NhbGVzOmNyZWF0ZS1wcml2YXRlLWhlYWx0aCIsImhlYWx0aC9zYWxlczpyZWFkIiwiaGVhbHRoL3NhbGVzOnJlYWQtYWdlbmN5IiwiaGVhbHRoL3NhbGVzOnJlYWRBbGwiLCJoZWFsdGgvc2FsZXM6cmVhZC1icmFuY2giLCJoZWFsdGgvc2FsZXM6dXBkYXRlIiwiaG9zcGl0YWxzOnJlYWQiLCJpbnN1cmVyczpyZWFkIiwiaW50ZXJtZWRpYXJpZXM6cmVhZCIsImludm9pY2U6cmVhZCIsImludm9pY2U6cmVhZEFsbCIsImludm9pY2U6dW5saW1pdGVkVGltZS11cGRhdGUiLCJtYXJpbmUvcmVwb3J0czpjYW5jZWwiLCJtYXJpbmUvcmVwb3J0czpjcmVhdGUiLCJtYXJpbmUvcmVwb3J0czpyZWFkIiwibWFyaW5lL3JlcG9ydHM6cmVhZC1hZ2VuY3kiLCJtYXJpbmUvcmVwb3J0czpyZWFkLWJyYW5jaCIsIm1hcmluZS9yZXBvcnRzOnVwZGF0ZSIsIm1hcmluZS9zYWxlczpjYW5jZWwiLCJtYXJpbmUvc2FsZXM6Y3JlYXRlIiwibWFyaW5lL3NhbGVzOnJlYWQiLCJtYXJpbmUvc2FsZXM6cmVhZC1hZ2VuY3kiLCJtYXJpbmUvc2FsZXM6cmVhZC1icmFuY2giLCJtYXJpbmUvc2FsZXM6dXBkYXRlIiwibW90b3IvZGVwYXJ0bWVudC1zYWxlczpjYW5jZWwiLCJtb3Rvci9yZXBvcnRzOmNhbmNlbCIsIm1vdG9yL3JlcG9ydHM6Y3JlYXRlIiwibW90b3IvcmVwb3J0czpyZWFkIiwibW90b3IvcmVwb3J0czpyZWFkLWFnZW5jeSIsIm1vdG9yL3JlcG9ydHM6cmVhZC1icmFuY2giLCJtb3Rvci9yZXBvcnRzOnVwZGF0ZSIsIm1vdG9yL3NhbGVzOmJyYW5jaC1yZWFkQWxsIiwibW90b3Ivc2FsZXM6Y2FuY2VsIiwibW90b3Ivc2FsZXM6Y3JlYXRlIiwibW90b3Ivc2FsZXM6Y3JlYXRlLWJvcmRlciIsIm1vdG9yL3NhbGVzOmNyZWF0ZS1jYXNjbyIsIm1vdG9yL3NhbGVzOmNyZWF0ZS1taW5pY2FzY28iLCJtb3Rvci9zYWxlczpjcmVhdGUtcGFzc2VuZ2VyIiwibW90b3Ivc2FsZXM6Y3JlYXRlLXRwbCIsIm1vdG9yL3NhbGVzOnJlYWQiLCJtb3Rvci9zYWxlczpyZWFkLWFnZW5jeSIsIm1vdG9yL3NhbGVzOnJlYWRBbGwiLCJtb3Rvci9zYWxlczpyZWFkLWJyYW5jaCIsIm1vdG9yL3NhbGVzOnVwZGF0ZSIsInByb2R1Y3RzOnJlYWQiLCJwcm9kdWN0LXRlbXBsYXRlOnJlYWRBbGwiLCJwcm9wZXJ0eS9jb25maWd1cmF0aW9uczpiYW5rIiwicHJvcGVydHkvZGVwYXJ0bWVudC1zYWxlczpjYW5jZWwiLCJwcm9wZXJ0eS9yZXBvcnRzOmNhbmNlbCIsInByb3BlcnR5L3JlcG9ydHM6Y3JlYXRlIiwicHJvcGVydHkvcmVwb3J0czpyZWFkIiwicHJvcGVydHkvcmVwb3J0czpyZWFkLWFnZW5jeSIsInByb3BlcnR5L3JlcG9ydHM6cmVhZC1icmFuY2giLCJwcm9wZXJ0eS9yZXBvcnRzOnVwZGF0ZSIsInByb3BlcnR5L3NhbGVzOmNhbmNlbCIsInByb3BlcnR5L3NhbGVzOmNyZWF0ZSIsInByb3BlcnR5L3NhbGVzOmNyZWF0ZS1idWlsZGVybGlhYmlsaXR5NjUwIiwicHJvcGVydHkvc2FsZXM6Y3JlYXRlLWJ1aWxkZXJsaWFiaWxpdHk2OTMiLCJwcm9wZXJ0eS9zYWxlczpjcmVhdGUtZmlyZSIsInByb3BlcnR5L3NhbGVzOnJlYWQiLCJwcm9wZXJ0eS9zYWxlczpyZWFkLWFnZW5jeSIsInByb3BlcnR5L3NhbGVzOnJlYWRBbGwiLCJwcm9wZXJ0eS9zYWxlczpyZWFkLWJyYW5jaCIsInByb3BlcnR5L3NhbGVzOnVwZGF0ZSIsInNhbGVzOnNpZ2FsIiwidW5kZXJ3cml0ZXJzOnJlYWQiXX0.RoKKZQnroaHLh9-rnObc3Q65SaR1dNfAnokmpqYPDJhW7nFh3cxKZFc-8JyjIqTq_tlJwpknXoT7piNXaK8nvFYwCAnIkalKDHHwKBbl6NufxD92ouT0LK0ymgPsbKTEKdCwjV8Sn36_yliPZWm9Agfe8hMLVXl6ZMW_WhRQEPrNSy1bjtMqbKYTQOMXohy5X0qfTtmVjv9qoW8khU-SiO1M-WCyNzNzrsqMJiFwjQIVBRRHD1lmhaWkS-8e1kfMzgU-bLGdIwFpos-A1hylNpklePCKuj7b2HO13HpFmnpzRntBt4qYVstJ9M5Y7NlvDUXdl_exMJ4RykAiR_qRTg";

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
