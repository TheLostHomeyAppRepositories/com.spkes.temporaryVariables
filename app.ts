import Homey from 'homey';
import {Evaluator} from './Evaluator';

class TemporaryVariables extends Homey.App {

    /**
     * onInit is called when the app is initialized.
     */
    async onInit() {
        let evaluator = new Evaluator();

        this.homey.flow.getActionCard('calculate-float').registerRunListener((args, state) => {
            let resultCalc = evaluator.evaluate(args.formula.replace(",", "."));
            if(resultCalc == Evaluator.INVALID_NUMBER) {
                this.error(args.formula + " is not a mathematical expression")
            }
            return {
                result: resultCalc
            }
        });

        this.homey.flow.getActionCard('calculate-int').registerRunListener((args, state) => {
            let resultCalc = evaluator.evaluate(args.formula.replace(",", "."), true);
            if(resultCalc == Evaluator.INVALID_NUMBER) {
                this.error(args.formula + " is not a mathematical expression")
            }
            return {
                result: resultCalc
            }
        });

        this.homey.flow.getActionCard('temporary-number').registerRunListener((args, state) => {
            return {
                result: args.number
            }
        });

        this.homey.flow.getActionCard('temporary-string').registerRunListener((args, state) => {
            return {
                result: args.string
            }
        });

        this.log('TemporaryVariables has been initialized');
    }

    private async writeLog(message: string) {
        let oldLogs = this.homey.settings.get('logs');
        if (oldLogs === null || oldLogs === undefined || oldLogs === '') oldLogs = '[]';
        const newMessage: JSON = <JSON><any>{date: new Date().toLocaleString(), message};
        const savedHistory = JSON.parse(oldLogs);
        if (savedHistory.length >= 15) savedHistory.pop();
        savedHistory.unshift(newMessage);
        this.homey.settings.set('logs', JSON.stringify(savedHistory));
    }

    public log(message: string) {
        this.writeLog(message).then();
        this.homey.log(message);
    }

    public error(message: string) {
        this.writeLog(message).then();
        this.homey.error(message);
    }

}

module.exports = TemporaryVariables;
