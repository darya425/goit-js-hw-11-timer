import './styles.css';

const daysLeft = document.querySelector('[data-value="days"]');
const hoursLeft = document.querySelector('[data-value="hours"]');
const minsLeft = document.querySelector('[data-value="mins"]');
const secsLeft = document.querySelector('[data-value="secs"]');

// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

class CountdownTimer {
    constructor({ selector, targetDate}) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.start();
    }

    start() {
        const startDate = this.targetDate; // стартовое время
        const updateClock = () => {
            const currentDate = Date.now(); // текущее время
            const deltaTime = startDate - currentDate; // разница текущего и стартового
            const time = this.getDateComponents(deltaTime); // вызов функции индуских часов
            const deadline = deltaTime < 0;

            if (deadline) {
                this.stop();
                return;
            }

            this.updateDaysFace(time);
        }

        updateClock();
        this.intervalId = setInterval(updateClock, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    pad(value) { // функция превращения времени во время
        return String(value).padStart(2, '0');
    }

    getDateComponents(time) {

        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    updateDaysFace ({ days, hours, mins, secs }) {  // вызывается в телефункции setInterval
        daysLeft.textContent = `${days}`;
        hoursLeft.textContent = `${hours}`;
        minsLeft.textContent = `${mins}`;
        secsLeft.textContent = `${secs}`;
    };
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021')
});
