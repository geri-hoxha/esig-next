import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import ChartExample from "./components/Charts";

interface ICard {
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

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <Card className=" p-0 bg-esig-surface-30 mb-2">
        <CardHeader>
          <div className="  grid grid-cols-6 gap-x-4">
            <div className="flex flex-col col-span-4">
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
              <CardDescription className="pt-3">
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
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-x-5">
          {cards.map((card, index) => {
            return (
              <Card key={index} className="w-100 md:w-1/3">
                <CardHeader className="pt-3 pb-2">
                  <CardTitle className="flex items-center gap-x-3 text-base">
                    {" "}
                    <Badge className="w-8 h-8 text-base rounded-md">1</Badge>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex pb-0">
                  <span className="text-sm">{card.description}</span>
                </CardContent>
                <CardFooter className="flex pl-2 pb-2">
                  <Button variant="link" className="text-esig-sapphire w-auto">
                    Lexo me shume <ExternalLink className="pl-1.5" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </CardContent>
      </Card>
      <ChartExample />
    </div>
  );
}
