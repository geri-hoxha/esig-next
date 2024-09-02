"use client";
import _request from "@/request";
import { BshCurrency } from "@/types";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const token =
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpLWG5uUl90YkYtXzlPcHRFOHppaCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJnZXJpLmhveGhhQHVuaXFhLmFsIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5lc2lnLmFsLyIsInN1YiI6ImF1dGgwfDY1MzkwMGY3MTJkMGRhMTdmYTZmNTA1ZSIsImF1ZCI6WyJhcGkuZXNpZy5hbCIsImh0dHBzOi8vZXNpZy5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzI1MTE5MDY1LCJleHAiOjE3MjUyMDU0NjUsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJ1OVM4Wmw1aEo3MnlEWXdzaGg2NktiaVhCRVVmN205MCIsInBlcm1pc3Npb25zIjpbImFnZW5jeTpyZWFkIiwiYXV0aDA6cmVhZCIsImJsb2NrZWQtb2JqZWN0czpyZWFkIiwiYnJhbmNoOnJlYWQiLCJjbGllbnRzOnJlYWQiLCJjb25maWd1cmF0aW9uczpyZWFkIiwiZmluYW5jZTpyZWFkIiwiaGVhbHRoL2RlcGFydG1lbnQtc2FsZXM6Y2FuY2VsIiwiaGVhbHRoOnJlaW5zdXJhbmNlLWV4Y2VsIiwiaGVhbHRoL3JlcG9ydHM6Y2FuY2VsIiwiaGVhbHRoL3JlcG9ydHM6Y3JlYXRlIiwiaGVhbHRoL3JlcG9ydHM6cmVhZCIsImhlYWx0aC9yZXBvcnRzOnJlYWQtYWdlbmN5IiwiaGVhbHRoL3JlcG9ydHM6cmVhZC1icmFuY2giLCJoZWFsdGgvcmVwb3J0czp1cGRhdGUiLCJoZWFsdGgvc2FsZXM6YWRqdXN0LXByZW1pdW0iLCJoZWFsdGgvc2FsZXM6YnJhbmNoLXJlYWRBbGwiLCJoZWFsdGgvc2FsZXM6Y2FuY2VsIiwiaGVhbHRoL3NhbGVzOmNyZWF0ZSIsImhlYWx0aC9zYWxlczpjcmVhdGUtYW50aXR1bW9yIiwiaGVhbHRoL3NhbGVzOmNyZWF0ZS1oZWFsdGgtcGx1cyIsImhlYWx0aC9zYWxlczpjcmVhdGUtaGVhbHRoLXRyYXZlbCIsImhlYWx0aC9zYWxlczpjcmVhdGUtaGVhbHRoLXRyYXZlbC1lbWJhc3N5IiwiaGVhbHRoL3NhbGVzOmNyZWF0ZS1wcml2YXRlLWhlYWx0aCIsImhlYWx0aC9zYWxlczpyZWFkIiwiaGVhbHRoL3NhbGVzOnJlYWQtYWdlbmN5IiwiaGVhbHRoL3NhbGVzOnJlYWRBbGwiLCJoZWFsdGgvc2FsZXM6cmVhZC1icmFuY2giLCJoZWFsdGgvc2FsZXM6dXBkYXRlIiwiaG9zcGl0YWxzOnJlYWQiLCJpbnN1cmVyczpyZWFkIiwiaW50ZXJtZWRpYXJpZXM6cmVhZCIsImludm9pY2U6cmVhZCIsImludm9pY2U6cmVhZEFsbCIsImludm9pY2U6dW5saW1pdGVkVGltZS11cGRhdGUiLCJtYXJpbmUvcmVwb3J0czpjYW5jZWwiLCJtYXJpbmUvcmVwb3J0czpjcmVhdGUiLCJtYXJpbmUvcmVwb3J0czpyZWFkIiwibWFyaW5lL3JlcG9ydHM6cmVhZC1hZ2VuY3kiLCJtYXJpbmUvcmVwb3J0czpyZWFkLWJyYW5jaCIsIm1hcmluZS9yZXBvcnRzOnVwZGF0ZSIsIm1hcmluZS9zYWxlczpjYW5jZWwiLCJtYXJpbmUvc2FsZXM6Y3JlYXRlIiwibWFyaW5lL3NhbGVzOnJlYWQiLCJtYXJpbmUvc2FsZXM6cmVhZC1hZ2VuY3kiLCJtYXJpbmUvc2FsZXM6cmVhZC1icmFuY2giLCJtYXJpbmUvc2FsZXM6dXBkYXRlIiwibW90b3IvY29uZmlndXJhdGlvbnM6dmVoaWNsZXMiLCJtb3Rvci9kZXBhcnRtZW50LXNhbGVzOmNhbmNlbCIsIm1vdG9yL2RlcGFydG1lbnQtc2FsZXM6cmV0dXJuIiwibW90b3IvcmVwb3J0czpjYW5jZWwiLCJtb3Rvci9yZXBvcnRzOmNyZWF0ZSIsIm1vdG9yL3JlcG9ydHM6cmVhZCIsIm1vdG9yL3JlcG9ydHM6cmVhZC1hZ2VuY3kiLCJtb3Rvci9yZXBvcnRzOnJlYWQtYnJhbmNoIiwibW90b3IvcmVwb3J0czp1cGRhdGUiLCJtb3Rvci9zYWxlczphZ2VudENvbmZpZ3VyYXRpb24iLCJtb3Rvci9zYWxlczphdXRvc29zLXVubGltaXRlZC1wcm9kLXllYXIiLCJtb3Rvci9zYWxlczpicmFuY2gtcmVhZEFsbCIsIm1vdG9yL3NhbGVzOmNhbmNlbCIsIm1vdG9yL3NhbGVzOmNyZWF0ZSIsIm1vdG9yL3NhbGVzOmNyZWF0ZS1ib3JkZXIiLCJtb3Rvci9zYWxlczpjcmVhdGUtY2FzY28iLCJtb3Rvci9zYWxlczpjcmVhdGUtbWluaWNhc2NvIiwibW90b3Ivc2FsZXM6Y3JlYXRlLXBhc3NlbmdlciIsIm1vdG9yL3NhbGVzOmNyZWF0ZS10cGwiLCJtb3Rvci9zYWxlczpyZWFkIiwibW90b3Ivc2FsZXM6cmVhZC1hZ2VuY3kiLCJtb3Rvci9zYWxlczpyZWFkQWxsIiwibW90b3Ivc2FsZXM6cmVhZC1icmFuY2giLCJtb3Rvci9zYWxlczpyZXR1cm4iLCJtb3Rvci9zYWxlczp1cGRhdGUiLCJwcm9kdWN0czpyZWFkIiwicHJvZHVjdC10ZW1wbGF0ZTpyZWFkQWxsIiwicHJvcGVydHkvY29uZmlndXJhdGlvbnM6YmFuayIsInByb3BlcnR5L2RlcGFydG1lbnQtc2FsZXM6Y2FuY2VsIiwicHJvcGVydHkvcmVwb3J0czpjYW5jZWwiLCJwcm9wZXJ0eS9yZXBvcnRzOmNyZWF0ZSIsInByb3BlcnR5L3JlcG9ydHM6cmVhZCIsInByb3BlcnR5L3JlcG9ydHM6cmVhZC1hZ2VuY3kiLCJwcm9wZXJ0eS9yZXBvcnRzOnJlYWQtYnJhbmNoIiwicHJvcGVydHkvcmVwb3J0czp1cGRhdGUiLCJwcm9wZXJ0eS9zYWxlczpjYW5jZWwiLCJwcm9wZXJ0eS9zYWxlczpjcmVhdGUiLCJwcm9wZXJ0eS9zYWxlczpjcmVhdGUtYnVpbGRlcmxpYWJpbGl0eTY1MCIsInByb3BlcnR5L3NhbGVzOmNyZWF0ZS1idWlsZGVybGlhYmlsaXR5NjkzIiwicHJvcGVydHkvc2FsZXM6Y3JlYXRlLWZpcmUiLCJwcm9wZXJ0eS9zYWxlczpyZWFkIiwicHJvcGVydHkvc2FsZXM6cmVhZC1hZ2VuY3kiLCJwcm9wZXJ0eS9zYWxlczpyZWFkQWxsIiwicHJvcGVydHkvc2FsZXM6cmVhZC1icmFuY2giLCJwcm9wZXJ0eS9zYWxlczp1cGRhdGUiLCJzYWxlczpyZXR1cm4tc2V0LWFkbWluaXN0cmF0aW9uLWZlZSIsInNhbGVzOnJldHVybi1zZXQtYWdlbnQtY29tbWlzc2lvbiIsInNhbGVzOnJldHVybi1zZXQtYmFuay1jb21taXNzaW9uIiwic2FsZXM6cmV0dXJuLXNldC1jb2xsZWN0ZWQtcHJlbWl1bSIsInNhbGVzOnJldHVybi1zZXQtdXNhZ2UtZmVlIiwic2FsZXM6c2lnYWwiLCJ1bmRlcndyaXRlcnM6cmVhZCJdfQ.bpZeDlVjt21QAqq7BvmeWvRFuMp9-FVQ6VotGqIf2-BLyPuW7JxrG3Gg8JPod7VXjwDwC7lEPTkMJfybvBI3hHwCmPmKKOcxXz34Befmsi3RoLk9ZpeGc8AKJj1EJMM8CC6rZOvVHp6_-Z8If6CMTBFR1ANSFs8Wkx1OCD-WzmaN7CME3AQY0yejPYcaDUX-hhIyoFzbkQfzmtDjIYv_SOjm1blzIHUb6zGI-dHpH9IXdWXpXyfASBn6qjFnHElJcTG1TFgHDI7dlMOBdwAbIQd4zKctZzn18DgtbdhHdmsSKF37FfmMmdDrL_l0sqKh31XL0wTPWwFhZuF3xlTdkQ";

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
