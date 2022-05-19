# Checkers:
The essence of the site is that two users can go to the board and play checkersю
# Mockup:
Link to the [Figma](https://www.figma.com/file/oSHOgpNtamcxMSHV0lEXua/Untitled?node-id=8%3A179) project. Also, the pdf version is in the mockup folder.
# Functions:
### 1)Create board
One of the friends who wants to play creates a board for the game and waits for the second user to join.
### 2)Join to board
If the user has a link to the board, he can connect to the board using it
### 3)Moves history
On the right side of the board, the history of moves made by users will be displayed.
### 4)Send invitation
If the user knows the nickname of his friend, he can send him an invitation to the game. The user who received the invitation will have a pop-up window with buttons: "Accept" and "Reject" the invitation.
### 5)Help Menu
This page will contain additional information for users: the rules of the game of checkers, a description of the site (something like this readme file), etc.
# Data models desription:
Model User:
- username
- Email
- password
Model Board:
- position on the board (text field, will be parsed)
- one-to-one relationship with model History
Model History:
- one-to-many with Message model
Model Message (logging player actions on the board):
- text (move and eaten checkers)
- time
