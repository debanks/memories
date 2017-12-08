import React, {Component} from 'react';
import './index.sass';
import {browserHistory} from 'react-router';
import {InputGroup, Button, FormControl} from 'react-bootstrap';

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anniversary: "",
            canAttempt: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkDate = this.checkDate.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state[name] = value;

        this.setState(state);
    }

    checkDate() {
        if (this.state.canAttempt && this.state.anniversary === '2014-06-28') {
            localStorage.setItem("date", this.state.anniversary);
            browserHistory.push("/");
        } else {
            this.setState({canAttempt: false});
        }
    }

    render() {
        const {className, ...props} = this.props;

        return (
            <div className="SplashScreen">
                <div className="splash-content">
                    {this.state.canAttempt && <form onSubmit={(e) => {
                        e.preventDefault();
                        this.checkDate();
                    }}>
                        <div className="question">What's Our Anniversary?</div>
                        <InputGroup>
                            <FormControl type="date" name="anniversary" onChange={this.handleInputChange}/>
                            <InputGroup.Button>
                                <Button bsStyle="success" type="submit">Go</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </form>}
                    {this.state.canAttempt === false && <span className="red">Not Right!</span>}
                </div>
            </div>
        )
    }
}

export default SplashScreen;