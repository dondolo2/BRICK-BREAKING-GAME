# Development Notes: Breakout Game

This document tracks development progress, ideas, and planned features for the Breakout Game project.

---

## ✅ Completed Tasks

- Created game grid with user paddle, ball, and blocks
- Implemented block collisions and removal
- Added scoring and win/loss conditions
- Ball bounces correctly off walls, paddle, and blocks
- Fixed collision bugs (phantom blocks and ball getting stuck)
- Responsive grid layout (width set to 98%, height increased to 400px)
- Added restart game functionality
- Introduced level-based colored blocks
- Increased ball speed by 0.2 with every collision

---

## 🚧 Work in Progress / To-Do List

### Game Mechanics

- [ ] Introduce lives or limited retries
- [ ] Add power-ups (e.g., wider paddle, multi-ball, slow ball)
- [ ] Support multiple levels with increasing difficulty

### UI/UX

- [ ] Show a "Level X" label with color changes per level
- [ ] Add animations or visual effects when blocks break
- [ ] Add game start screen and end screen (win/lose)

### Controls

- [ ] Implement mobile touch controls (swipe or tap for paddle movement)
- [ ] Add on-screen buttons for left and right movement on smaller screens
- [ ] Optionally use WASD keys alongside arrow keys

### Code Enhancements

- [ ] Refactor block initialization into a dynamic level builder function
- [ ] Improve collision precision using ball and block bounding boxes
- [ ] Optimize performance for high-speed collisions

---

## Ideas for Later

- Multiplayer mode (two paddles, vertical split-screen)
- Custom block layout editor
- High score saving using `localStorage`
- Sound effects and background music
- Theming (dark/light mode, retro styles, etc.)

---

Feel free to contribute or fork the repo for your own enhancements.
