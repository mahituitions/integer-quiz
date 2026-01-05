let quizData = [];
let results = [];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function map(num, range) {
    return ((num + range) / (2 * range)) * 90 + 5;
}

function startQuiz() {
    document.getElementById("quizForm").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("submitBtn").style.display = "block";
    document.getElementById("downloadBtn").style.display = "none";

    const range = Number(document.getElementById("difficulty").value);
    quizData = [];
    
    for (let i = 0; i < 30; i++) {
        let a = randomInt(-range, range);
        let b;
        do { b = randomInt(-range, range); } while (a === b);

        quizData.push({
            a, b,
            correct: a > b ? a : b
        });
    }

    quizData.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question";

        div.innerHTML = `
            <p><strong>Q${i+1}:</strong> Which number is greater?</p>

            <div class="number-line">
                <div class="line"></div>
                <div class="point a" style="left:${map(q.a, range)}%">${q.a}</div>
                <div class="point b" style="left:${map(q.b, range)}%">${q.b}</div>
            </div>

            <div class="options">
                <label><input type="radio" name="q${i}" value="${q.a}"> ${q.a}</label>
                <label><input type="radio" name="q${i}" value="${q.b}"> ${q.b}</label>
            </div>

            <div class="feedback"></div>
        `;

        div.querySelectorAll("input").forEach(input => {
            input.addEventListener("change", () => {
                const feedback = div.querySelector(".feedback");
                if (Number(input.value) === q.correct) {
                    feedback.innerHTML = "<span class='correct-text'>✔ Correct!</span>";
                } else {
                    feedback.innerHTML = `<span class='wrong-text'>✖ Incorrect. Correct answer: ${q.correct}</span>`;
                }
            });
        });

        document.getElementById("quizForm").appendChild(div);
    });
}

document.getElementById("submitBtn").onclick = () => {
    let score = 0;
    const name = document.getElementById("studentName").value || "Anonymous";

    quizData.forEach((q, i) => {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer && Number(answer.value) === q.correct) score++;
    });

    results.push({ name, score });
    document.getElementById("result").innerHTML = `🎉 ${name}, your score is ${score}/30`;
    document.getElementById("downloadBtn").style.display = "block";
};

document.getElementById("downloadBtn").onclick = () => {
    let csv = "Name,Score\n";
    results.forEach(r => csv += `${r.name},${r.score}\n`);

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quiz_results.csv";
    link.click();
};
