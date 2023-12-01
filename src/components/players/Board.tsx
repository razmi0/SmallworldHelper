import {
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { useClickOutside, useMidState, useMidAction } from "@Hooks";
import { withViewTransition } from "@Utils";
import {
  SoftInput,
  InputContainer,
  Delete,
  IconButton,
  IconHeading,
  Reset,
  Star,
  FocusManager,
  KeyboardManager,
} from "@Components";
import {
  blurInput,
  getCardStyles,
  // getCardViewTransition,
  initInputsRefs,
  isDeletable,
  keys,
  navigateTo,
  validateIntOnChange,
} from "./helpers";
import { ContainerProps, KeyboardNavigationIdType, Player } from "@Types";
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
  const { isFocus, newScores } = useMidState();
  const { setNewScores, focusActions } = useMidAction();
  const { isOnFocus, setIsOnFocus } = focusActions;
  const inputs = useRef(initInputsRefs(players.length));
  const playerSize = players.length;

  useClickOutside(inputs, () => blurInput(inputs.current));

  useEffect(() => {
    inputs.current = initInputsRefs(playerSize);
    setIsOnFocus(playerSize, false);
  }, [playerSize]);

  const handleBlur = useCallback((i: number) => {
    isOnFocus(i, false);
    setNewScores(i, 0);
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
    const matrice = inputs.current;
    switch (e.key) {
      case keys.ENTER: {
        if (e.currentTarget.value === "-") return;
        update(id /* PLAYER ID */, newScores[i] as number);
        setNewScores(i, 0);
        navigateTo(matrice, i, "NEXT");
        break;
      }

      case keys.BACKSPACE: {
        if (isDeletable(e)) {
          setNewScores(i, 0);
        }
        break;
      }

      case keys.ARROW_RIGHT:
        navigateTo(matrice, i, "RIGHT");
        break;

      case keys.ARROW_LEFT:
        navigateTo(matrice, i, "LEFT");
        break;

      case keys.ARROW_UP:
        navigateTo(matrice, i, "PREV");
        break;

      case keys.ARROW_DOWN:
        navigateTo(matrice, i, "NEXT");
        break;

      case keys.ESCAPE: {
        setNewScores(i, 0);
        isOnFocus(i, false);
        break;
      }

      default:
        break;
    }
  };

  const handleChangeScore = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const raw = e.currentTarget.value;
    const newScore: string | number | undefined = validateIntOnChange(raw);
    if (!newScore) return;
    setNewScores(i, newScore);
  };

  const manageRefs = (element: HTMLInputElement | null, i: number) => {
    if (element) inputs.current[i] = element;
    if (isFocus[i] && element) navigateTo(inputs.current, i, "SELF");
  };

  const onlyOneFocus: boolean = isFocus.filter((focus) => focus).length === 1;
  console.log(onlyOneFocus);

  return (
    <BoardView>
      <ul className={styles["players-list-ctn"]}>
        {players.map((player, i) => {
          const { name, victoryPtn, id, color } = player;
          const pseudoName = `${id}_${name.toLowerCase()}`;
          const finalColor = isFocus[i]
            ? color
            : onlyOneFocus
            ? "rgba(255,255,222, 0.1)"
            : "inherit";
          const softValue = newScores[i] ? newScores[i] : "";

          return (
            <FocusManager
              key={pseudoName}
              onBlur={() => handleBlur(i)}
              onFocus={() => handleFocus(i)}
              onClick={() => handleClicked(i)}
              as="li"
            >
              <KeyboardManager onKeyUp={(event) => handleKeyUp(event, id, i)}>
                <PlayerCard>
                  <PlayerUtilities id={id} remove={remove} reset={reset} isFocus={isFocus[i]} />

                  <PlayerTextContainer>
                    <PlayerText color={finalColor} id="up">
                      {name}
                    </PlayerText>
                    <PlayerText color={finalColor} id="bottom">
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
                  <InputContainer>
                    <SoftInput
                      ref={(element) => manageRefs(element, i)}
                      color={color}
                      onChange={(event) => handleChangeScore(event, i)}
                      value={softValue}
                      pseudoName={pseudoName}
                      // onFocus={() => handleFocus(i)}
                    />
                  </InputContainer>
                </PlayerCard>
              </KeyboardManager>
            </FocusManager>
          );
        })}
      </ul>
      {children}
    </BoardView>
  );
};

const BoardView = ({ children }: ContainerProps) => {
  return <div className={styles["board-view-ctn"]}>{children}</div>;
};

export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={styles["player-stats-ctn"]}>{children}</section>;
};

const PlayerCard = ({ children }: ContainerProps) => {
  const id = useId().replace(/:/g, "_");
  // const duration = Math.min(Math.random(), 1).toFixed(2);
  const classes = getCardStyles("player");
  // const viewTransition = getCardViewTransition(id, duration);

  return (
    <>
      {/* <style>{viewTransition}</style> */}
      <div
        id="WATCH ME"
        className={classes}
        style={{
          viewTransitionName: `player-card${id}`,
        }}
      >
        {children}
      </div>
    </>
  );
};

const PlayerTextContainer = ({ children }: ContainerProps) => {
  return <div className={styles["player-text-ctn"]}>{children}</div>;
};

interface PlayerTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: string;
}
const PlayerText = ({ children, color, ...props }: PlayerTextProps) => {
  return (
    <div {...props} style={{ color }} className={styles["player-text"]}>
      {children}
    </div>
  );
};

const PlayerUtilities = ({
  id,
  reset,
  remove,
  isFocus,
  datatype,
  onKeyUp,
}: PlayerUtilitiesProps) => {
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
        onClick={() => reset(id)}
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
