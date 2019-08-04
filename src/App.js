import React, { Component } from "react";
import { Form, Text } from "informed";
import "./App.css";
import Slider, { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';

class App extends Component {
  state = {};

  toPercent(num, den) {
    return Math.floor(num / den * 100) || '0';
  }

  render() {
    let us = this.state.us;
    let intl = this.state.intl;
    let money = this.state.money;
    let total = us + intl + money;

    let targetUs = this.state.targetUs / 100.0;
    let targetIntl = 1 - targetUs;

    let addUs = targetUs * (intl + us + money) - us;
    let addIntl = money - addUs;
    // let addUs = 0.2 * (3 * intl + 3 * money - 2 * us);
    // let addIntl = 0.2 * (2 * (money + us) - 3 * intl);

    if (addUs < 0) {
      addIntl = money;
      addUs = 0;
    }

    if (addIntl < 0) {
      addUs = money;
      addIntl = 0;
    }

    let usText = <h2>${addUs.toFixed(2)} → US ({this.toPercent(addUs + us, total)}%)</h2>;
    let intlText = <h2>${addIntl.toFixed(2)} → INT'L ({this.toPercent(addIntl + intl, total)}%)</h2>;

    return (
      <div className="App">
        <h1>Equility</h1>
        <Form
          onChange={formState =>
            this.setState({
              money: Math.abs(parseFloat(formState.values.allocatee)) || 0,
              us: Math.abs(parseFloat(formState.values.us)) || 0,
              intl: Math.abs(parseFloat(formState.values.intl)) || 0,
              targetUs: localStorage.getItem('targetUs') || 60,
              targetIntl: (100 - localStorage.getItem('targetUs')) || 40
            })
          }
        >
          {({ formState }) => (
            <div className="inputs">
              <label>
                CASH
                <Text field="allocatee" />
                US
                <Text field="us" />
                INT'L
                <Text field="intl" />
              </label>
            </div>
          )}
        </Form>
        {usText}
        {intlText}
        <h4>US {this.state.targetUs}% / {100 - this.state.targetUs}% INT'L </h4>
        <Slider
          defaultValue={localStorage.getItem('targetUs') || 60}
          min={0} max={100}
          step={5}
          onChange={value => {
            this.setState({ targetUs: value })
            localStorage.setItem('targetUs', value)
          }} />
        <h3>
          Investing in securities involves risks, and there is always the
          potential of losing money when you invest in securities. Before
          investing, consider your investment objectives, charges, and expenses.
          This tool is designed to assist clients in achieving discrete
          financial goals. They are not intended to provide comprehensive tax
          advice or financial planning with respect to every aspect of a
          client's financial situation and do not incorporate specific
          investments that clients hold elsewhere. Past performance does not
          guarantee future results, and the likelihood of investment outcomes
          are hypothetical in nature. Any historical returns, expected returns,
          or probability projections may not reflect actual future performance.
          All securities involve risk and may result in loss.
          Read our <a href="https://www.youtube.com/watch?v=lOeE06FUZL4" target="_blank">Full Disclosure</a> for more details.
        </h3>
      </div>
    );
  }
}

export default App;
