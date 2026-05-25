// =========================================================
// script.js
// FINAL COMPLETE AI HEALTH DASHBOARD JAVASCRIPT
// =========================================================

// =========================================================
// CHECK LOGIN
// =========================================================

function checkLogin() {

    const user = localStorage.getItem(
        "loggedInUser"
    );

    if (!user) {

        window.location.href =
            "login.html";
    }
}

// =========================================================
// LOGOUT
// =========================================================

function logoutUser() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";
}

// =========================================================
// SHOW RESULT
// =========================================================

function showResult(elementId, message) {

    const resultBox = document.getElementById(
        elementId
    );

    resultBox.style.display = "block";

    resultBox.innerHTML = message;
}

// =========================================================
// AI SYMPTOM ANALYZER
// =========================================================

function analyzeSymptoms() {

    const temp = Number(
        document.getElementById(
            "symptom-temp"
        ).value
    );

    const cough = Number(
        document.getElementById(
            "symptom-cough"
        ).value
    );

    const headache = Number(
        document.getElementById(
            "symptom-headache"
        ).value
    );

    const vomit = Number(
        document.getElementById(
            "symptom-vomit"
        ).value
    );

    const fatigue = Number(
        document.getElementById(
            "symptom-fatigue"
        ).value
    );

    const throat = Number(
        document.getElementById(
            "symptom-throat"
        ).value
    );

    const bodyPain = Number(
        document.getElementById(
            "symptom-bodypain"
        ).value
    );

    const diarrhea = Number(
        document.getElementById(
            "symptom-diarrhea"
        ).value
    );

    let score = 0;

    if (temp >= 100) {

        score += 2;
    }

    score += cough;
    score += headache;
    score += vomit;
    score += fatigue;
    score += throat;
    score += bodyPain;
    score += diarrhea;

    let condition = "";
    let risk = 0;
    let tips = [];

    if (score <= 3) {

        condition = "Mild Viral Infection";

        risk = 30;

        tips = [

            "Take proper rest",
            "Drink warm fluids",
            "Stay hydrated",
            "Monitor symptoms"

        ];
    }

    else if (score <= 7) {

        condition = "Moderate Infection";

        risk = 60;

        tips = [

            "Take medications",
            "Consult doctor if symptoms continue",
            "Avoid cold foods",
            "Take proper sleep"

        ];
    }

    else {

        condition = "Severe Infection Risk";

        risk = 90;

        tips = [

            "Consult doctor immediately",
            "Monitor temperature regularly",
            "Stay hydrated",
            "Take proper medical care"

        ];
    }

    showResult(

        "symptom-result",

        `
        <h2>🤒 ${condition}</h2>

        <br>

        <h3>
            Health Risk: ${risk}%
        </h3>

        <br>

        <div class="risk-bar-container">

            <div
                class="risk-bar"
                style="width:${risk}%"
            >

                ${risk}%

            </div>

        </div>

        <br>

        <h3>📌 Recommendations</h3>

        <ul class="tips-list">

            ${tips.map(

                tip => `<li>${tip}</li>`

            ).join("")}

        </ul>
        `
    );
}

// =========================================================
// BMI CALCULATOR
// =========================================================

function calculateBMI() {

    const height = document.getElementById(
        "bmi-height"
    ).value;

    const weight = document.getElementById(
        "bmi-weight"
    ).value;

    if (

        height === "" ||
        weight === ""

    ) {

        alert(
            "Please enter height and weight"
        );

        return;
    }

    const heightMeters =
        Number(height) / 100;

    const bmi = (

        Number(weight) /

        (
            heightMeters *
            heightMeters
        )

    ).toFixed(2);

    let category = "";
    let tips = [];

    if (bmi < 18.5) {

        category = "Underweight";

        tips = [

            "Eat nutritious foods",
            "Increase protein intake",
            "Exercise regularly"

        ];
    }

    else if (bmi < 25) {

        category = "Normal Weight";

        tips = [

            "Maintain healthy lifestyle",
            "Continue exercise",
            "Stay hydrated"

        ];
    }

    else if (bmi < 30) {

        category = "Overweight";

        tips = [

            "Reduce junk foods",
            "Increase physical activity",
            "Track calories"

        ];
    }

    else {

        category = "Obese";

        tips = [

            "Consult healthcare professional",
            "Reduce sugar intake",
            "Exercise daily"

        ];
    }

    let bmiPercent = Math.min(

        (bmi / 40) * 100,

        100

    );

    showResult(

        "bmi-result",

        `
        <h2>⚖️ BMI: ${bmi}</h2>

        <br>

        <h3>${category}</h3>

        <br>

        <div class="risk-bar-container">

            <div
                class="risk-bar"
                style="width:${bmiPercent}%"
            >

                ${bmi}

            </div>

        </div>

        <br>

        <h3>📌 Health Tips</h3>

        <ul class="tips-list">

            ${tips.map(

                tip => `<li>${tip}</li>`

            ).join("")}

        </ul>
        `
    );
}

