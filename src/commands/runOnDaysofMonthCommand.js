const ScheduleCommand = require(`./scheduledCommand.js`);

function RunOnDaysOfMonthCommand(commands, days, hourToFire = 3, minuteToFire = 0) {
    this.cmds = commands;
    this.reoccurrenceRule = { date: [...days], minute: minuteToFire, hour: hourToFire };
    this.counter = 0;
};

RunOnDaysOfMonthCommand.prototype.execute = async function () {

    this.cmds.forEach((value, key) => {
        let schedule = new ScheduleCommand(key, value);
        schedule.execute();
    });

};

module.exports = RunOnDaysOfMonthCommand;