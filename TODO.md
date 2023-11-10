# TODOS

## FEATURES

- [x] Make the svgData type simple by implementing directly iconName and color as props for Icon component
- [x] Add a reset player score button
- [x] Add a delete player button
- [x] Theme button
- [x] Menu animation
- [x] Add Line Chart to sum up players progression
- [x] Add Bar Chart to sum up players's score data
- [x] Pie chart for total shared scored
- [x] Add Hide scores button
- [ ] UndoRedo

## REFACTORING

- [x] Try to use `useReducer` instead of `useState` for the players state ?
- [x] IMPLEMENT MIN MAX AVG IN PLAYERS
- [x] implement custom hook for update line & bar based on changed detected in players
- [x] study the use of useId()
- [ ] install and config postcss with autoprefixer
- [ ] Move playerBaseStats related states to a context for better scalability with charts ( useChart custom hook)
- [x] reducer for newPlayer startScore (useIntermediateState)
- [x] reducer for newScores boolean map (useIntermediateMap)
- [x] reducer for togglers => useToggle
- [x] reducer for theme => useTheme (context)
- [x] Nav
- [x] PlayerList
- [ ] AddPlayer
- [ ] UndoRedo button

## BUGS & PROPOSITIONS

- [ ] Try to add a column to player list ( by 2)
- [x] refacto css => module, tailwind, styled-components or just css files ?
- [ ] Refacto icon logic (hopefully no icons components and just plain HTML svgs : <a>https://www.jacobparis.com/content/svg-icons</a> or think about make just a class Icon
- [x] Refacto theme logic with context API and localstorage ?
- [ ] Change add player to more designed menu on click
- [x] refacto setterStates to (prev) => ... instead of new = [...old]
- [ ] reducer for transition ? => useTransition
- [ ] reducer for lclStrg => useLocalStorage ?
- [ ] see if backgroundColor , borderColor ect.. can be applied in ChartOption<'chart'>
- [ ] score input changing from controlled to unconrolled
- [ ] cannot score < 0 in score input
- [ ] @legendapp/state ?
- [ ] undoredo functionality => reveal that a party can be a video => useVideo
- [x] Change player icon indicator to another icon & svg
- [x] generator in utils to get color
- [x] change layout when charts for players
- [ ] if unFocus name input is empty, close the panel AddPlayer
- [ ] if focus on x Player, highlight x elements in charts for this player
- [ ] No two players can have the same name
- [ ] Undo Button
- [ ] Tooltip for each element of the nav
