import React, { Component } from 'react';
import './Calculator.css';

import Display from '../components/Display';
import Button from '../components/Button';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    state = { ...initialState };

    constructor(props) {
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState });
    };

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const operators = ['+', '-', '*', '/'];
            const values = [...this.state.values]

            operators.forEach(sings => {
                if (currentOperation === sings) {
                    // eslint-disable-next-line no-eval
                    values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`); 
                    values[1] = 0;
                }
            })

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(buttonContent) {
        if (buttonContent === '.' && this.state.displayValue.includes('.')) return;

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + buttonContent;

        this.setState({ displayValue, clearDisplay: false });

        if (buttonContent !== '.') {
            const index = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[index] = newValue;
            this.setState({ values });
            console.log(values)
        }
    }


    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button lable="AC" click={this.clearMemory} triple></Button>
                <Button lable="/" click={this.setOperation} operation></Button>
                <Button lable="7" click={this.addDigit}></Button>
                <Button lable="8" click={this.addDigit}></Button>
                <Button lable="9" click={this.addDigit}></Button>
                <Button lable="*" click={this.setOperation} operation></Button>
                <Button lable="4" click={this.addDigit}></Button>
                <Button lable="5" click={this.addDigit}></Button>
                <Button lable="6" click={this.addDigit}></Button>
                <Button lable="-" click={this.setOperation} operation></Button>
                <Button lable="1" click={this.addDigit}></Button>
                <Button lable="2" click={this.addDigit}></Button>
                <Button lable="3" click={this.addDigit}></Button>
                <Button lable="+" click={this.setOperation} operation></Button>
                <Button lable="0" click={this.addDigit} double></Button>
                <Button lable="." click={this.addDigit}></Button>
                <Button lable="=" click={this.setOperation} operation></Button>
            </div>
        )
    }
}