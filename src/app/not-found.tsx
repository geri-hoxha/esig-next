import { Button } from "@/components/ui/button";
import { AlertOctagon, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col -mt-28">
      <AlertOctagon size={50} className="text-red-600 animate-bounce" />
      <span className="text-xl text-black my-7 font-medium">
        404 - Faqja që vizituat nuk ekziston!
      </span>
      <Button >
        <Link href="/">Kthehu ne kryefaqe</Link>
      </Button>
    </div>
  );
}
