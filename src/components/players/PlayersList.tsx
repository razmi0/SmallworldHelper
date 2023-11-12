import { ReactNode, KeyboardEvent, ChangeEvent, useCallback } from "react";
import styles from "./_.module.css";
import { ContainerProps, InputContainer } from "../containers/Containers";
import { KeyboardNavigationIdType, Player } from "../../types";
import { IconButton, IconHeading } from "../icons/Icons";
import { useIntermediate, useIntermediateDispatch } from "../../hooks";
import { Star, Reset, Delete } from "../icons/Icons";
import { Flex, Spacer } from "../Utils";
import { SoftInput } from "../Input";
import { withViewTransition } from "../../utils";
import { keys, validateOnChange, isDeletable } from "./helpers";
import {
  navigateTo,
  findNextPlayer,
  findPrevPlayer,
  findRightUtils,
  findLeftUtils,
} from "../../keyboardNav";

/* players, reset, remove, update, */
// TYPES
//--

type PlayerListType = {
  children?: ReactNode;
  players: Player[];
  hideScore: boolean;
  reset: (id: number) => void;
  remove: (id: number) => void;
  update: (id: number, score: number) => void;
};

type PlayerUtilitiesProps = {
  id: number;
  reset: (id: number) => void;
  remove: (id: number) => void;
  isFocus: boolean;
  datatype: KeyboardNavigationIdType;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

// COMPONENTS
//--

export const PlayersList = ({ players, update, reset, remove, hideScore }: PlayerListType) => {
  const { isFocus, newScores } = useIntermediate();
  const { isOnFocus, setNewScores } = useIntermediateDispatch();

  const resetInput = (i: number) => {
    setNewScores(i, 0);
  };

  const handleBlur = useCallback((i: number) => {
    isOnFocus(i, false);
    resetInput(i);
  }, []);

  const handleFocus = useCallback((i: number) => {
    isOnFocus(i, true);
  }, []);

  const handleKeyUp = (
    e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    id: number,
    i: number
  ) => {
    switch (e.key) {
      case keys.ENTER: {
        if (e.currentTarget.nodeName === "INPUT") {
          if (e.currentTarget.value === "-") return;
          update(id /* PLAYER ID */, newScores[i] as number);
          resetInput(i);
          navigateTo(findNextPlayer(e.currentTarget.id) /* DOM ID */);
        }

        break;
      }

      case keys.BACKSPACE: {
        if (isDeletable(e)) {
          resetInput(i);
        }
        break;
      }

      case keys.ARROW_UP: {
        navigateTo(findPrevPlayer(e.currentTarget.id));
        break;
      }

      case keys.ARROW_DOWN: {
        navigateTo(findNextPlayer(e.currentTarget.id));
        break;
      }

      case keys.ARROW_RIGHT: {
        navigateTo(findRightUtils(e.currentTarget.id));
        break;
      }

      case keys.ARROW_LEFT: {
        navigateTo(findLeftUtils(e.currentTarget.id));
        break;
      }

      case keys.TAB: {
        console.log("TAB");
        break;
      }

      default:
        break;
    }
  };

  const handleChangeScore = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const raw = e.currentTarget.value;
    const newScore: string | number | undefined = validateOnChange(raw);
    if (!newScore) return;
    setNewScores(i, newScore);
  };

  return (
    <ul className={styles["players-list-ctn"]}>
      {players.map((player, i) => {
        const { name, victoryPtn, id, color } = player;
        const subjectId = `${id}_${name.toLowerCase()}`;

        return (
          <PlayerListElement
            key={subjectId}
            onFocus={() => handleFocus(i)}
            onBlur={() => handleBlur(i)}
          >
            <PlayerTextContainer>
              <IconHeading
                animationName="rotate"
                isHover={isFocus[i]}
                color={color}
                icon={Star}
                variant="heading"
              />
              <PlayerText color={isFocus[i] ? color : "inherit"}>
                {name} : {hideScore ? "***" : victoryPtn}
              </PlayerText>
            </PlayerTextContainer>
            <Spacer />
            <UtilitiesInputContainer>
              <InputContainer>
                <SoftInput
                  color={color}
                  onKeyUp={(e) => handleKeyUp(e, id, i)}
                  onChange={(e) => handleChangeScore(e, i)}
                  value={newScores[i] ? newScores[i] : ""}
                  subjectId={subjectId}
                  datatype="soft-input"
                />
                <PlayerUtilities
                  id={id}
                  remove={remove}
                  reset={reset}
                  isFocus={isFocus[i]}
                  datatype="utility"
                  onKeyUp={(e) => {
                    handleKeyUp(e, id, i);
                  }}
                />
              </InputContainer>
            </UtilitiesInputContainer>
          </PlayerListElement>
        );
      })}
    </ul>
  );
};

export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={styles["board-ctn"]}>{children}</section>;
};

interface PlayerListElementProps extends ContainerProps {
  onFocus: () => void;
  onBlur: () => void;
}
const PlayerListElement = ({ children, onFocus, onBlur }: PlayerListElementProps) => {
  return (
    <li onFocus={onFocus} onBlur={onBlur} className={styles["list-element-ctn"]}>
      {children}
    </li>
  );
};

const PlayerTextContainer = ({ children }: ContainerProps) => {
  return <div className={styles["player-text-ctn"]}>{children}</div>;
};

const PlayerText = ({ children, color }: { children: ReactNode; color: string }) => {
  return (
    <p style={{ color }} className={styles["player-text"]}>
      {children}
    </p>
  );
};

const UtilitiesInputContainer = ({ children }: ContainerProps) => {
  return <div className={styles["utilities-input-ctn"]}>{children}</div>;
};

const PlayerUtilities = ({
  id,
  reset,
  remove,
  isFocus,
  datatype,
  onKeyUp,
}: PlayerUtilitiesProps) => {
  const resetWithViewTransition = useCallback(() => withViewTransition(() => reset(id)), [id]);
  const removeWithViewTransition = useCallback(() => withViewTransition(() => remove(id)), [id]);

  return (
    <div className={styles["player-utilities-ctn"]}>
      <IconButton
        sx={{
          visibility: `${!isFocus ? "hidden" : "initial"}`,
        }}
        variant={"utility"}
        onClick={resetWithViewTransition}
        icon={Reset}
        iconName="reset"
        datatype={datatype}
        onKeyUp={onKeyUp as (e: KeyboardEvent<HTMLButtonElement>) => void}
        id={id + "." + 1}
      />
      <IconButton
        sx={{
          visibility: `${!isFocus ? "hidden" : "initial"}`,
        }}
        variant={"utility"}
        onClick={removeWithViewTransition}
        icon={Delete}
        iconName="delete"
        datatype={datatype}
        onKeyUp={onKeyUp as (e: KeyboardEvent<HTMLButtonElement>) => void}
        id={id + "." + 2}
      />
    </div>
  );
};
