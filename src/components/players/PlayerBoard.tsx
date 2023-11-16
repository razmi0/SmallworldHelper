import { ReactNode, KeyboardEvent, ChangeEvent, useCallback, useRef } from "react";
import styles from "./_.module.css";
import { InputContainer } from "../containers";
import { ContainerProps, KeyboardNavigationIdType, Player } from "../../types";
import { IconButton, IconHeading } from "../icons/Icons";
import { useIntermediate, useIntermediateDispatch } from "../../hooks";
import { Star, Reset, Delete } from "../icons/Icons";
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

type BoardType = {
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

export const Board = ({ players, update, reset, remove, hideScore, children }: BoardType) => {
  const { isFocus, newScores } = useIntermediate();
  const { isOnFocus, setNewScores } = useIntermediateDispatch();
  const inputs = useRef<HTMLInputElement[]>(new Array(players.length).fill(""));

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
  const handleClicked = useCallback((i: number) => {
    isOnFocus(i, !isFocus[i]);
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

  const manageFocus = (i: number) => {
    navigateTo(inputs.current[i]);
  };

  return (
    <>
      <ListWrapper>
        <ul className={styles["players-list-ctn"]}>
          {players.map((player, i) => {
            const { name, victoryPtn, id, color } = player;
            const pseudoName = `${id}_${name.toLowerCase()}`;

            return (
              <PlayerListElement
                key={pseudoName}
                onFocus={() => handleFocus(i)}
                onBlur={() => handleBlur(i)}
                onClick={() => handleClicked(i)}
              >
                <PlayerTextContainer>
                  <PlayerText color={isFocus[i] ? color : "inherit"}>{name}</PlayerText>
                  <PlayerText color={isFocus[i] ? color : "inherit"}>
                    <IconHeading
                      animationName="rotate"
                      isHover={isFocus[i]}
                      color={color}
                      icon={Star}
                      variant="heading"
                    />
                    {hideScore ? "***" : victoryPtn}
                  </PlayerText>
                </PlayerTextContainer>
                <UtilitiesInputContainer>
                  <InputContainer>
                    <SoftInput
                      ref={(el) => {
                        inputs.current[i] = el as HTMLInputElement;
                        if (isFocus[i] && el) manageFocus(i);
                      }}
                      color={color}
                      onKeyUp={(e) => handleKeyUp(e, id, i)}
                      onChange={(e) => handleChangeScore(e, i)}
                      value={newScores[i] ? newScores[i] : ""}
                      pseudoName={pseudoName}
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
      </ListWrapper>
      {children}
    </>
  );
};

const ListWrapper = ({ children }: ContainerProps) => {
  return <div className={styles["players-list-ctn-wrapper"]}>{children}</div>;
};

export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={styles["board-ctn"]}>{children}</section>;
};

interface PlayerListElementProps extends ContainerProps {
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}
const PlayerListElement = ({ children, onFocus, onBlur, onClick }: PlayerListElementProps) => {
  const classes = `grainy lin-dark global-grainy shadow-ctn ${styles["list-element-ctn"]}`;
  return (
    <li onFocus={onFocus} onBlur={onBlur} onClick={onClick} className={classes}>
      {children}
    </li>
  );
}; // " bg-grey-alpha"

const PlayerTextContainer = ({ children }: ContainerProps) => {
  return <div className={styles["player-text-ctn"]}>{children}</div>;
};

const PlayerText = ({ children, color }: { children: ReactNode; color: string }) => {
  return (
    <div style={{ color }} className={styles["player-text"]}>
      {children}
    </div>
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

  const visibility = !isFocus ? "hidden" : "initial";

  return (
    <div className={styles["player-utilities-ctn"]}>
      <IconButton
        sx={{
          visibility: visibility,
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
          visibility: visibility,
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
