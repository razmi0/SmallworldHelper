import { ReactNode, KeyboardEvent, ChangeEvent, useCallback } from "react";
import styles from "./_.module.css";
import { ContainerProps, InputContainer } from "../containers/Containers";
import { Player } from "../../types";
import { IconButton, IconHeading } from "../icons/Icons";
import { useIntermediate, useIntermediateDispatch } from "../../hooks";
import { headingStarIconStyle, playerIconStyle } from "../icons/data";
import { Star, Reset, Delete } from "../icons/Icons";
import { Spacer, Flex } from "../Utils";
import { SoftInput } from "../Input";
import { throwError, withViewTransition } from "../../utils";

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
};

// HELPERS
//--

const allSofts = (name = '[name="soft-input"]') => {
  return Array.from(document.querySelectorAll<HTMLInputElement>(name));
};

const findNextPlayer = (targetId: string): HTMLInputElement => {
  const softs = allSofts();
  const softIndex = softs.findIndex((soft) => soft.id === targetId);
  if (softIndex === -1) {
    throwError("SoftInput not found");
  }
  const nextSoftInput = softIndex + 1 < softs.length ? softs[softIndex + 1] : softs[0];
  return nextSoftInput;
};

const findPrevPlayer = (targetId: string): HTMLInputElement => {
  const softs = allSofts();
  const softIndex = softs.findIndex((soft) => soft.id === targetId);
  if (softIndex === -1) {
    throwError("SoftInput not found");
  }
  const previousSoftInput = softIndex - 1 >= 0 ? softs[softIndex - 1] : softs[softs.length - 1];
  return previousSoftInput;
};

const navigateTo = (element: HTMLElement) => {
  element.focus();
};

const validateOnChange = (str: string) => {
  if (str === "-") return str;
  const valid = /^-?\d+$/.test(str);
  if (!valid) return;
  const num = Number(str);
  if (isNaN(num)) return;
  return num;
};

const isBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
  return e.key === "Backspace" && e.currentTarget.value.length === 1 ? true : false;
};

const ENTER = "Enter";
const BACKSPACE = "Backspace";
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
// const ARROW_LEFT = "ArrowLeft";
// const ARROW_RIGHT = "ArrowRight";
// const TAB = "Tab";

// COMPONENTS
//--
export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={styles["players-ctn"]}>{children}</section>;
};

const PlayerListElement = ({ children }: ContainerProps) => {
  return <li className={styles["list-element-ctn"]}>{children}</li>;
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

const PlayerUtilities = ({ id, reset, remove, isFocus }: PlayerUtilitiesProps) => {
  const resetWithViewTransition = useCallback(() => withViewTransition(() => reset(id)), [id]);
  const removeWithViewTransition = useCallback(() => withViewTransition(() => remove(id)), [id]);
  return (
    <div className={styles["player-utilities-ctn"]}>
      {isFocus && (
        <>
          <IconButton
            onClick={resetWithViewTransition}
            icon={Reset}
            iconName="reset"
            svgData={playerIconStyle}
          />
          <IconButton
            onClick={removeWithViewTransition}
            icon={Delete}
            iconName="delete"
            svgData={playerIconStyle}
          />
        </>
      )}
    </div>
  );
};

export const PlayersList = ({ players, update, reset, remove, hideScore }: PlayerListType) => {
  const { isOnFocus: isFocus, newScores } = useIntermediate();
  const { isOnFocus: isOnFocus, setNewScores } = useIntermediateDispatch();

  const resetInput = (i: number) => {
    setNewScores(i, 0);
  };

  const handleBlur = (i: number) => {
    withViewTransition(() => isOnFocus(i, false));
    resetInput(i);
  };

  const handleFocus = (i: number) => {
    withViewTransition(() => isOnFocus(i, true));
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, id: number, i: number) => {
    switch (e.key) {
      case ENTER: {
        navigateTo(findNextPlayer(e.currentTarget.id) /* DOM ID */);
        if (e.currentTarget.value === "-") return;
        update(id /* PLAYER ID */, newScores[i] as number);
        resetInput(i);
        break;
      }

      case BACKSPACE: {
        if (isBackspace(e)) {
          resetInput(i);
        }
        break;
      }

      case ARROW_UP: {
        navigateTo(findPrevPlayer(e.currentTarget.id));
        break;
      }

      case ARROW_DOWN: {
        navigateTo(findNextPlayer(e.currentTarget.id));
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
          <PlayerListElement key={id}>
            <Flex>
              <PlayerTextContainer>
                <IconHeading
                  animationName="translate"
                  isHover={isFocus[i]}
                  color={color}
                  icon={Star}
                  svgData={headingStarIconStyle}
                />
                <PlayerText color={isFocus[i] ? color : "inherit"}>
                  {name} : {hideScore ? "***" : victoryPtn}
                </PlayerText>
              </PlayerTextContainer>
              <Spacer />
              <PlayerUtilities id={id} remove={remove} reset={reset} isFocus={isFocus[i]} />
            </Flex>
            <InputContainer>
              <SoftInput
                color={color}
                onFocus={() => handleFocus(i)}
                onBlur={() => handleBlur(i)}
                onKeyUp={(e) => handleKeyUp(e, id, i)}
                onChange={(e) => handleChangeScore(e, i)}
                value={newScores[i] ? newScores[i] : ""}
                subjectId={subjectId}
              />
            </InputContainer>
          </PlayerListElement>
        );
      })}
    </ul>
  );
};
