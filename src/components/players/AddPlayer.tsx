import { ChangeEvent, MutableRefObject, forwardRef, useCallback, useRef } from "react";
import { SoftInput } from "@Components";
import { useMidState, useMidAction, useClickOutside } from "@Hooks";
import { validateOnChange } from "./helpers";
import { withViewTransition } from "@Utils";
import { ContainerProps } from "@Types";
import styles from "./_.module.css";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
  isOpen: boolean;
  toggleOpenAddPlayer: () => void;
};
export const AddPlayer = ({ addPlayer, isOpen, toggleOpenAddPlayer }: AddPlayerProps) => {
  const { newPlayerName, startScore } = useMidState();
  const { setNewPlayerName, setStartScore } = useMidAction();
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  useClickOutside(ref, () => {
    if (isOpen) {
      toggleOpenAddPlayer();
    }
  });

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
    <RefManager ref={ref}>
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
    </RefManager>
  );
};

const RefManager = forwardRef<HTMLDivElement, ContainerProps>(({ children }, ref) => {
  return (
    <div ref={ref} style={{ height: "fit-content" }}>
      {children}
    </div>
  );
});

const AddPlayerContainer = ({ children }: ContainerProps) => {
  const classes = `${styles["board-card"]} ${styles["addplayer-ctn"]} grainy lin-dark global-grainy shadow-ctn`;
  return <div className={classes}>{children}</div>;
};
