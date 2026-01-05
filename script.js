function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestions(count = 30) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        let a = getRandomInt(-20, 20);
        let b;
        do { b = getRandomInt(-20, 20); } while (b === a);

        questions.push({
            a,
            b,
            question: `Compare the numbers ${a} and ${b}. Which is greater?`,
            options: [a, b, "They are equal"],
            correct: a > b ? 0 : 1
        });
    }
    return questions.sort(() => Math.random() - 0.5);
}

const quizData = generateQuestions();
const form = document.getElementById("quizForm");

function mapToLine(num) {
    return ((num + 20) / 40) * 90 + 5;
}

quizData.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";

    qDiv.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${q.question}</p>

        <div class="number-line">
            <div class="line"></div>
            <div class="point a" style="left:${mapToLine(q.a)}%">${q.a}</div>
            <div class="point b" style="left:${mapToLine(q.b)}%">${q.b}</div>
        </div>

        <div class="options">
            ${q.options.map((opt, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${i}">
                    ${opt}
                </label>
            `).join("")}
        </div>
    `;
    form.appendChild(qDiv);
});

document.getElementById("submitBtn").addEventListener("click", () => {
    let score = 0;
    let feedback = "<h3>📌 Review Your Mistakes</h3>";

    quizData.forEach((q, index) => {
        const answer = form[`q${index}`].value;
        const qBlock = form.children[index];
        const points = qBlock.querySelectorAll(".point");

        if (answer == q.correct) {
            score++;
            points[q.correct].classList.add("correct-point");
        } else {
            if (answer !== undefined) {
                points[answer].classList.add("wrong-point");
            }
            points[q.correct].classList.add("correct-point");

            feedback += `
                <p class="wrong">
                    Q${index + 1}: ${q.question}<br>
                    Correct answer: <span class="correct">${q.options[q.correct]}</span>
                </p>
            `;
        }
    });

    document.getElementById("result").innerHTML =
        `🎉 Your Score: ${score} / ${quizData.length}` + feedback;
});