// =========================================================
// HEART PREDICTION
// =========================================================

async function predictHeart() {

    const data = {

        age: Number(
            document.getElementById(
                "heart-age"
            ).value
        ),

        sex: Number(
            document.getElementById(
                "heart-sex"
            ).value
        ),

        trestbps: Number(
            document.getElementById(
                "heart-trestbps"
            ).value
        ),

        chol: Number(
            document.getElementById(
                "heart-chol"
            ).value
        ),

        fbs: Number(
            document.getElementById(
                "heart-fbs"
            ).value
        ),

        thalach: Number(
            document.getElementById(
                "heart-thalach"
            ).value
        ),

        exang: Number(
            document.getElementById(
                "heart-exang"
            ).value
        )

    };

    try {

        const response = await fetch(

            "http://127.0.0.1:8000/predict/heart",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify(data)

            }

        );

        const result = await response.json();

        showResult(

            "heart-result",

            `
            <h2>
                ❤️ ${result.Prediction}
            </h2>

            <br>

            <h3>
                Risk Percentage:
                ${result.RiskPercentage}%
            </h3>

            <br>

            <div class="risk-bar-container">

                <div
                    class="risk-bar"
                    style="
                        width:${result.RiskPercentage}%
                    "
                >

                    ${result.RiskPercentage}%

                </div>

            </div>

            <br>

            <h3>📌 Recommendations</h3>

            <ul class="tips-list">

                ${result.Tips.map(

                    tip => `<li>${tip}</li>`

                ).join("")}

            </ul>
            `
        );

    }

    catch (error) {

        alert(
            "Heart Prediction Failed"
        );

        console.log(error);
    }
}

// =========================================================
// DIABETES PREDICTION
// =========================================================

async function predictDiabetes() {

    const data = {

        gender:
        document.getElementById(
            "dia-gender"
        ).value,

        age: Number(
            document.getElementById(
                "dia-age"
            ).value
        ),

        hypertension: Number(
            document.getElementById(
                "dia-hypertension"
            ).value
        ),

        heart_disease: Number(
            document.getElementById(
                "dia-heart"
            ).value
        ),

        smoking_history:
        document.getElementById(
            "dia-smoking"
        ).value,

        bmi: Number(
            document.getElementById(
                "dia-bmi"
            ).value
        ),

        HbA1c_level: Number(
            document.getElementById(
                "dia-hba1c"
            ).value
        ),

        blood_glucose_level: Number(
            document.getElementById(
                "dia-glucose"
            ).value
        )

    };

    try {

        const response = await fetch(

            "http://127.0.0.1:8000/predict/diabetes",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify(data)

            }

        );

        const result = await response.json();

        showResult(

            "diabetes-result",

            `
            <h2>
                🩸 ${result.Prediction}
            </h2>

            <br>

            <h3>
                Risk Percentage:
                ${result.RiskPercentage}%
            </h3>

            <br>

            <div class="risk-bar-container">

                <div
                    class="risk-bar"
                    style="
                        width:${result.RiskPercentage}%
                    "
                >

                    ${result.RiskPercentage}%

                </div>

            </div>

            <br>

            <h3>📌 Recommendations</h3>

            <ul class="tips-list">

                ${result.Tips.map(

                    tip => `<li>${tip}</li>`

                ).join("")}

            </ul>
            `
        );

    }

    catch (error) {

        alert(
            "Diabetes Prediction Failed"
        );

        console.log(error);
    }
}

