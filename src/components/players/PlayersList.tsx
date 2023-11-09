import { ReactNode, KeyboardEvent, ChangeEvent } from "react";
import styles from "./_.module.css";
import { ContainerProps, InputContainer } from "../containers/Containers";
import { Player } from "../../types";
import { IconButton, IconHeading } from "../icons/Icons";
import { useIntermediate, useIntermediateDispatch, useToggle } from "../../hooks";
import { headingStarIconStyle, playerIconStyle } from "../icons/data";
import { Star, Reset, Delete } from "../icons/Icons";
import { Spacer, Flex } from "../Utils";
import { SoftInput } from "../Input";

/* players, reset, remove, update, */
type PlayerListType = {
  children?: ReactNode;
  players: Player[];
  reset: (id: number) => void;
  remove: (id: number) => void;
  update: (id: number, score: number) => void;
};

export const PlayerStatsContainer = ({ children }: ContainerProps) => {
  return <section className={styles["players-ctn"]}>{children}</section>;
};

export const PlayerListElement = ({ children }: ContainerProps) => {
  return <li className={styles["list-element-ctn"]}>{children}</li>;
};

export const PlayerTextContainer = ({ children }: ContainerProps) => {
  return <div className={styles["player-text-ctn"]}>{children}</div>;
};

export const PlayerText = ({ children, color }: { children: ReactNode; color: string }) => {
  return (
    <p style={{ color }} className={styles["player-text"]}>
      {children}
    </p>
  );
};

export const PlayersList = ({ players, remove, reset, update }: PlayerListType) => {
  const { booleanMap, newScores } = useIntermediate();
  const { setBooleanMap, setNewScores } = useIntermediateDispatch();
  const { isScoreHidden } = useToggle();

  const handleBlur = (i: number) => {
    setBooleanMap(i, false);
    setNewScores(i, 0);
  };

  const handleFocus = (i: number) => {
    setBooleanMap(i, true);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, id: number, i: number) => {
    if (e.key === "Enter") {
      update(id, newScores[i]);
      e.currentTarget.blur();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const newScore = Number(e.currentTarget.value);
    if (isNaN(newScore)) return;
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
                  isHover={booleanMap[i]}
                  color={color}
                  icon={Star}
                  svgData={headingStarIconStyle}
                />
                <PlayerText color={booleanMap[i] ? color : "inherit"}>
                  {name} : {isScoreHidden ? "*****" : victoryPtn}
                </PlayerText>
              </PlayerTextContainer>
              <Spacer />
              <IconButton
                onClick={() => reset(id)}
                icon={Reset}
                iconName="reset"
                svgData={playerIconStyle}
              />
              <IconButton
                onClick={() => remove(id)}
                icon={Delete}
                iconName="delete"
                svgData={playerIconStyle}
              />
            </Flex>
            <InputContainer>
              <SoftInput
                color={color}
                onFocus={() => handleFocus(i)}
                onBlur={() => handleBlur(i)}
                onKeyUp={(e) => handleKeyUp(e, id, i)}
                onChange={(e) => handleChange(e, i)}
                value={newScores[i] == 0 ? "" : newScores[i]}
                subjectId={subjectId}
              />
            </InputContainer>
          </PlayerListElement>
        );
      })}
    </ul>
  );
};
