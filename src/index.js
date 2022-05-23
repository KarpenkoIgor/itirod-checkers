//import { GamePage } from './components/game';
import { Help } from './components/help';
import { LogIn } from './components/login';
import { Menu } from './components/menu';
import { SignUp } from './components/sign_up';
import { Welcome } from './components/welcome';
import { WelcomeHeader } from './components/welcome_header';
import { MenuHeader } from './components/menu_header';
import { GameHeader } from './components/game_header';

import { Accordion } from './scripts/help';

import { Game } from './game_logic';

import {
    signInWithEmail,
    signUpWithEmail,
    signOutFromApp,
    monitorAuthState,
  } from "./api/firebase-config";


import "./styles/board.css";
import "./styles/game.css";
import "./styles/help.css";
import "./styles/login.css";
import "./styles/menu.css";
import "./styles/sign_up.css";
import "./styles/welcome.css";
import "./styles.css";
import { AuthErrorCodes } from '@firebase/auth';


const setUserData = (newData) => {
    userData = JSON.parse(JSON.stringify(newData));
    console.log(newData);
    console.log(JSON.stringify(newData));
    console.log(JSON.parse(JSON.stringify(newData)));
  };


let userData = {
    id: "",
    name: "",
    hasSavedGame: false,
    isSignedIn: false,
  };

let gameStarted = false;

let game;

const mainContainer = document.getElementById("main-container");
const headerContainer = document.getElementById("header-container");

const addOnClick = (id, callback) => {
    document.getElementById(id).addEventListener("click", callback);
  };

const addMoveAction = (i, j, callback) => {
    if(j%2 == i%2){
        document.getElementById(("space" + i + j).toString()).addEventListener("click", () => {
            game.clicked(i,j);
        });
    }
  };

const RenderWelcome = () => {
    headerContainer.innerHTML = WelcomeHeader();
    mainContainer.innerHTML = Welcome();
    addOnClick("get-started", () => {
        RenderSignUp();
    });
    addOnClick("sign-up", () => {
        RenderSignUp();
    });
    addOnClick("log-in", () => {
        RenderLogIn();
    });
}

const RenderSignUp = () => {
    headerContainer.innerHTML = WelcomeHeader();
    mainContainer.innerHTML = SignUp();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    addOnClick("create-account", () => {
        signUpWithEmail(email.value, password.value);
    });

    addOnClick("sign-up", () => {
        RenderSignUp();
    });
    addOnClick("log-in", () => {
        RenderLogIn();
    });
}

const RenderLogIn = () => {
    headerContainer.innerHTML = WelcomeHeader();
    mainContainer.innerHTML = LogIn();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    addOnClick("log-in-user", () => {
        signInWithEmail(email.value, password.value);
    });

    addOnClick("sign-up", () => {
        RenderSignUp();
    });
    addOnClick("log-in", () => {
        RenderLogIn();
    });
}

const RenderMenu = () => {
    headerContainer.innerHTML = MenuHeader();
    mainContainer.innerHTML = Menu();

    const userEmail = document.getElementById("user-email");
    userEmail.textContent = userData.name;
    addOnClick("create-board", () => {
        gameStarted = true;
        RenderGame();
    });
    addOnClick("join-to-board", () => {
        gameStarted = true;
        RenderGame();
    });
    addOnClick("help", () => {
        RenderHelp();
    });
    addOnClick("log-out", () => {
        setUserData({
          id: "",
          name: "",
          hasSavedGame: false,
          isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
      });
}

const RenderGame= () => {
    headerContainer.innerHTML = GameHeader();
    game = new Game();
    mainContainer.innerHTML = game.drawBoard();
    game.textarea = document.getElementById("message");

    for (var j = 0; j < 8; j++) {
        for (var i = 0; i < 8; i++){
            addMoveAction(i, j, () => game.clicked);
        }
    }   

    addOnClick("menu", () => {
        gameStarted = false;
        RenderMenu();
    });
    addOnClick("log-out", () => {
        gameStarted = false;
        setUserData({
          id: "",
          name: "",
          hasSavedGame: false,
          isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
    });
    // addOnClick("copy", () => {
    //     let copyText = document.getElementById("url-to-board");
    //     copyText.select();
    //     document.execCommand("copy");
    // })
}

const RenderHelp = () => {
    headerContainer.innerHTML = GameHeader();
    mainContainer.innerHTML = Help();
    addOnClick("menu", () => {
        RenderMenu();
    });
    addOnClick("log-out", () => {
        setUserData({
          id: "",
          name: "",
          hasSavedGame: false,
          isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
      });
    document.querySelectorAll('details').forEach((el) => {
        new Accordion(el);
      });
}

RenderWelcome();
monitorAuthState(setUserData, RenderMenu);