// =========================================================
// MENTAL HEALTH PREDICTION
// =========================================================

async function predictMental() {

    const data = {

        sleep_hours: Number(
            document.getElementById(
                "mental-sleep"
            ).value
        ),

        screen_time: Number(
            document.getElementById(
                "mental-screen"
            ).value
        ),

        exercise_minutes: Number(
            document.getElementById(
                "mental-exercise"
            ).value
        ),

        daily_pending_tasks: 5,

        interruptions: 3,

        fatigue_level: Number(
            document.getElementById(
                "mental-fatigue"
            ).value
        ),

        social_hours: Number(
            document.getElementById(
                "mental-social"
            ).value
        ),

        coffee_cups: Number(
            document.getElementById(
                "mental-coffee"
            ).value
        ),

        diet_quality:
        document.getElementById(
            "mental-diet"
        ).value,

        weather:
        document.getElementById(
            "mental-weather"
        ).value,

        mood_score: Number(
            document.getElementById(
                "mental-mood"
            ).value
        )

    };

    try {

        const response = await fetch(

            "http://127.0.0.1:8000/predict/mental",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify(data)

            }

        );

        const result = await response.json();

        showResult(

            "mental-result",

            `
            <h2>
                🧠 ${result.Prediction}
            </h2>

            <br>

            <h3>
                Stress Level:
                ${result.StressLevel}
            </h3>

            <br>

            <div class="risk-bar-container">

                <div
                    class="risk-bar"
                    style="
                        width:${result.StressPercentage}%
                    "
                >

                    ${result.StressPercentage}%

                </div>

            </div>

            <br>

            <h3>📌 Wellness Tips</h3>

            <ul class="tips-list">

                ${result.Tips.map(

                    tip => `<li>${tip}</li>`

                ).join("")}

            </ul>
            `
        );

    }

    catch (error) {

        alert(
            "Mental Health Prediction Failed"
        );

        console.log(error);
    }
}

// =========================================================
// CHATBOT TOGGLE
// =========================================================

function toggleChatbot() {

    const popup = document.getElementById(
        "chatbot-popup"
    );

    if (

        popup.style.display === "flex"

    ) {

        popup.style.display = "none";
    }

    else {

        popup.style.display = "flex";
    }
}

// =========================================================
// AI CHATBOT
// =========================================================

function sendMessage() {

    const input = document.getElementById(
        "chat-input"
    );

    const message = input.value.trim();

    if (message === "") {

        return;
    }

    const chatContainer = document.getElementById(
        "chat-container"
    );

    const userDiv = document.createElement(
        "div"
    );

    userDiv.classList.add(
        "user-message"
    );

    userDiv.innerHTML = message;

    chatContainer.appendChild(userDiv);

    let botReply =

        `
        🤖 I can help with:

        • fever
        • BMI
        • diabetes
        • heart disease
        • stress
        • sleep
        • diet
        • exercise
        `;

    if (

        message.toLowerCase().includes(
            "diabetes"
        )

    ) {

        botReply =

            `
            🩸 Diabetes affects blood sugar levels.

            📌 Tips:
            • Reduce sugar intake
            • Exercise daily
            • Monitor glucose levels

            ✅ Try the Diabetes Prediction tool.
            `;
    }

    else if (

        message.toLowerCase().includes(
            "heart"
        )

    ) {

        botReply =

            `
            ❤️ Heart health is important.

            📌 Tips:
            • Reduce oily foods
            • Exercise regularly
            • Monitor BP & cholesterol

            ✅ Try the Heart Prediction tool.
            `;
    }

    else if (

        message.toLowerCase().includes(
            "stress"
        )

    ) {

        botReply =

            `
            🧠 Stress affects mental health.

            📌 Tips:
            • Sleep properly
            • Reduce screen time
            • Practice meditation

            ✅ Try the Mental Health Prediction tool.
            `;
    }

    setTimeout(() => {

        const botDiv = document.createElement(
            "div"
        );

        botDiv.classList.add(
            "bot-message"
        );

        botDiv.innerHTML = botReply;

        chatContainer.appendChild(botDiv);

        chatContainer.scrollTop =
            chatContainer.scrollHeight;

    }, 500);

    input.value = "";
}