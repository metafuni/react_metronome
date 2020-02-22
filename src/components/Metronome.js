import React, { Component } from 'react';
import click1 from './audio/click1.wav';
import click2 from './audio/click2.wav';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            bpm: 120,
            count: 0,
            bpmeasure: 4
        }
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }
    handleBpmChange = e => {
        this.setState({
            bpm: e.target.value,
        });
        this.startStop();
    };
    startStop = () => {
        if (!this.state.playing) {
            //toggle metronome on
            this.setState({
                playing: true,
                count: 0
            });
            this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
            console.log(this.state);
        } else {
            //toggle metronome off
            this.setState({
                playing: false
            });
            clearInterval(this.timer);
        }
    }
    playClick = () => {
        const { count, bpmeasure } = this.state;

        if (count % bpmeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.bpmeasure
        }));
    };
    changeMeasure = () => {
        if (document.getElementById('24').checked) {
            this.setState({
                bpmeasure: 2
            });
        }
        if (document.getElementById('34').checked) {
            this.setState({
                bpmeasure: 3
            });
        }
        if (document.getElementById('44').checked) {
            this.setState({
                bpmeasure: 4
            });
        }
        if (document.getElementById('68').checked) {
            this.setState({
                bpmeasure: 6
            });
        }
        if (document.getElementById('78').checked) {
            this.setState({
                bpmeasure: 7
            });
        }
    };
    render() {
        const { playing, bpm } = this.state;
        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input
                        type="range"
                        min="60"
                        max="180"
                        step="5"
                        value={bpm}
                        onChange={this.handleBpmChange}
                    />
                </div>
                <ul className="measure">
                    <li>
                        <input type="radio" name="measuretype" value="24" id="24" onChange={this.changeMeasure} />
                        <label for="24">2/4</label>
                        <span className="check"></span>
                    </li>
                    <li>
                        <input type="radio" name="measuretype" value="34" id="34" onChange={this.changeMeasure} />
                        <label for="34">3/4</label>
                        <span className="check"></span>
                    </li>
                    <li>
                        <input type="radio" name="measuretype" value="44" id="44" onChange={this.changeMeasure} />
                        <label for="44">4/4</label>
                        <span className="check"></span>
                    </li>
                    <li>
                        <input type="radio" name="measuretype" value="68" id="68" onChange={this.changeMeasure} />
                        <label for="68">6/8</label>
                        <span className="check"></span>
                    </li>
                    <li>
                        <input type="radio" name="measuretype" value="78" id="78" onChange={this.changeMeasure} />
                        <label for="78">7/8</label>
                        <span className="check"></span>
                    </li>
                </ul>
                <button onClick={this.startStop}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        )
    }
};

export default Metronome;