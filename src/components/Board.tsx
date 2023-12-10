import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useClickOutside } from "@Hooks/useClickOutside";
import { useNotif } from "@/hooks/context/useNotif";
import { IconHeading } from "@Components/Icons";
import { HardInput } from "@Components/Inputs";
import { CloseButton, ResetButton, UtilityButtonGroup } from "@Components/Buttons";
import { EventsManager, KeyboardManager } from "@Components/Utils";
import { blurInput, createRefsArr, keys, navigateTo } from "../utils/players/helpers";
import { cssModules, getCardStyles } from "@Components/styles";
import type { HTMLAttributes, KeyboardEvent, MutableRefObject, ReactNode } from "react";
import type { ContainerProps, FocusActionsType, FocusStatesType, Player } from "@Types";

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
  const [hoverMap, setHover] = useState<boolean[]>(new Array(players.length).fill(false));
  const { post } = useNotif();
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
    const target = e.target as HTMLInputElement;
    if (!target) return;
    switch (e.key) {
      case keys.ENTER:
        let value = parseFloat(target.value);
        if (target.value === "0") value = 0;
        if (!value && value !== 0) {
          post({ type: "error", message: "Only numbers are allowed 👎" });
          return;
        }
        update(id, value);
        resetTarget(target);
        navigateTo(matrice, i, "NEXT");
        break;

      case keys.ARROW_RIGHT:
        resetTarget(target);
        navigateTo(matrice, i, "RIGHT");
        break;

      case keys.ARROW_LEFT:
        resetTarget(target);
        navigateTo(matrice, i, "LEFT");
        break;

      case keys.ARROW_UP:
        resetTarget(target);
        navigateTo(matrice, i, "PREV");
        break;

      case keys.ARROW_DOWN:
        resetTarget(target);
        navigateTo(matrice, i, "NEXT");
        break;

      case keys.ESCAPE: {
        resetTarget(target);
        changeFocus(i, false);
        break;
      }

      default:
        break;
    }
  };

  const resetTarget = (target: HTMLInputElement) => {
    target.value = "";
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
              ? "rgba(255,255,222, 0.3)"
              : "inherit";

            return (
              <Draggable key={pseudoName}>
                <EventsManager
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
                            iconName="star"
                            variant="heading"
                          />
                          {hideScore ? "***" : victoryPtn}
                        </PlayerText>
                      </PlayerTextContainer>
                      <HardInput
                        ref={(el) => manageRefs(el, i)}
                        color={color}
                        pseudoName={pseudoName}
                      />
                    </PlayerCard>
                  </KeyboardManager>
                </EventsManager>
              </Draggable>
            );
          })}
        </ul>
        {children}
      </BoardView>
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
