import { ChangeEvent, useCallback } from "react";
import { SoftInput } from "../../Input";
import { useIntermediate, useIntermediateDispatch } from "../../../hooks";
import { ContainerProps } from "../../../types";
import styles from "./_.module.css";
import { validateOnChange } from "../helpers";
import { withViewTransition } from "../../../utils";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
};
export const AddPlayer = ({ addPlayer }: AddPlayerProps) => {
  const { newPlayerName, startScore } = useIntermediate();
  const { setNewPlayerName, setStartScore } = useIntermediateDispatch();

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
    <AddPlayerContainer>
      <SoftInput
        label="Name"
        subjectId="0_addPlayer"
        onEnter={handleInputValidation}
        onChange={(e) => setNewPlayerName(e.currentTarget.value)}
        value={newPlayerName}
      />
      <SoftInput
        label="Start score"
        subjectId="0_startScore"
        onChange={(e) => handleStartScoreChange(e)}
        value={startScore ? startScore : ""}
        onEnter={handleInputValidation}
      />
    </AddPlayerContainer>
  );
};

const AddPlayerContainer = ({ children }: ContainerProps) => {
  const classes = `${styles["addplayer-ctn"]} grainy lin-dark global-grainy shadow-ctn`;
  return <div className={classes}>{children}</div>;
};
