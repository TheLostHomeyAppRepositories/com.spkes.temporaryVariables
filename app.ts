import Homey from 'homey';
import {Evaluator} from './Evaluator';

class TemporaryVariables extends Homey.App {

    async onInit() {
        let evaluator = new Evaluator();

        this.homey.flow.getActionCard('calculate-float').registerRunListener((args, state) => {
            let resultCalc = evaluator.evaluate(args.formula.replace(",", "."));
            if (resultCalc == Evaluator.INVALID_NUMBER) {
                this.error(args.formula + " is not a mathematical expression")
                throw new Error(args.formula + " is not a mathematical expression");
            }
            return {
                result: resultCalc
            }
        });

        this.homey.flow.getActionCard('calculate-int').registerRunListener((args, state) => {
            let resultCalc = evaluator.evaluate(args.formula.replace(",", "."), true);
            if (resultCalc == Evaluator.INVALID_NUMBER) {
                this.error(args.formula + " is not a mathematical expression")
                throw new Error(args.formula + " is not a mathematical expression");
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

        this.homey.flow.getActionCard('temporary-boolean').registerRunListener((args, state) => {
            return {
                result: args.boolean
            }
        });

        this.log('TemporaryVariables has been initialized');
    }
}

module.exports = TemporaryVariables;
