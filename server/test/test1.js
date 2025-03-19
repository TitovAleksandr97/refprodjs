function getRandomNumber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve(Math.random());
            } else {
                reject('Ошибка генерации числа');
            }
        }, 2000);
    });
}

function displayResult(a) {
    console.log(`Сгенерировано число: ${a}`);
}
function handleError(error) {
    console.log(`Ошибка: ${error}`);
}

getRandomNumber()
    .then((result) => {
        displayResult(result);
    })
    .catch((error) => {
        handleError(error);
    });
