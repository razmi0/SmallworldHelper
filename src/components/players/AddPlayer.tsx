import { ChangeEvent, MutableRefObject, useCallback, useRef } from "react";
import { KeyboardManager, RefManager, SoftInput } from "@Components";
import { useMidState, useMidAction, useClickOutside } from "@Hooks";
import { keys, validateIntOnChange } from "./helpers";
import { withViewTransition } from "@Utils";
import { ContainerProps } from "@Types";
import styles from "./_.module.css";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
  isOpen: boolean;
  toggleOpenAddPlayer: () => void;
};
export const AddPlayerCard = ({ addPlayer, isOpen, toggleOpenAddPlayer }: AddPlayerProps) => {
  const { newPlayerName, startScore } = useMidState();
  const { addPlayerActions } = useMidAction();
  const { setNewPlayerName, setStartScore } = addPlayerActions;
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  useClickOutside(ref, () => {
    if (isOpen) {
      toggleCard();
    }
  });

  const addPlayerAction = useCallback(() => {
    withViewTransition(() => {
      addPlayer(newPlayerName, startScore as number);
      setNewPlayerName("");
      resetScoreInput();
    });
  }, [newPlayerName, startScore]);

  const handleInputValidation = () => {
    if (!newPlayerName) return;
    addPlayerAction();
  };

  const handleStartScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.currentTarget.value;
    const newScore: string | number | undefined = validateIntOnChange(raw);
    if (!newScore) return;
    setStartScore(newScore);
  };

  const toggleCard = () => {
    withViewTransition(toggleOpenAddPlayer);
    resetScoreInput();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keys.ESCAPE) {
      toggleCard();
    }
    if (e.key === keys.ENTER) {
      handleInputValidation();
    }
    if (e.key === keys.BACKSPACE) {
      if (startScore.toString().length === 1) {
        resetScoreInput();
      }
    }
  };

  const resetScoreInput = () => {
    setStartScore(0);
  };

  const finalStartScore = startScore ? startScore : "";

  return (
    <RefManager ref={ref}>
      {isOpen && (
        <KeyboardManager onKeyUp={handleKeyUp}>
          <AddPlayerContainer>
            <SoftInput
              label="Name"
              pseudoName="0_addPlayer"
              onChange={(e) => setNewPlayerName(e.currentTarget.value)}
              value={newPlayerName}
            />
            <SoftInput
              label="Start score"
              pseudoName="0_startScore"
              onChange={(e) => handleStartScoreChange(e)}
              value={finalStartScore}
            />
          </AddPlayerContainer>
        </KeyboardManager>
      )}
    </RefManager>
  );
};

const AddPlayerContainer = ({ children }: ContainerProps) => {
  const classes = `${styles["board-card"]} ${styles["addplayer-ctn"]} ${styles["utility-card"]} grainy lin-dark global-grainy shadow-ctn `;
  return <div className={classes}>{children}</div>;
};
