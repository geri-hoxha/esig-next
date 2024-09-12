"use client";
import _request from "@/request";
import { BshCurrency } from "@/types";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const token =
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpLWG5uUl90YkYtXzlPcHRFOHppaCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJnZXJpLmhveGhhQHVuaXFhLmFsIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5lc2lnLmFsLyIsInN1YiI6ImF1dGgwfDY1MzkwMGY3MTJkMGRhMTdmYTZmNTA1ZSIsImF1ZCI6WyJhcGkuZXNpZy5hbCIsImh0dHBzOi8vZXNpZy5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzI2MTQzMTcxLCJleHAiOjE3MjYyMjk1NzEsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJ1OVM4Wmw1aEo3MnlEWXdzaGg2NktiaVhCRVVmN205MCIsInBlcm1pc3Npb25zIjpbImFnZW5jeTpyZWFkIiwiYWdlbnRDb25maWd1cmF0aW9uOmFudGl0dW1vckxpbWl0bGVzc1N0YXJ0RGF0ZSIsImFnZW50Q29uZmlndXJhdGlvbjpkdWJsaWNhdGVNb3RvclBvbGljaWVzIiwiYWdlbnRDb25maWd1cmF0aW9uOmxpZmVQbHVzTGltaXRsZXNzU3RhcnREYXRlIiwiYWdlbnRDb25maWd1cmF0aW9uOlByZW1pdW1BZGp1c3RtZW50QWNjZXNzIiwiYWdlbnRDb25maWd1cmF0aW9uOnN0YXJicm9rZXJEdXBsaWNhdGUiLCJhZ2VudENvbmZpZ3VyYXRpb246VFBMRm9yY2VTaWdhbEFzSW5zdXJlciIsImF1dGgwOnJlYWQiLCJibG9ja2VkLW9iamVjdHM6cmVhZCIsImJyYW5jaDpyZWFkIiwiY2xpZW50czpyZWFkIiwiY29uZmlndXJhdGlvbnM6cmVhZCIsImZpbmFuY2U6cmVhZCIsImhlYWx0aC9kZXBhcnRtZW50LXNhbGVzOmNhbmNlbCIsImhlYWx0aDpyZWluc3VyYW5jZS1leGNlbCIsImhlYWx0aC9yZXBvcnRzOmNhbmNlbCIsImhlYWx0aC9yZXBvcnRzOmNyZWF0ZSIsImhlYWx0aC9yZXBvcnRzOnJlYWQiLCJoZWFsdGgvcmVwb3J0czpyZWFkLWFnZW5jeSIsImhlYWx0aC9yZXBvcnRzOnJlYWQtYnJhbmNoIiwiaGVhbHRoL3JlcG9ydHM6dXBkYXRlIiwiaGVhbHRoL3NhbGVzOmFkanVzdC1wcmVtaXVtIiwiaGVhbHRoL3NhbGVzOmJyYW5jaC1yZWFkQWxsIiwiaGVhbHRoL3NhbGVzOmNhbmNlbCIsImhlYWx0aC9zYWxlczpjcmVhdGUiLCJoZWFsdGgvc2FsZXM6Y3JlYXRlLWFudGl0dW1vciIsImhlYWx0aC9zYWxlczpjcmVhdGUtaGVhbHRoLXBsdXMiLCJoZWFsdGgvc2FsZXM6Y3JlYXRlLWhlYWx0aC10cmF2ZWwiLCJoZWFsdGgvc2FsZXM6Y3JlYXRlLWhlYWx0aC10cmF2ZWwtZW1iYXNzeSIsImhlYWx0aC9zYWxlczpjcmVhdGUtcHJpdmF0ZS1oZWFsdGgiLCJoZWFsdGgvc2FsZXM6cmVhZCIsImhlYWx0aC9zYWxlczpyZWFkLWFnZW5jeSIsImhlYWx0aC9zYWxlczpyZWFkQWxsIiwiaGVhbHRoL3NhbGVzOnJlYWQtYnJhbmNoIiwiaGVhbHRoL3NhbGVzOnVwZGF0ZSIsImhvc3BpdGFsczpyZWFkIiwiaW5zdXJlcnM6cmVhZCIsImludGVybWVkaWFyaWVzOnJlYWQiLCJpbnZvaWNlOnJlYWQiLCJpbnZvaWNlOnJlYWRBbGwiLCJpbnZvaWNlOnVubGltaXRlZFRpbWUtdXBkYXRlIiwibWFyaW5lL3JlcG9ydHM6Y2FuY2VsIiwibWFyaW5lL3JlcG9ydHM6Y3JlYXRlIiwibWFyaW5lL3JlcG9ydHM6cmVhZCIsIm1hcmluZS9yZXBvcnRzOnJlYWQtYWdlbmN5IiwibWFyaW5lL3JlcG9ydHM6cmVhZC1icmFuY2giLCJtYXJpbmUvcmVwb3J0czp1cGRhdGUiLCJtYXJpbmUvc2FsZXM6Y2FuY2VsIiwibWFyaW5lL3NhbGVzOmNyZWF0ZSIsIm1hcmluZS9zYWxlczpyZWFkIiwibWFyaW5lL3NhbGVzOnJlYWQtYWdlbmN5IiwibWFyaW5lL3NhbGVzOnJlYWQtYnJhbmNoIiwibWFyaW5lL3NhbGVzOnVwZGF0ZSIsIm1vdG9yL2NvbmZpZ3VyYXRpb25zOnZlaGljbGVzIiwibW90b3IvZGVwYXJ0bWVudC1zYWxlczpjYW5jZWwiLCJtb3Rvci9kZXBhcnRtZW50LXNhbGVzOnJldHVybiIsIm1vdG9yL3JlcG9ydHM6Y2FuY2VsIiwibW90b3IvcmVwb3J0czpjcmVhdGUiLCJtb3Rvci9yZXBvcnRzOnJlYWQiLCJtb3Rvci9yZXBvcnRzOnJlYWQtYWdlbmN5IiwibW90b3IvcmVwb3J0czpyZWFkLWJyYW5jaCIsIm1vdG9yL3JlcG9ydHM6dXBkYXRlIiwibW90b3Ivc2FsZXM6YWdlbnRDb25maWd1cmF0aW9uIiwibW90b3Ivc2FsZXM6YXV0b3Nvcy11bmxpbWl0ZWQtcHJvZC15ZWFyIiwibW90b3Ivc2FsZXM6YnJhbmNoLXJlYWRBbGwiLCJtb3Rvci9zYWxlczpjYW5jZWwiLCJtb3Rvci9zYWxlczpjcmVhdGUiLCJtb3Rvci9zYWxlczpjcmVhdGUtYm9yZGVyIiwibW90b3Ivc2FsZXM6Y3JlYXRlLWNhc2NvIiwibW90b3Ivc2FsZXM6Y3JlYXRlLW1pbmljYXNjbyIsIm1vdG9yL3NhbGVzOmNyZWF0ZS1wYXNzZW5nZXIiLCJtb3Rvci9zYWxlczpjcmVhdGUtdHBsIiwibW90b3Ivc2FsZXM6cmVhZCIsIm1vdG9yL3NhbGVzOnJlYWQtYWdlbmN5IiwibW90b3Ivc2FsZXM6cmVhZEFsbCIsIm1vdG9yL3NhbGVzOnJlYWQtYnJhbmNoIiwibW90b3Ivc2FsZXM6cmV0dXJuIiwibW90b3Ivc2FsZXM6dXBkYXRlIiwicHJvZHVjdHM6cmVhZCIsInByb2R1Y3QtdGVtcGxhdGU6cmVhZEFsbCIsInByb3BlcnR5L2NvbmZpZ3VyYXRpb25zOmJhbmsiLCJwcm9wZXJ0eS9kZXBhcnRtZW50LXNhbGVzOmNhbmNlbCIsInByb3BlcnR5L3JlcG9ydHM6Y2FuY2VsIiwicHJvcGVydHkvcmVwb3J0czpjcmVhdGUiLCJwcm9wZXJ0eS9yZXBvcnRzOnJlYWQiLCJwcm9wZXJ0eS9yZXBvcnRzOnJlYWQtYWdlbmN5IiwicHJvcGVydHkvcmVwb3J0czpyZWFkLWJyYW5jaCIsInByb3BlcnR5L3JlcG9ydHM6dXBkYXRlIiwicHJvcGVydHkvc2FsZXM6Y2FuY2VsIiwicHJvcGVydHkvc2FsZXM6Y3JlYXRlIiwicHJvcGVydHkvc2FsZXM6Y3JlYXRlLWJ1aWxkZXJsaWFiaWxpdHk2NTAiLCJwcm9wZXJ0eS9zYWxlczpjcmVhdGUtYnVpbGRlcmxpYWJpbGl0eTY5MyIsInByb3BlcnR5L3NhbGVzOmNyZWF0ZS1maXJlIiwicHJvcGVydHkvc2FsZXM6cmVhZCIsInByb3BlcnR5L3NhbGVzOnJlYWQtYWdlbmN5IiwicHJvcGVydHkvc2FsZXM6cmVhZEFsbCIsInByb3BlcnR5L3NhbGVzOnJlYWQtYnJhbmNoIiwicHJvcGVydHkvc2FsZXM6dXBkYXRlIiwic2FsZXM6cmV0dXJuLXNldC1hZG1pbmlzdHJhdGlvbi1mZWUiLCJzYWxlczpyZXR1cm4tc2V0LWFnZW50LWNvbW1pc3Npb24iLCJzYWxlczpyZXR1cm4tc2V0LWJhbmstY29tbWlzc2lvbiIsInNhbGVzOnJldHVybi1zZXQtY29sbGVjdGVkLXByZW1pdW0iLCJzYWxlczpyZXR1cm4tc2V0LXVzYWdlLWZlZSIsInNhbGVzOnNpZ2FsIiwidW5kZXJ3cml0ZXJzOnJlYWQiXX0.Ikv6cFixonKAANzufPXY3IaEBpdfss1HfaYJ06Dt8UkbXTYziHsLfyr3grfjsW7ebRlWgmQuKFsDxaKA8ruqoZw1-QxoAiVlsx3ciZlodr7wQaAj8LaByxACeUwsyXMvVHyogn5gC5dv_APtPprVgH9NC1dlyLvhKKf-BSBKxWG8sJgu_5ZViL4tWEtliysJUWccsrduIqeGd5k3C9KWn4Gt0L0kIZL58m_LbQLbVBAhm-FTM2FHTpIBJUf1YSPezp86-sFzBYwqui0M-qBLP6NlfqAk09XbRs5OP4AK4aqONcSaeR4AjftfynYiEMvSJzVRuu3uOO3BKbMd-kaY_g";

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
