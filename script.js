// Helper function to get random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random integer comparison questions
function generateRandomQuestions(n = 30) {
    const questions = [];
    for (let i = 0; i < n; i++) {
        const a = getRandomInt(-20, 20);
        let b;
        do {
            b = getRandomInt(-20, 20);
        } while (b === a); // ensure different numbers

        questions.push({
            q: `Compare the numbers: ${a} and ${b}. Which is greater?`,
            a: [a, b, "They are equal"],
            correct: a > b ? 0 : (b > a ? 1 : 2),
            aNum: a,
            bNum: b
        });
    }
    return questions;
}

// Randomize array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generate quiz
const quizData = shuffleArray(generateRandomQuestions(30));
const form = document.getElementById("quizForm");

quizData.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${item.q}</p>
        <div class="options">
            ${item.a.map((option, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${i}"> ${option}
                </label>
            `).join('')}
        </div>
    `;
    form.appendChild(questionDiv);
});

// Submit quiz
document.getElementById("submitBtn").addEventListener("click", () => {
    let score = 0;
    const resultDiv = document.getElementById("result");
    let feedback = "<h3>Review:</h3>";

    quizData.forEach((item, index) => {
        const answer = form[`q${index}`].value;
        const qText = `Q${index+1}: ${item.q}`;
        if(answer == item.correct) {
            score++;
        } else {
            feedback += `<p class="wrong">${qText}<br> Your answer: ${answer !== undefined ? item.a[answer] : "No answer"} | Correct answer: <span class="correct">${item.a[item.correct]}</span></p>`;
        }
    });

    resultDiv.innerHTML = `✅ Your Score: ${score} / ${quizData.length}` + feedback;
});
