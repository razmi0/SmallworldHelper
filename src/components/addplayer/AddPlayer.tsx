import { ChangeEvent } from "react";
import { SoftInput } from "../Input";
import { useIntermediate, useIntermediateDispatch } from "../../hooks";
import { ContainerProps } from "../../types";
import styles from "./_.module.css";
import { validateOnChange } from "../players/helpers";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
};
export const AddPlayer = ({ addPlayer }: AddPlayerProps) => {
  const { newPlayerName, startScore } = useIntermediate();
  const { setNewPlayerName, setStartScore } = useIntermediateDispatch();

  const handleInputValidation = () => {
    addPlayer(newPlayerName, startScore);
    setNewPlayerName("");
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
  return <div className={styles["addplayer-ctn"] + " bg-grey-alpha"}>{children}</div>;
};
