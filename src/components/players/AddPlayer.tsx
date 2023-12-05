import { ChangeEvent, MutableRefObject, useRef } from "react";
import { KeyboardManager, Position, RefManager, SoftInput } from "@Components";
import { useMidState, useMidAction, useClickOutside, useNotif } from "@Hooks";
import { keys, validateIntOnChange } from "./helpers";
import { beautify } from "@Utils";
import { getCardStyles } from "@Styles";
import { ContainerProps } from "@Types";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
  isOpen: boolean;
  toggleOpenAddPlayer: () => void;
  names: string[];
};
export const AddPlayerCard = ({
  addPlayer,
  isOpen,
  toggleOpenAddPlayer,
  names,
}: AddPlayerProps) => {
  const { post } = useNotif();
  const { newPlayerName, startScore } = useMidState();
  const { addPlayerActions, focusActions } = useMidAction();
  const { isOnFocus } = focusActions;
  const { setNewPlayerName, setStartScore } = addPlayerActions;
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  useClickOutside(ref, () => {
    if (isOpen) {
      toggleCard();
    }
  });

  const addPlayerAction = () => {
    const newName = beautify(newPlayerName);
    if (names.includes(newName)) {
      post({
        message: `${newName} already taken`,
        type: "warning",
      });
    }
    addPlayer(newName, startScore as number);
    setNewPlayerName("");
    setStartScore(0);
  };

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
    toggleOpenAddPlayer();
    setStartScore(0);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === keys.ESCAPE) {
      toggleCard();
      isOnFocus(0, true);
    }
    if (e.key === keys.ENTER) {
      handleInputValidation();
    }
    if (e.key === keys.BACKSPACE) {
      if (startScore.toString().length === 1) {
        setStartScore(0);
      }
    }
  };

  const finalStartScore = startScore ? startScore : "";

  return (
    <>
      {isOpen && (
        <Position variant="nav-extension">
          <RefManager ref={ref}>
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
          </RefManager>
        </Position>
      )}
    </>
  );
};

const AddStyles = ({ children }: ContainerProps) => {
  const classes = getCardStyles("utility");
  const back = getCardStyles("utility-back");

  return (
    <div className={back} style={{ boxShadow: "0px 0px 1px 1px rgba(255, 255, 222, 0.3)" }}>
      <div className={classes}>{children}</div>
    </div>
  );
};
