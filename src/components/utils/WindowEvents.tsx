import { useEffect } from "react";
import { isProdEnv } from "@Utils";

export const WindowEvents = () => {
  console.log("WindowEvents");
  useEffect(() => {
    isProdEnv() &&
      addEventListener("beforeunload", (e) => {
        e.returnValue = "";
        return;
      });
    return () => {
      isProdEnv() &&
        removeEventListener("beforeunload", (e) => {
          e.returnValue = "";
          return;
        });
    };
  }, []);

  return <></>;
};
