import { ChangeEvent, MutableRefObject, useCallback, useRef } from "react";
import { KeyboardManager, Position, RefManager } from "@Components/Utils";
import { SoftInput } from "@Components/Inputs";
import { useMid } from "@Context/useMid";
import { useNotif } from "@Context/useNotif";
import { useClickOutside } from "@Hooks/useClickOutside";
import { keys, validateIntOnChange } from "../utils/players/helpers";
import { beautify } from "@Utils/utils";
import { getCardStyles } from "@Components/styles";
import { ContainerProps } from "@Types";
import { FocusActionsType } from "../types/types";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
  isOpen: boolean;
  toggleOpenAddPlayer: () => void;
  names: string[];
  changeFocus: FocusActionsType["changeFocus"];
};
const AddPlayerCard = ({
  addPlayer,
  isOpen,
  toggleOpenAddPlayer,
  names,
  changeFocus,
}: AddPlayerProps) => {
  const { post } = useNotif();
  const { addPlayerActions, newPlayerName, startScore } = useMid();
  const { setNewPlayerName, setStartScore } = addPlayerActions;
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  useClickOutside(ref, () => {
    if (isOpen) {
      toggleCard();
    }
  });

  const addPlayerAction = useCallback(() => {
    const newName = beautify(newPlayerName);
    if (names.includes(newName)) {
      post({
        type: "warning",
        message: `${newName} already taken`,
      });
    }
    addPlayer(newName, startScore as number);
    setNewPlayerName("");
    setStartScore(0);
  }, [newPlayerName, startScore]); // newPlayerName, startScore

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
      changeFocus(0, true);
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

export default AddPlayerCard;

const AddStyles = ({ children }: ContainerProps) => {
  const classes = getCardStyles("utility");
  const back = getCardStyles("utility-back");

  return (
    <div className={back} style={{ boxShadow: "0px 0px 1px 1px rgba(255, 255, 222, 0.3)" }}>
      <div className={classes}>{children}</div>
    </div>
  );
};
