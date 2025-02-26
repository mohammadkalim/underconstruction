class CountdownTimer {
    constructor(targetDate, elements) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = elements;
        this.interval = null;
        this.storageKey = 'countdown_target_date';
        this.initializeFromStorage();
    }

    initializeFromStorage() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.targetDate = parseInt(stored);
        } else {
            localStorage.setItem(this.storageKey, this.targetDate);
        }
    }

    calculateTimeLeft() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }

    updateDisplay(timeLeft) {
        for (const [unit, element] of Object.entries(this.elements)) {
            if (element) {
                element.textContent = timeLeft[unit].toString().padStart(2, '0');
            }
        }
    }

    start() {
        this.updateDisplay(this.calculateTimeLeft());
        
        this.interval = setInterval(() => {
            const timeLeft = this.calculateTimeLeft();
            
            if (Object.values(timeLeft).every(value => value <= 0)) {
                this.stop();
                document.dispatchEvent(new CustomEvent('countdownComplete'));
                return;
            }
            
            this.updateDisplay(timeLeft);
        }, 1000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
