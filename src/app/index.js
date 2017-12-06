import React, {Component} from 'react';
import Header from '../header';
import Loading from '../loading';

class App extends Component {

    render() {
        return (
            <div>
                <main className="main-component">
                    { this.props.children }
                </main>
                <Header location={this.props.location.pathname} />
                <Loading />
            </div>
        );
    }
}

export default App;