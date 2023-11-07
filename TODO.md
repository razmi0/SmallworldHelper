# TODOS

- [x] Make the svgData type simple by implementing directly iconName and color as props for Icon component
- [x] Add a reset player score button
- [x] Add a delete player button
- [x] Theme button
- [x] Menu animation
- [x] Add Line Chart to sum up players progression
- [x] Add Bar Chart to sum up players's score data
- [x] Pie chart for total shared scored
- [x] Add Hide scores button
- [x] Change player icon indicator to another icon & svg
- [x] generator in utils to get color
- [x] change layout when charts for players
- [ ] if unFocus name input is empty, close the panel AddPlayer
- [ ] if focus on x Player, highlight x elements in charts for this player

- [x] Try to use `useReducer` instead of `useState` for the players state ?
- [ ] Try to add a column to player list ( by 2)
- [x] IMPLEMENT MIN MAX AVG IN PLAYERS
- [x] implement custom hook for update line & bar based on changed detected in players
- [x] study the use of useId()
- [ ] install and config postcss with autoprefixer
- [ ] Move playerBaseStats related states to a context for better scalability with charts ( useChart custom hook)

- [x] refacto css => module, tailwind, styled-components or just css files ?
- [ ] Refacto icon logic (hopefully no icons components and just plain HTML svgs : <a>https://www.jacobparis.com/content/svg-icons</a> or think about make just a class Icon
- [ ] Refacto theme logic with context API and localstorage ?
- [ ] Change add player to more designed menu on click
- [x] refacto setterStates to (prev) => ... instead of new = [...old]
