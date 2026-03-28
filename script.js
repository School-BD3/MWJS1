// Interactive Menu Program: FizzBuzz + Create Student + Palindrome Checker
const readline = require("readline");

// --- Інтерфейс для вводу з консолі ---
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- Функція FizzBuzz ---
function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }
    return result;
}

// --- Функція для створення студента ---
function createStudent(name, grades) {
    const sum = grades.reduce((acc, val) => acc + val, 0);
    const average = parseFloat((sum / grades.length).toFixed(2));
    const isPassed = average >= 60;
    return { name, grades, average, isPassed };
}

// --- Функція перевірки паліндрому ---
function isPalindrome(str) {
    // Видаляємо пробіли і переводимо в нижній регістр
    const cleaned = str.replace(/\s+/g, '').toLowerCase();
    // Перевіряємо, чи читається однаково зліва направо і справа наліво
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

// --- Допоміжна функція для вводу числа з перевіркою ---
function getUserNumber(promptMessage, callback) {
    rl.question(promptMessage, (input) => {
        const num = parseInt(input, 10);
        if (isNaN(num) || num <= 0) {
            console.log("Please enter a positive integer!");
            getUserNumber(promptMessage, callback);
        } else {
            callback(num);
        }
    });
}

// --- Допоміжна функція для вводу оцінок ---
function getGrades(count, callback) {
    const grades = [];
    function inputGrade(i) {
        rl.question(`Enter grade ${i + 1}: `, (input) => {
            const grade = parseFloat(input);
            if (isNaN(grade) || grade < 0 || grade > 100) {
                console.log("Please enter a number between 0 and 100!");
                inputGrade(i);
            } else {
                grades.push(grade);
                if (grades.length < count) {
                    inputGrade(grades.length);
                } else {
                    callback(grades);
                }
            }
        });
    }
    inputGrade(0);
}

// --- Основне меню ---
function mainMenu() {
    console.log("\n--- Main Menu ---");
    console.log("1. FizzBuzz");
    console.log("2. Create Student");
    console.log("3. Check Palindrome");
    console.log("0. Exit");

    rl.question("Enter your choice: ", (choice) => {
        switch(choice) {
            case "1":
                getUserNumber("Enter a positive integer for FizzBuzz: ", (n) => {
                    const output = fizzBuzz(n);
                    console.log("Result:", output.join(", "));
                    mainMenu();
                });
                break;
            case "2":
                rl.question("Enter student name: ", (name) => {
                    getUserNumber("How many grades to enter? ", (count) => {
                        getGrades(count, (grades) => {
                            const student = createStudent(name, grades);
                            console.log("Student:", student);
                            mainMenu();
                        });
                    });
                });
                break;
            case "3":
                rl.question("Enter a string to check palindrome: ", (inputStr) => {
                    const result = isPalindrome(inputStr);
                    console.log(`Is palindrome: ${result}`);
                    mainMenu();
                });
                break;
            case "0":
                console.log("Exiting program. Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice! Please enter 0, 1, 2, or 3.");
                mainMenu();
        }
    });
}

// --- Запуск програми ---
mainMenu();