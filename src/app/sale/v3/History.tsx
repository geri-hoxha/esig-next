import { classNames } from "@/lib/utils";
import Image from "next/image";

type Type = "created" | "edited" | "cancelled" | "sold";

interface IActivity {
  id: number;
  type: Type;
  person: string;
  days: number;
  comment?: string;
}

const activity: IActivity[] = [
  {
    id: 1,
    type: "created",
    person: "Erin Hoxha",
    days: 7,
  },
  {
    id: 4,
    type: "cancelled",
    person: "Oltion Driza",
    comment:
      "Polica u anullua pasi agjenti Geri Hoxha kishte kryer axhustim primi gabim prej 20,000 Leke !",
    days: 4,
  },
  {
    id: 5,
    type: "sold",
    person: "Erin Hoxha",
    days: 1,
  },
];

export default function History() {
  return (
    <>
      <ul role="list" className="space-y-2">
        {activity.map((item, index) => (
          <li key={item.id} className="relative flex gap-x-4">
            <div
              className={classNames(
                index === activity.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center"
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            {!!item.comment ? (
              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                  {item.type === "cancelled" ? (
                    <Image
                      src={"/svg/cancel.svg"}
                      className="cursor-pointer relative   rounded-full bg-white  "
                      alt="edit"
                      width={"0"}
                      height={"0"}
                      style={{ width: 20, height: 20 }}
                      priority
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                  )}
                </div>

                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-300 ">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 leading-5 text-gray-500">
                      <span className="font-semibold text-black text-xs sm:text-sm">
                        {item.person}
                      </span>{" "}
                      <span className="text-xs sm:text-sm">commented</span>
                    </div>
                    <time className="flex-none py-0.5 leading-5 text-gray-500 text-[9px]  sm:text-xs">
                      {item.days} dite me pare
                    </time>
                  </div>
                  <p className="leading-6 text-gray-500 text-xs sm:text-sm">
                    {item.comment}
                    <span className="bg-blue-100 text-[9px] sm:text-xs text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                      Kerkon miratim
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                  {item.type === "sold" ? (
                    <span>
                      <Image
                        src={"/svg/success.svg"}
                        className="cursor-pointer"
                        alt="edit"
                        width={"0"}
                        height={"0"}
                        style={{ width: 20, height: 20 }}
                        priority
                      />
                    </span>
                  ) : item.type === "cancelled" ? (
                    <Image
                      src={"/svg/cancel.svg"}
                      className="cursor-pointer"
                      alt="edit"
                      width={"0"}
                      height={"0"}
                      style={{ width: 20, height: 20 }}
                      priority
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                  )}
                </div>
                <p className="flex-auto py-0.5 leading-5 text-gray-500 text-xs sm:text-sm">
                  <span className="font-semibold text-gray-900">
                    {item.person}
                  </span>{" "}
                  {item.type} the invoice.
                </p>
                <time className="flex-none py-0.5 leading-5 text-gray-500 text-[9px]  sm:text-xs">
                  {item.days} dite me pare
                </time>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
