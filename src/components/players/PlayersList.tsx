import { ReactNode, KeyboardEvent, ChangeEvent, useEffect, useState, useCallback } from "react";
import styles from "./_.module.css";
import { ContainerProps, InputContainer } from "../containers/Containers";
import { Player } from "../../types";
import { IconButton, IconHeading } from "../icons/Icons";
import { useIntermediate, useIntermediateDispatch } from "../../hooks";
import { headingStarIconStyle, playerIconStyle } from "../icons/data";
import { Star, Reset, Delete } from "../icons/Icons";
import { Spacer, Flex } from "../Utils";
import { SoftInput } from "../Input";
import {
  onBackspace,
  onEnter,
  throwError,
  validateOnChange,
  withViewTransition,
} from "../../utils";

/* players, reset, remove, update, */
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
  const [softs, setSofts] = useState<HTMLInputElement[]>([]);
  const { booleanMap: isActive, newScores } = useIntermediate();
  const { setBooleanMap, setNewScores } = useIntermediateDispatch();

  useEffect(() => {
    setSofts(() => allSofts());
  }, [players]);

  const handleBlur = (i: number) => {
    withViewTransition(() => setBooleanMap(i, false));
    setNewScores(i, 0);
  };

  const handleFocus = (i: number) => {
    withViewTransition(() => setBooleanMap(i, true));
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, id: number, i: number) => {
    if (onEnter(e)) {
      focusNextSoft(softs, e.currentTarget.id);
      update(id, newScores[i]);
      setNewScores(i, 0);
    } else if (onBackspace(e)) {
      setNewScores(i, 0);
    }
  };

  const handleChangeScore = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const raw = e.currentTarget.value;
    const newScore = validateOnChange(raw);
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
                  isHover={isActive[i]}
                  color={color}
                  icon={Star}
                  svgData={headingStarIconStyle}
                />
                <PlayerText color={isActive[i] ? color : "inherit"}>
                  {name} : {hideScore ? "***" : victoryPtn}
                </PlayerText>
              </PlayerTextContainer>
              <Spacer />
              <PlayerUtilities id={id} remove={remove} reset={reset} isFocus={isActive[i]} />
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

// HELPERS
//--

const allSofts = (name = '[name="soft-input"]') => {
  return Array.from(document.querySelectorAll<HTMLInputElement>(name));
};

const focusNextSoft = (softs: HTMLInputElement[], targetId: string) => {
  const softIndex = softs.findIndex((soft) => soft.id === targetId);
  if (softIndex === -1) {
    throwError("SoftInput not found");
  }
  const nextSoftInput = softIndex + 1 < softs.length ? softs[softIndex + 1] : softs[0];
  nextSoftInput.focus();
};
