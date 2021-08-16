class CountdownTimer {
  constructor(targetDate, selector) {
    this.refs = {
      linkDaysLabel: document.querySelector(`${selector}, [data-value="days"]`),
      linkHoursLabel: document.querySelector(`${selector}, [data-value="hours"]`),
      linkMinsLabel: document.querySelector(`${selector}, [data-value="mins"]`),
      linkSecsLabel: document.querySelector(`${selector}, [data-value="secs"]`),
    };
    this.newTargetDate = targetDate;
    this.selector = selector;
  }

  timerCalc = () => {
    const startTime = Date.now();
    const newTargetDay = this.newTargetDate.targetDate;

    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - newTargetDay.getTime();
      const currentDeltaTime = deltaTime - (currentTime - startTime);
      const { days, hours, mins, secs } = this.countElemTimer(currentDeltaTime);

      this.refs.linkDaysLabel.textContent = days;
      this.refs.linkHoursLabel.textContent = hours;
      this.refs.linkMinsLabel.textContent = mins;
      this.refs.linkSecsLabel.textContent = secs;
      if (currentDeltaTime <= 0) {
        clearInterval(timerId);
      }
    }, 1000);
  };
  init() {
    this.timerCalc();
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  countElemTimer = time => {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  };
}
const timerOne = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});
timerOne.init();
