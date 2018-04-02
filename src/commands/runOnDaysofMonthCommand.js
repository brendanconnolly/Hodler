const ScheduleCommand = require(`./scheduledCommand.js`);
var schedule = require('node-schedule');

function RunOnDaysOfMonthCommand (commands, days, hourToFire = 3, minuteToFire = 0) {
    this.cmds = commands;
    //this.reoccurrenceRule = { date: [...days], minute: minuteToFire, hour: hourToFire };
    this.reoccurrenceRule = { minute: new schedule.Range(0, 60) };
    this.counter = 0;
};

RunOnDaysOfMonthCommand.prototype.execute = async function execute () {

    this.cmds.forEach((value, key) => {
        let schedule = new ScheduleCommand(key, value);
        schedule.execute();
    });

};

module.exports = RunOnDaysOfMonthCommand;