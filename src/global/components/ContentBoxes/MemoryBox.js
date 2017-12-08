import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from '../../../services/NumberFormat';
import FaClock from 'react-icons/lib/fa/clock-o';
import {connect} from 'react-redux';
import {showMemory} from '../../actions';
import './index.sass';

class MemoryBox extends Component {

    render() {
        const {className, ...props} = this.props;

        return (<div className={classnames('MemoryBox', 'box-container', className)}>

                    <a href onClick={(e) => {
                        e.preventDefault();
                        this.props.show(this.props.item);
                    }}>
                        {this.props.item.thumbnail_url !== null && <img src={this.props.item.thumbnail_url}/>}
                        <h2>{this.props.item.title}</h2>

                        <p>
                            {this.props.item.summary && this.props.item.summary.length > 120 ? this.props.item.summary.substring(0, 120) + '...' : this.props.item.summary}
                        </p>
                        <div className="action-container">
                            <div className="action first">
                                <FaClock/> {NumberFormat.formatTimeString(this.props.item.memory_date)}
                            </div>
                        </div>
                    </a>
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        show: (memory) => {
            dispatch(showMemory(memory));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryBox);
