# TODOS

## FEATURES

- [x] Add a reset player score button
- [x] Add a delete player button
- [x] Dark/Light mode
- [x] Add Line Chart to sum up players progression
- [x] Add Bar Chart to sum up players's score data
- [x] Pie chart for total shared scored
- [x] Add Hide scores button
- [x] UndoRedo
- [x] Save / Load
- [x] Keyboard navigation
- [ ] Clock

## REFACTORING

- [x] Menu animation
- [x] Try to use `useReducer` instead of `useState` for the players state ?
- [x] IMPLEMENT MIN MAX AVG IN PLAYERS
- [x] Make the svgData type simple by implementing directly iconName and color as props for Icon component
- [x] implement custom hook for update line & bar based on changed detected in players
- [x] study the use of useId()
- [ ] install and config postcss with autoprefixer
- [x] reducer for newPlayer startScore (useMidState)
- [x] reducer for newScores boolean map (useMidStateMap)
- [x] reducer for togglers => useToggle
- [x] reducer for theme => useTheme (context)
- [x] Nav
- [x] PlayerList
- [x] UndoRedo button
- [x] AddPlayer
- [x] keyboard Navigation fetch element in the dom not virtual dom (slower)
- [x] Add total points to middle of donut chart
- [x] Add beautifuld body background animation https://reflect.app/
- [ ] Move focusReset timer in his hook

## BUGS & PROPOSITIONS

- [x] refacto css => module, tailwind, styled-components or just css files ?
- [x] Refacto icon logic (hopefully no icons components and just plain HTML svgs : <a>https://www.jacobparis.com/content/svg-icons</a> or think about make just a class Icon
- [x] Refacto theme logic with context API and localstorage ?
- [x] Change add player to more designed menu on click
- [x] refacto setterStates to (prev) => ... instead of new = [...old]
- [x] see if backgroundColor , borderColor ect.. can be applied in ChartOption<'chart'>
- [x] score input changing from controlled to unconrolled
- [x] cannot score < 0 in score input
- [ ] @legendapp/state ?
- [x] undoredo functionality => reveal that a party can be a video => useVideo
- [x] Change player icon indicator to another icon & svg
- [x] generator in utils to get color
- [x] change layout when charts for players
- [x] if unFocus name input is empty, close the panel AddPlayer
- [x] if focus on x Player, highlight x elements in charts for this player
- [x] No two players can have the same name
- [x] Undo Button
- [x] Tooltip for each element of the nav
- [ ] TEAMS
- [ ] load multiple parties
- [x] Third col for ui (settings, theme, addplayer, save, load...)
- [x] KINDA FIX ?? chart BUG infinite if too much spamming on undo redo button
