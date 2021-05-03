const timer = {
    start() {
        const startTime = Date.now(); // стартовое время

        setInterval(() => { // интервал времени (секунда), выполняется:
            const currentTime = Date.now(); // текущее время
            const deltaTime = currentTime - startTime; // разница текущего и стартового
            const { hours, mins, secs } = getTimeComponents(deltaTime); // вызов функции индуских часов
            // console.log({ hours, mins, secs });
            console.log(`${hours}:${mins}:${secs}`);
        }, 1000);
    },
};

timer.start();

const pad = value => { // функция превращения времени во время
    return String(value).padStart(2, '0');
}


const getTimeComponents = time => {
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
}
