"use client";
import { usePathname } from "next/navigation";
import { IRoute, routes } from "./Sidemenu/Routes";

const PageTitle = () => {
  const paths = usePathname();

  const pathNames = paths.split("/").filter((path) => path);

  const parentRoute = routes.find(
    (route) => pathNames.at(0)?.toLowerCase() === route.text.toLowerCase()
  );

  let activeRoute: IRoute | undefined;

  // nested route
  if (pathNames.length > 1) {
    activeRoute = parentRoute?.items?.find((route) =>
      route.href?.toLowerCase().includes(pathNames[1])
    );
  } else {
    activeRoute = parentRoute;
  }

  return <h1 className="font-semibold text-lg mb-2">{activeRoute?.text ?? 'Kryefaqja'}</h1>;
};

export default PageTitle;
