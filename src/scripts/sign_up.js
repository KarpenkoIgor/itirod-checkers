// Will be used in next work!
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {auth} from '../api/firebase-config.js'

var button = document.getElementById("create-account");
// var email = document.getElementById("email");
// var password = document.getElementById("password");

// email.onchange() = (event) => {
//     setRegisterEmail(event.target.value);
// }

// password.onchange() = (event) => {
//     setRegisterPassword(event.target.value);
// }

// const [registerEmail, setRegisterEmail] = useState("");
// const [registerPassword, setRegisterPassword] = useState("");

const register = async () => {
    try {        
        // const user = await createUserWithEmailAndPassword(
        //     auth,
        //     registerEmail,
        //     registerPassword
        // );
        // console.log(user);
        location.href = "menu_page.html?";
    }
    catch(error){
        console.log(error.message);
    }
}

button.onclick = register
