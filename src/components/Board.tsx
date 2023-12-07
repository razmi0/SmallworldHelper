import {
  ChangeEvent,
  HTMLAttributes,
  KeyboardEvent,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMid } from "@Context/useMid";
import { useClickOutside } from "@Hooks/useClickOutside";
import { Star, IconHeading } from "@Components/Icons";
import { BlockyInput } from "@Components/Inputs";
import { EventsManager, KeyboardManager } from "@Components/Utils";
import {
  blurInput,
  createRefsArr,
  isDeletable,
  keys,
  navigateTo,
  validateIntOnChange,
} from "../utils/players/helpers";
import { ContainerProps, FocusActionsType, FocusStatesType, Player } from "@Types";
import { cssModules, getCardStyles } from "@Components/styles";
import { CloseButton, ResetButton, UtilityButtonGroup } from "@Components/Buttons";

/* players, reset, remove, update, */
// TYPES
//--

type BoardProps = {
  children?: ReactNode;
  players: Player[];
  hideScore: boolean;
  reset: (id: number) => void;
  remove: (id: number) => void;
  update: (id: number, score: number) => void;
  focusActions: Omit<FocusActionsType, "changeFocusLength">;
  focusStates: Omit<FocusStatesType, "noFocus">;
};

// type PlayerUtilitiesProps = {
//   id: number;
//   reset: (id: number) => void;
//   remove: (id: number) => void;
//   focused: boolean;
//   datatype?: KeyboardNavigationIdType;
//   onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
// };

// COMPONENTS
//--

const Board = ({
  focusActions,
  focusStates,
  players,
  update,
  reset,
  remove,
  hideScore,
  children,
}: BoardProps) => {
  // console.time("Board");
  const [hoverMap, setHover] = useState<boolean[]>(new Array(players.length).fill(false));
  const { setNewScores, newScores } = useMid();
  const { changeFocus, resetFocus } = focusActions;
  const { focusMap, onlyOneFocus } = focusStates;

  const inputsRef = useRef(createRefsArr(players.length));
  const listRef = useRef<HTMLUListElement>(null) as MutableRefObject<HTMLUListElement>;
  const playerSize = players.length;

  useClickOutside(listRef, () => {
    blurInput(inputsRef.current);
    resetFocus();
  });

  useEffect(() => {
    inputsRef.current = createRefsArr(playerSize);
    setHover(new Array(playerSize).fill(false));
  }, [playerSize]);

  const handleKeyUp = (
    e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    id: number,
    i: number
  ) => {
    const matrice = inputsRef.current;
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
        changeFocus(i, false);
        setNewScores(i, 0);
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
    if (element) inputsRef.current[i] = element;
    if (focusMap[i] && element) {
      navigateTo(inputsRef.current, i, "SELF");
    }
  };

  const events = {
    blur: (index: number) => {
      changeFocus(index, false);
      setNewScores(index, 0);
    },
    focus: (index: number) => {
      changeFocus(index, true);
    },
    click: (index: number) => {
      if (!onlyOneFocus.focused) {
        changeFocus(index, true);
      }
    },
    hover: (isHover: boolean, index: number) => {
      setHover((p) => {
        const newHoverMap = [...p];
        newHoverMap[index] = isHover;
        return newHoverMap;
      });
    },
  };

  return (
    <>
      <BoardView>
        <ul className={cssModules.player["players-list-ctn"]} ref={listRef}>
          {players.map((player, i) => {
            const { name, victoryPtn, id, color } = player;
            const pseudoName = `${id}_${name.toLowerCase()}`;
            const finalColor = focusMap[i]
              ? color
              : onlyOneFocus.focused
              ? "rgba(255,255,222, 0.3)" // no focus card font color
              : "inherit";
            const softValue = newScores[i] ? newScores[i] : "";

            return (
              <EventsManager
                key={pseudoName}
                onBlur={() => events.blur(i)}
                onFocus={() => events.focus(i)}
                onClick={() => events.click(i)}
                onMouseEnter={() => events.hover(true, i)}
                onMouseLeave={() => events.hover(false, i)}
                as="li"
              >
                <KeyboardManager onKeyDown={(e) => handleKeyUp(e, id, i)}>
                  <PlayerCard color={finalColor}>
                    <UtilityButtonGroup isOpen={hoverMap[i]}>
                      <CloseButton onClick={() => remove(id)} />
                      <ResetButton onClick={() => reset(id)} />
                    </UtilityButtonGroup>
                    <PlayerTextContainer>
                      <PlayerText color={finalColor} id="up">
                        {name}
                      </PlayerText>
                      <PlayerText color={finalColor} id="bottom">
                        <IconHeading
                          animationName="rotate"
                          isHover={focusMap[i]}
                          color={color}
                          icon={Star}
                          variant="heading"
                        />
                        {hideScore ? "***" : victoryPtn}
                      </PlayerText>
                    </PlayerTextContainer>
                    <BlockyInput
                      ref={(el) => manageRefs(el, i)}
                      color={color}
                      onChange={(event) => handleChangeScore(event, i)}
                      value={softValue}
                      pseudoName={pseudoName}
                    />
                  </PlayerCard>
                </KeyboardManager>
              </EventsManager>
            );
          })}
        </ul>
        {children}
      </BoardView>
      {/* {console.timeEnd("Board")} */}
    </>
  );
};

