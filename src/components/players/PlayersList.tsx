import { ReactNode, KeyboardEvent, ChangeEvent, useCallback } from "react";
import styles from "./_.module.css";
import { ContainerProps, InputContainer } from "../containers/Containers";
import { Player } from "../../types";
import { IconButton, IconHeading } from "../icons/Icons";
import { useIntermediate, useIntermediateDispatch } from "../../hooks";
// import { headingStarIconStyle, UTILITY_STYLES } from "../icons/data";
import { Star, Reset, Delete } from "../icons/Icons";
import { Spacer, Flex } from "../Utils";
import { SoftInput } from "../Input";
import { isDevEnv, withViewTransition } from "../../utils";
import {
  keys,
  validateOnChange,
  navigateTo,
  findNextPlayer,
  findPrevPlayer,
  isDeletable,
  findRightUtils,
  findLeftUtils,
  // findRightUtils,
  // findLeftUtils,
} from "./helpers";

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

// COMPONENTS
//--

export const PlayersList = ({ players, update, reset, remove, hideScore }: PlayerListType) => {
  const { isFocus, newScores } = useIntermediate();
  const { isOnFocus, setNewScores } = useIntermediateDispatch();

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
      case keys.ENTER: {
        navigateTo(findNextPlayer(e.currentTarget.id) /* DOM ID */);
        if (e.currentTarget.value === "-") return;
        update(id /* PLAYER ID */, newScores[i] as number);
        resetInput(i);
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
          <PlayerListElement key={id}>
            <Flex>
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
            </Flex>
            <UtilitiesInputContainer>
              <InputContainer>
                <SoftInput
                  color={color}
                  onFocus={() => handleFocus(i)}
                  onBlur={() => handleBlur(i)}
                  onKeyUp={(e) => handleKeyUp(e, id, i)}
                  onChange={(e) => handleChangeScore(e, i)}
                  value={newScores[i] ? newScores[i] : ""}
                  subjectId={subjectId}
                  datatype="soft-input"
                />
              </InputContainer>
              <PlayerUtilities id={id} remove={remove} reset={reset} isFocus={isFocus[i]} />
            </UtilitiesInputContainer>
          </PlayerListElement>
        );
      })}
    </ul>
  );
};

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

const UtilitiesInputContainer = ({ children }: ContainerProps) => {
  return <div className={styles["utilities-input-ctn"]}>{children}</div>;
};

const PlayerUtilities = ({ id, reset, remove, isFocus }: PlayerUtilitiesProps) => {
  const resetWithViewTransition = useCallback(() => withViewTransition(() => reset(id)), [id]);
  const removeWithViewTransition = useCallback(() => withViewTransition(() => remove(id)), [id]);
  isFocus = isDevEnv() ? true : false;
  return (
    <div className={styles["player-utilities-ctn"]}>
      {isFocus && (
        <>
          <IconButton
            variant={"utility"}
            onClick={resetWithViewTransition}
            icon={Reset}
            iconName="reset"
            datatype="utility"
            id={id + "." + 1}
          />
          <IconButton
            variant={"utility"}
            onClick={removeWithViewTransition}
            icon={Delete}
            iconName="delete"
            datatype="utility"
            id={id + "." + 2}
          />
        </>
      )}
    </div>
  );
};
