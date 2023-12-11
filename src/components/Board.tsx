import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@Hooks/useClickOutside";
import { useNotif } from "@/hooks/context/useNotif";
import { HardInput } from "@Components/Inputs";
import { CloseButton, ResetButton, UtilityButtonGroup } from "@Components/Buttons";
import PlayerCard, { Heading, PlayerHandler } from "@/components/PlayerCard";
import { blurInput, createRefsArr, keys, navigateTo } from "../utils/players/helpers";
import { cssModules } from "@CssModules";
import type { MutableRefObject, ReactNode } from "react";
import type { ContainerProps, FocusActionsType, FocusStatesType, Player } from "@Types";
import type { HeadingProps } from "@/components/PlayerCard";

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

const getFinalColor = (isFocus: boolean, color: string, onlyOneFocus: boolean): string => {
  if (isFocus) return color;
  if (onlyOneFocus) return "rgba(255,255,222, 0.3)";
  return "inherit";
};

// COMPONENTS
//--

const Board = ({ focusActions, focusStates, players, update, reset, remove, hideScore }: BoardProps) => {
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

  const resetTarget = (target: HTMLInputElement) => {
    target.value = "";
  };

  const manageRefs = (element: HTMLInputElement | null, i: number) => {
    if (element) inputsRef.current[i] = element;
    if (focusMap[i] && element) {
      navigateTo(inputsRef.current, i, "SELF");
    }
  };

  // ##############

  const handleEnter = (target: HTMLInputElement | HTMLButtonElement, i: number, id: number) => {
    if (!target) return;
    const matrice = inputsRef.current;

    let value = parseFloat(target.value);
    if (target.value === "0") value = 0;
    if (!value && value !== 0) {
      post({ type: "error", message: "Only numbers are allowed 👎" });
      return;
    }

    update(id, value);
    resetTarget(target as HTMLInputElement);
    navigateTo(matrice, i, "NEXT");
  };

  const handleArrowRight = (target: HTMLInputElement | HTMLButtonElement, i: number) => {
    resetTarget(target as HTMLInputElement);
    navigateTo(inputsRef.current, i, "RIGHT");
  };

  const handleArrowLeft = (target: HTMLInputElement | HTMLButtonElement, i: number) => {
    resetTarget(target as HTMLInputElement);
    navigateTo(inputsRef.current, i, "LEFT");
  };

  const handleArrowUp = (target: HTMLInputElement | HTMLButtonElement, i: number) => {
    resetTarget(target as HTMLInputElement);
    navigateTo(inputsRef.current, i, "PREV");
  };

  const handleArrowDown = (target: HTMLInputElement | HTMLButtonElement, i: number) => {
    resetTarget(target as HTMLInputElement);
    navigateTo(inputsRef.current, i, "NEXT");
  };

  const handleEscape = (target: HTMLInputElement | HTMLButtonElement, i: number) => {
    resetTarget(target as HTMLInputElement);
    changeFocus(i, false);
  };

  const keyboardHandlers = {
    [keys.ENTER]: handleEnter,
    [keys.ARROW_RIGHT]: handleArrowRight,
    [keys.ARROW_LEFT]: handleArrowLeft,
    [keys.ARROW_UP]: handleArrowUp,
    [keys.ARROW_DOWN]: handleArrowDown,
    [keys.ESCAPE]: handleEscape,
  };

  //##############

  const pointerHandlers = {
    blur: (index: number): void => {
      changeFocus(index, false);
    },

    focus: (index: number): void => {
      changeFocus(index, true);
    },

    click: (index: number): void => {
      if (!onlyOneFocus.focused) {
        changeFocus(index, true);
      }
    },

    enter: (index: number): void => {
      setHover((p) => {
        const newHoverMap = [...p];
        newHoverMap[index] = true;
        return newHoverMap;
      });
    },

    leave: (index: number): void => {
      setHover((p) => {
        const newHoverMap = [...p];
        newHoverMap[index] = false;
        return newHoverMap;
      });
    },
  };

  return (
    <Players>
      <ul className={cssModules.player["players-list-ctn"]} ref={listRef}>
        {players.map((player, i) => {
          const { name, victoryPtn, id, color } = player;
          const pseudoName = `${id}_${name.toLowerCase()}`;
          const finalColor = getFinalColor(focusMap[i], color, onlyOneFocus.focused);
          const headingProps: HeadingProps = {
            ids: ["up", "bottom"],
            color: finalColor,
            isHover: focusMap[i],
            iconName: "star",
            iconColor: color,
          };
          const keyboard = { keyboardHandlers, args: [i, id] as number[] };
          const pointer = { pointerHandlers, args: [i] as [index: number] };

          return (
            <PlayerHandler drag pointer={pointer} keyboard={keyboard} key={pseudoName}>
              <PlayerCard color={finalColor}>
                <UtilityButtonGroup isOpen={hoverMap[i]}>
                  <CloseButton onClick={() => remove(id)} />
                  <ResetButton onClick={() => reset(id)} />
                </UtilityButtonGroup>
                <Heading {...headingProps}>
                  {name}
                  {hideScore ? "***" : victoryPtn}
                </Heading>
                <HardInput ref={(el) => manageRefs(el, i)} color={color} pseudoName={pseudoName} />
              </PlayerCard>
            </PlayerHandler>
          );
        })}
      </ul>
    </Players>
  );
};

export default Board;

const Players = ({ children }: ContainerProps) => {
  return <div className={cssModules.player["players-view"]}>{children}</div>;
};
