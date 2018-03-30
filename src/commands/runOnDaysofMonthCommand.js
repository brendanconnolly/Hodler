const ScheduleCommand = require(`./scheduledCommand.js`);

function RunOnDaysOfMonthCommand(jobName, command, days, hourToFire = 3, minuteToFire = 0) {
    this.cmd = command;
    this.name = jobName;
    this.reoccurrenceRule = { date: [...days], minute: minuteToFire, hour: hourToFire };
    this.counter = 0;
};

RunOnDaysOfMonthCommand.prototype.execute = () => {
    let schedule = new ScheduleCommand(this.name, this.cmd);
    schedule.execute();
}