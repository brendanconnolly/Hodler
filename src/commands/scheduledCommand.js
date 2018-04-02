var schedule = require('node-schedule');

function ScheduledCommand (jobName, command, reoccurrence) {
    this.cmd = command;
    this.name = jobName;
    this.reoccurrenceRule = reoccurrence;
    this.counter = 0;
};

ScheduledCommand.prototype.execute = function () {

    console.log(`running ${this.name}`);
    let job = schedule.scheduleJob(this.name, this.reoccurrenceRule, this.cmd);
    //console.log(`Next on ${job.nextInvocation}`);
};

module.exports = ScheduledCommand;