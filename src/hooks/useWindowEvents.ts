import { useEffect } from "react";
import { isProdEnv } from "@Utils/utils";

export const useWindowEvents = () => {
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
};
