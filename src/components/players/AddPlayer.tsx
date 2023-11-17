import { ChangeEvent, useCallback } from "react";
import { SoftInput } from "../Inputs";
import { useMidState, useMidAction } from "../../hooks";
import { ContainerProps } from "@Types";
import styles from "./_.module.css";
import { validateOnChange } from "./helpers";
import { withViewTransition } from "@Utils";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
  isOpen: boolean;
};
export const AddPlayer = ({ addPlayer, isOpen }: AddPlayerProps) => {
  const { newPlayerName, startScore } = useMidState();
  const { setNewPlayerName, setStartScore } = useMidAction();

  const addPlayerActionWithViewTransition = useCallback(() => {
    withViewTransition(() => {
      addPlayer(newPlayerName, startScore);
      setNewPlayerName("");
    });
  }, [newPlayerName, startScore]);

  const handleInputValidation = () => {
    if (!newPlayerName) return;
    addPlayerActionWithViewTransition();
  };

  const handleStartScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.currentTarget.value;
    const newScore: string | number | undefined = validateOnChange(raw);
    if (!newScore) return;
    setStartScore(Number(newScore));
  };

  return (
    <>
      {isOpen && (
        <AddPlayerContainer>
          <SoftInput
            label="Name"
            pseudoName="0_addPlayer"
            onEnter={handleInputValidation}
            onChange={(e) => setNewPlayerName(e.currentTarget.value)}
            value={newPlayerName}
          />
          <SoftInput
            label="Start score"
            pseudoName="0_startScore"
            onChange={(e) => handleStartScoreChange(e)}
            value={startScore ? startScore : ""}
            onEnter={handleInputValidation}
          />
        </AddPlayerContainer>
      )}
    </>
  );
};

const AddPlayerContainer = ({ children }: ContainerProps) => {
  const classes = `${styles["board-card"]} ${styles["addplayer-ctn"]} grainy lin-dark global-grainy shadow-ctn`;
  return <div className={classes}>{children}</div>;
};
