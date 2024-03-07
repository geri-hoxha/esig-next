'use client'
import { token } from "@/components/esig/Navbar/Currencies";
import PdfViewer from "@/components/esig/PdfViewer";
import request from "@/request";
import { useEffect, useState } from "react";

const Preview: React.FC = () => {
  const [pdf, setPdf] = useState<string>("");

  useEffect(() => {
    getPolicyPreview();
  }, []);

  const getPolicyPreview = async () => {
    const response = await request(
      `/policystandard/print/dc56d580-4ba6-ee11-b9a3-00505692fbbd/false`,
      token,
      {
        method: "GET",
        responseType: "blob",
      },
      true
    );

    console.log(response)

 
      console.log(response)
    setPdf(response);
  };

  return (
    <div className="bg-esig-surface-20 rounded-3xl p-2 w-full h-full">
          {/* <PdfViewer url={pdf} /> */}

    </div>
  );
};

export default Preview;