export default Board;

const BoardView = ({ children }: ContainerProps) => {
  return <div className={cssModules.player["board-view-ctn"]}>{children}</div>;
};

export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={cssModules.player["player-stats-ctn"]}>{children}</section>;
};

interface PlayerCardProps extends ContainerProps {
  color: string;
}
const PlayerCard = ({ children, color }: PlayerCardProps) => {
  const classes = getCardStyles("player");
  const back = getCardStyles("player-back");
  const backShadowColor = color === "inherit" ? "rgba(255,255,222, 0.3)" : color;

  return (
    <div
      className={back}
      style={{ boxShadow: `0px 0px 1px 1px ${backShadowColor}` }}
      color={backShadowColor}
    >
      <div id="card" className={classes}>
        {children}
      </div>
    </div>
  );
};

const PlayerTextContainer = ({ children }: ContainerProps) => {
  return <div className={cssModules.player["player-text-ctn"]}>{children}</div>;
};

interface PlayerTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: string;
}
const PlayerText = ({ children, color, ...props }: PlayerTextProps) => {
  return (
    <div {...props} style={{ color }} className={cssModules.player["player-text"]}>
      {children}
    </div>
  );
};

// const PlayerUtilities = ({
//   id,
//   reset,
//   remove,
//   focused,
//   datatype,
//   onKeyUp,
// }: PlayerUtilitiesProps) => {
//   const removeAtId = useCallback(() => remove(id), [id]);
//   const resetAtId = useCallback(() => reset(id), [id]);

//   const visibility = !focused ? "hidden" : "initial";
//   const finalDatatype = datatype ? datatype : "";

//   return (
//     <>
//       {focused && (
//         <div className={cssModules.player["player-utilities-ctn"]}>
//           <IconButton
//             sx={{
//               visibility: visibility,
//             }}
//             variant={"utility"}
//             onClick={resetAtId}
//             icon={Reset}
//             iconName="reset"
//             datatype={finalDatatype}
//             onKeyUp={onKeyUp as (e: KeyboardEvent<HTMLButtonElement>) => void}
//             id={id + "." + 1}
//           />
//           <IconButton
//             sx={{
//               visibility: visibility,
//             }}
//             variant={"utility"}
//             onClick={removeAtId}
//             icon={Delete}
//             iconName="delete"
//             datatype={finalDatatype}
//             onKeyUp={onKeyUp as (e: KeyboardEvent<HTMLButtonElement>) => void}
//             id={id + "." + 2}
//           />
//         </div>
//       )}
//     </>
//   );
// };
