const quizData = [
    { q: "Which is greater: 4 or 7?", a: ["4","7","They are equal"], correct: 1 },
    { q: "Which is greater: -5 or -2?", a: ["-5","-2","They are equal"], correct: 1 },
    { q: "Which is smaller: 0 or -3?", a: ["0","-3","They are equal"], correct: 1 },
    { q: "Compare: -8 and -10. Which is warmer on a thermometer?", a: ["-8","-10","They are the same"], correct: 0 },
    { q: "Compare: 6 and -1. Which is greater?", a: ["6","-1","They are equal"], correct: 0 },
    { q: "A submarine dives to -15 meters, then rises to -5 meters. Which position is closer to the surface?", a: ["-15","-5","Same distance"], correct: 1 },
    { q: "The temperature was -4°C in the morning and 3°C in the afternoon. Which is warmer?", a: ["-4°C","3°C","Same temperature"], correct: 1 },
    { q: "You owe $8 yesterday and $3 today. Which amount is 'less debt'?", a: ["-8","-3","Same"], correct: 1 },
    { q: "A hiker is at -2 meters and climbs to 5 meters. Which altitude is higher?", a: ["-2","5","Same"], correct: 1 },
    { q: "Compare: -7 and 0. Which is higher on a number line?", a: ["-7","0","They are equal"], correct: 1 },
    { q: "On a number line, which comes first: -3 or 2?", a: ["-3","2","They are at the same position"], correct: 0 },
    { q: "Which is closer to zero: -1 or -6?", a: ["-1","-6","Same distance"], correct: 0 },
    { q: "Which is farther from zero: 8 or -12?", a: ["8","-12","Same distance"], correct: 1 },
    { q: "Compare: -9 and -4. Which is to the right on a number line?", a: ["-9","-4","They are at the same position"], correct: 1 },
    { q: "Compare: -10, 0, and 5. Which is the greatest?", a: ["-10","0","5"], correct: 2 },
    { q: "A freezer is at -18°C, a room is at 22°C. Which is warmer?", a: ["-18°C","22°C","Same"], correct: 1 },
    { q: "A mountain peak is 3 meters above sea level and a valley is -7 meters. Which is higher?", a: ["3 meters","-7 meters","Same"], correct: 0 },
    { q: "A bank account had -20 dollars and then -5 dollars. Which balance is better?", a: ["-20","-5","Same"], correct: 1 },
    { q: "A plane is flying at -50 meters and then rises to 100 meters. Which is higher?", a: ["-50","100","Same"], correct: 1 },
    { q: "Compare the scores: -2 points or 4 points. Which is higher?", a: ["-2","4","Equal"], correct: 1 },
    { q: "Which is greater: -1, -3, 2?", a: ["-3","-1","2"], correct: 2 },
    { q: "Which is smaller: 0, -5, 3?", a: ["0","-5","3"], correct: 1 },
    { q: "Compare: -7, 7. Which is closer to zero?", a: ["-7","7","Same distance"], correct: 2 },
    { q: "Which integer is greater: -12 or -8?", a: ["-12","-8","Same"], correct: 1 },
    { q: "A thermometer shows -15°C and -10°C. Which indicates a warmer temperature?", a: ["-15°C","-10°C","Same"], correct: 1 },
    { q: "A diver goes from -3 meters to -9 meters. Which is shallower?", a: ["-3","-9","Same"], correct: 0 },
    { q: "Compare: -1, 0, 1. Which is the greatest?", a: ["-1","0","1"], correct: 2 },
    { q: "A submarine is at -50 meters, another at -30 meters. Which is closer to the surface?", a: ["-50","-30","Same"], correct: 1 },
    { q: "Compare: -100, -50, 0. Which is the largest?", a: ["-100","-50","0"], correct: 2 },
    { q: "A thermometer shows -3°C in the morning and 2°C in the afternoon. Which reading is warmer?", a: ["-3°C","2°C","They are the same"], correct: 1 },
];

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

document.getElementById("submitBtn").addEventListener("click", () => {
    let score = 0;
    quizData.forEach((item, index) => {
        const answer = form[`q${index}`].value;
        if(answer == item.correct) score++;
    });
    document.getElementById("result").innerText = `Your Score: ${score} / ${quizData.length}`;
});
