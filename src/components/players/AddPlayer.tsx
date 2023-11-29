import { ChangeEvent, MutableRefObject, useCallback, useRef } from "react";
import { KeyboardManager, Position, RefManager, SoftInput } from "@Components";
import { useMidState, useMidAction, useClickOutside, useNotif } from "@Hooks";
import { getCardStyles, keys, validateIntOnChange } from "./helpers";
import { withViewTransition } from "@Utils";
import { ContainerProps, NotificationType } from "@Types";

const addPlayerNotifications = {
  title: "Player added",
  message: "Player has been added",
  type: "success" as NotificationType["type"],
};

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
  isOpen: boolean;
  toggleOpenAddPlayer: () => void;
};
export const AddPlayerCard = ({ addPlayer, isOpen, toggleOpenAddPlayer }: AddPlayerProps) => {
  const { addNotif } = useNotif();
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
      addNotif({
        ...addPlayerNotifications,
        id: Math.random() * 10,
      });
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
      <Position variant="nav-extension">
        {isOpen && (
          <KeyboardManager onKeyUp={handleKeyUp}>
            <AddStyles>
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
            </AddStyles>
          </KeyboardManager>
        )}
      </Position>
    </RefManager>
  );
};

const AddStyles = ({ children }: ContainerProps) => {
  const cardStyles = " grainy lin-dark global-grainy shadow-ctn";
  const classes = getCardStyles("utility");
  return <div className={classes + cardStyles}>{children}</div>;
};
