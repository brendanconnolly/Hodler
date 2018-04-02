var schedule = require('node-schedule');

function ScheduledCommand (jobName, command, reoccurrence) {
    this.cmd = command;
    this.name = jobName;
    this.reoccurrenceRule = reoccurrence;
    this.counter = 0;
};

ScheduledCommand.prototype.execute = async function execute () {

    console.log(`running ${this.name}`);
    schedule.scheduleJob(this.name, this.reoccurrenceRule, this.cmd);
};

module.exports = ScheduledCommand;