import { token } from "@/components/esig/Navbar/Currencies";
import request from "@/request";
import { useEffect, useState } from "react";

const Preview: React.FC = () => {
  const [pdf, setPdf] = useState<string>("");

  useEffect(() => {
    // getPolicyPreview();
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

    const url: string = URL.createObjectURL(await response.blob());

      
    setPdf(url +'#toolbar=0&navpanes=0'  );
  };

  return (
    <div className="bg-esig-surface-20 rounded-3xl w-full h-full p-10">
      <iframe src={pdf} allowFullScreen  className="w-full h-full" />
    </div>
  );
};

export default Preview;
