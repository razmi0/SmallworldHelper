import { ChangeEvent, MutableRefObject, useCallback, useRef, useState } from "react";
import { KeyboardManager, Position, RefManager } from "@Components/Utils";
import { SoftInput } from "@Components/Inputs";
import { useNotif } from "@Context/useNotif";
import { useClickOutside } from "@Hooks/useClickOutside";
import { keys, validateIntOnChange } from "../utils/players/helpers";
import { beautify } from "@Utils/utils";
import { getCardStyles } from "@Components/styles";
import { ContainerProps } from "@Types";
import { FocusActionsType } from "../types/types";
import { CloseButton } from "./Buttons";

type AddPlayerProps = {
  addPlayer: (name: string, score: number) => void;
  isOpen: boolean;
  toggleCard: () => void;
  names: string[];
  changeFocus: FocusActionsType["changeFocus"];
};
const AddPlayerCard = ({ addPlayer, isOpen, toggleCard, names, changeFocus }: AddPlayerProps) => {
  const [newName, setNewName] = useState("");
  const [startScore, setStartScore] = useState<number | string>(0);
  const { post } = useNotif();
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  const toggleCardAndReset = () => {
    toggleCard();
    setStartScore(0);
  };

  useClickOutside(ref, () => isOpen && toggleCardAndReset());

  const addNewPlayer = useCallback(() => {
    const newBeautifulName = beautify(newName);
    if (names.includes(newBeautifulName)) {
      post({
        type: "warning",
        message: `${newBeautifulName} is already taken`,
      });
    }
    addPlayer(newBeautifulName, startScore as number);
    setNewName("");
    setStartScore(0);
  }, [newName, startScore]); // newPlayerName, startScore

  const handleStartScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawScore = e.currentTarget.value;
    const newScore: string | number | undefined = validateIntOnChange(rawScore);
    if (!newScore && newScore !== 0) return;
    setStartScore(newScore);
  };

  const handleNewNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    if (!newName && newName.length !== 0) return;
    setNewName(newName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case keys.ESCAPE:
        toggleCardAndReset();
        changeFocus(0, true);
        break;
      case keys.ENTER:
        addNewPlayer();
        break;
      case keys.BACKSPACE:
        if (startScore.toString().length === 1) {
          setStartScore(0);
        }
        break;
      default:
        break;
    }
  };

  const finalStartScore = startScore ? startScore : "";

  return (
    <>
      {isOpen && (
        <Position variant="absolute-center">
          <RefManager ref={ref}>
            <KeyboardManager onKeyDown={handleKeyDown}>
              <AddStyles>
                <SoftInput
                  label="Name"
                  pseudoName="0_addPlayer"
                  onChange={(e) => handleNewNameChange(e)}
                  value={newName}
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
          <CloseButton onClick={toggleCardAndReset} />
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
