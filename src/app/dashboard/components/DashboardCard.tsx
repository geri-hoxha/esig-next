import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICard } from "../general/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface IProps {
  card: ICard;
  index: number;
}

const DashboardCard = ({ card, index }: IProps) => {
  return (
    <Card  className="w-100 md:w-1/3">
      <CardHeader className="pt-3 pb-2">
        <CardTitle className="flex items-center gap-x-3 text-base">
          {" "}
          <Badge className="w-8 h-8 text-base rounded-md">{index + 1}</Badge>
          {card.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex pb-0">
        <span className="text-sm">{card.description}</span>
      </CardContent>
      <CardFooter className="flex pl-2 pb-2">
        <Button variant="link" className="text-esig-sapphire w-auto">
          <span className="flex items-center">Lexo me shume <ExternalLink className="pl-1.5" /></span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
