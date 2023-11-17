import { ChangeEvent, KeyboardEvent, ReactNode, useCallback, useEffect, useRef } from "react";
import { useClickOutside, useIntermediate, useIntermediateDispatch } from "../../hooks";
import { withViewTransition } from "../../utils";
import { SoftInput } from "../Inputs";
import { InputContainer, Delete, IconButton, IconHeading, Reset, Star } from "../";
import { blurInput, isDeletable, keys, navigateTo, validateOnChange } from "./helpers";
import { ContainerProps, KeyboardNavigationIdType, Player } from "../../types";
import styles from "./_.module.css";

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
  datatype?: KeyboardNavigationIdType;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

// COMPONENTS
//--

export const Board = ({ players, update, reset, remove, hideScore, children }: BoardType) => {
  const { isFocus, newScores } = useIntermediate();
  const { setNewScores, focusActions } = useIntermediateDispatch();
  const { isOnFocus, setIsOnFocus } = focusActions;
  const inputs = useRef<HTMLInputElement[]>(new Array(players.length).fill(""));

  useClickOutside(inputs, () => blurInput(inputs.current));

  useEffect(() => {
    inputs.current = new Array(players.length).fill("");
    setIsOnFocus(players.length, false);
  }, [players.length]);

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
          navigateTo(inputs.current, i, "NEXT");
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
        navigateTo(inputs.current, i, "PREV");
        break;
      }

      case keys.ARROW_DOWN: {
        navigateTo(inputs.current, i, "NEXT");
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

  const manageRefs = (element: HTMLInputElement | null, i: number) => {
    if (element) inputs.current[i] = element;
    if (isFocus[i] && element) navigateTo(inputs.current, i);
  };

  return (
    <>
      <ListWrapper>
        <ul className={styles["players-list-ctn"]}>
          {players.map((player, i) => {
            const { name, victoryPtn, id, color } = player;
            const pseudoName = `${id}_${name.toLowerCase()}`;
            const finalColor = isFocus[i] ? color : "inherit";
            const softValue = newScores[i] ? newScores[i] : "";

            return (
              <FocusManager
                key={pseudoName}
                onBlur={() => handleBlur(i)}
                onFocus={() => handleFocus(i)}
                onClick={() => handleClicked(i)}
              >
                <PlayerListElement>
                  <PlayerTextContainer>
                    <PlayerText color={finalColor}>{name}</PlayerText>
                    <PlayerText color={finalColor}>
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
                        ref={(element) => manageRefs(element, i)}
                        color={color}
                        onKeyUp={(event) => handleKeyUp(event, id, i)}
                        onChange={(event) => handleChangeScore(event, i)}
                        value={softValue}
                        pseudoName={pseudoName}
                      />
                      <PlayerUtilities
                        id={id}
                        remove={remove}
                        reset={reset}
                        isFocus={isFocus[i]}
                        onKeyUp={(event) => {
                          handleKeyUp(event, id, i);
                        }}
                      />
                    </InputContainer>
                  </UtilitiesInputContainer>
                </PlayerListElement>
              </FocusManager>
            );
          })}
          {children}
        </ul>
      </ListWrapper>
    </>
  );
};

const ListWrapper = ({ children }: ContainerProps) => {
  return <div className={styles["players-list-ctn-wrapper"]}>{children}</div>;
};

export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={styles["board-ctn"]}>{children}</section>;
};

interface FocusManagerProps extends ContainerProps {
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}
const PlayerListElement = ({ children }: ContainerProps) => {
  const classes = `${styles["list-element-ctn"]} ${styles["board-card"]} grainy lin-dark global-grainy shadow-ctn `;
  return <div className={classes}>{children}</div>;
};

const FocusManager = ({ children, onFocus, onBlur, onClick }: FocusManagerProps) => {
  return (
    <li onFocus={onFocus} onBlur={onBlur} onClick={onClick} style={{ listStyle: "none" }}>
      {children}
    </li>
  );
};

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
  const finalDatatype = datatype ? datatype : "";

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
        datatype={finalDatatype}
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
        datatype={finalDatatype}
        onKeyUp={onKeyUp as (e: KeyboardEvent<HTMLButtonElement>) => void}
        id={id + "." + 2}
      />
    </div>
  );
};
