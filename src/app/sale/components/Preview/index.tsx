import Modal from "@/components/esig/Modal";
import { token } from "@/components/esig/Navbar/Currencies";
import request from "@/request";
import Image from "next/image";
import { useEffect, useState } from "react";

const Preview: React.FC = ({ zoomIn, setZoomInHandler }) => {
  const [pdf, setPdf] = useState<string>("");
  const [x, setx] = useState<boolean>(false);

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

    const url: string = URL.createObjectURL(await response.blob());

    setPdf(url + "#toolbar=0&navpanes=0");
  };

  if (zoomIn) {
    return (
      <div className="relative ">
        <iframe
          src={pdf}
          key={"1"}
          allowFullScreen
          className="w-full h-[80vh]"
        />

        <div
          onClick={() => setZoomInHandler()}
          className="absolute -top-16 left-1/2 transform hover:bg-red-50 -translate-x-1/2  bg-white p-1 border-2 border-esig-error cursor-pointer rounded-lg  px-2 "
        >
          <div className="flex items-center gap-x-1">
            <Image
              className="cursor-pointer"
              src="/svg/close.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span className="text-esig-error font-semibold">Mbyll</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative ">
      <iframe src={pdf} key={"2"} allowFullScreen className="w-full min-h-96" />
      <div className="bg-black/30 top-0 left-0 w-full h-full absolute"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-xl">
        <button
          onClick={() => {
            setZoomInHandler();
          }}
          className="ml-auto w-max px-4 py-2 cursor-pointer text-sm rounded-md  ring-2 ring-offset-2 ring-esig  shadow-xl bg-esig  text-white font-semibold transition-all duration-100"
        >
          <div className="flex items-center gap-x-2">
            <span>Zmadho</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Preview;
