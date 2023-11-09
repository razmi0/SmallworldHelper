import { ReactNode } from "react";
import styles from "./_.module.css";
import { ContainerProps } from "src/components/containers/Containers";

export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={styles["players-ctn"]}>{children}</section>;
};

export const PlayersList = ({ children }: ContainerProps) => {
  return <ul className={styles["players-list-ctn"]}>{children}</ul>;
};

export const PlayerListElement = ({ children }: ContainerProps) => {
  return <li className={styles["list-element-ctn"]}>{children}</li>;
};

export const PlayerTextContainer = ({ children }: ContainerProps) => {
  return <div className={styles["player-text-ctn"]}>{children}</div>;
};

export const PlayerText = ({ children, color }: { children: ReactNode; color: string }) => {
  return (
    <p style={{ color }} className={styles["player-text"]}>
      {children}
    </p>
  );
};
