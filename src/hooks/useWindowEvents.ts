import { useEffect } from "react";

export const useWindowEvents = (prodEnv: boolean) => {
  useEffect(() => {
    prodEnv &&
      addEventListener("beforeunload", (e) => {
        e.returnValue = "";
        return;
      });
    return () => {
      prodEnv &&
        removeEventListener("beforeunload", (e) => {
          e.returnValue = "";
          return;
        });
    };
  }, []);
};
