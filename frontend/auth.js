// =========================================================
// auth.js
// REAL LOGIN + REGISTER
// USING localStorage
// =========================================================

// =========================================================
// REGISTER USER
// =========================================================

function registerUser(){

    // =====================================================
    // GET VALUES
    // =====================================================

    const username = document.getElementById(
        "register-username"
    ).value;

    const email = document.getElementById(
        "register-email"
    ).value;

    const password = document.getElementById(
        "register-password"
    ).value;

    const resultBox = document.getElementById(
        "register-result"
    );

    // =====================================================
    // VALIDATION
    // =====================================================

    if(

        username === "" ||
        email === "" ||
        password === ""

    ){

        resultBox.style.display = "block";

        resultBox.innerHTML =
            "❌ Please fill all fields";

        return;
    }

    // =====================================================
    // GET EXISTING USERS
    // =====================================================

    let users = JSON.parse(

        localStorage.getItem("users")

    ) || [];

    // =====================================================
    // CHECK EMAIL EXISTS
    // =====================================================

    const existingUser = users.find(

        user => user.email === email

    );

    if(existingUser){

        resultBox.style.display = "block";

        resultBox.innerHTML =
            "❌ Email already exists";

        return;
    }

    // =====================================================
    // CREATE NEW USER
    // =====================================================

    const newUser = {

        username: username,

        email: email,

        password: password
    };

    // =====================================================
    // SAVE USER
    // =====================================================

    users.push(newUser);

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

    // =====================================================
    // SUCCESS MESSAGE
    // =====================================================

    resultBox.style.display = "block";

    resultBox.innerHTML =
        "✅ Registration Successful";

    // =====================================================
    // REDIRECT
    // =====================================================

    setTimeout(() => {

        window.location.href =
            "login.html";

    }, 1500);
}

// =========================================================
// LOGIN USER
// =========================================================

function loginUser(){

    // =====================================================
    // GET VALUES
    // =====================================================

    const email = document.getElementById(
        "login-email"
    ).value;

    const password = document.getElementById(
        "login-password"
    ).value;

    const resultBox = document.getElementById(
        "login-result"
    );

    // =====================================================
    // VALIDATION
    // =====================================================

    if(

        email === "" ||
        password === ""

    ){

        resultBox.style.display = "block";

        resultBox.innerHTML =
            "❌ Please fill all fields";

        return;
    }

    // =====================================================
    // GET USERS
    // =====================================================

    const users = JSON.parse(

        localStorage.getItem("users")

    ) || [];

    // =====================================================
    // FIND USER
    // =====================================================

    const validUser = users.find(

        user =>

            user.email === email &&

            user.password === password
    );

    // =====================================================
    // INVALID USER
    // =====================================================

    if(!validUser){

        resultBox.style.display = "block";

        resultBox.innerHTML =
            "❌ Invalid Email or Password";

        return;
    }

    // =====================================================
    // SAVE LOGGED IN USER
    // =====================================================

    localStorage.setItem(

        "loggedInUser",

        JSON.stringify(validUser)

    );

    // =====================================================
    // SUCCESS
    // =====================================================

    resultBox.style.display = "block";

    resultBox.innerHTML =
        "✅ Login Successful";

    // =====================================================
    // REDIRECT
    // =====================================================

    setTimeout(() => {

        window.location.href =
            "index.html";

    }, 1500);
}

// =========================================================
// CHECK LOGIN
// =========================================================

function checkLogin(){

    const user = localStorage.getItem(
        "loggedInUser"
    );

    if(!user){

        window.location.href =
            "login.html";
    }
}

// =========================================================
// LOGOUT
// =========================================================

function logoutUser(){

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";
}