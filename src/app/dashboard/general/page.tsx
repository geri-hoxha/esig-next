import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ChartExample from "../components/Charts";
import DashboardCard from "../components/DashboardCard";

export interface ICard {
  title: string;
  description: string;
}

const cards: ICard[] = [
  {
    title: "Shitje & Rinovime",
    description:
      "Mësoni si të përdorni ESIG për të shitur dhe si dhe të menaxhoni policat pas shitjes.",
  },
  {
    title: "Dëme",
    description:
      "Ju duhet ndihmë për të krijuar, monitoruar, apo menaxhuar praktika dëmesh?",
  },
  {
    title: "Kontaktoni me suportin",
    description:
      "Nëse asnjë nga artikujt e dokumentimit nuk ju ndihmon, kontaktoni me suportin teknik.",
  },
];

export default function General() {
  return (
    <div className="flex flex-col">
      <Card className=" p-0 bg-esig-surface-30 mb-2">
        <CardHeader className="p-4 md:p-6 pb-0 md:pb-0">
          <div className="grid grid-cols-6 gap-x-4">
            <div className="flex flex-col col-span-6 md:col-span-4">
              <CardTitle className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage
                    src="https://i2.wp.com/cdn.auth0.com/avatars/ge.png?ssl=1"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xl">Geri Hoxha</span>
              </CardTitle>
              <CardDescription className="pt-3 text-center md:text-left">
                Mirë se erdhe në ESIG! Më poshtë do të gjeni ndihmë se si të
                përdorni programin për të përfituar sa më shumë prej tij.
              </CardDescription>
            </div>
            <Image
              src="/logo-esig-black.svg"
              alt="logo"
              width={"0"}
              height={"0"}
              style={{ width: 150, height: 80, marginLeft: "40px" }}
              priority
              className="hidden md:block"
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-y-3 md:gap-y-0 gap-x-5">
          {cards.map((card, index) => {
            return <DashboardCard key={index} card={card} index={index} />;
          })}
        </CardContent>
      </Card>
      <ChartExample />
    </div>
  );
}
