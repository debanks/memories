import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from '../../../services/NumberFormat';
import FaClock from 'react-icons/lib/fa/clock-o';
import {connect} from 'react-redux';
import './index.sass';

class MemoryBox extends Component {

    render() {
        const {className, ...props} = this.props;

        let url = "/content/" + this.props.item.item_id + "/" + this.props.item.headline;

        return (<div className={classnames('MemoryBox', 'box-container', className)}>

                    <a href={url}>
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
        insertObject: (action, method, object) => {
            dispatch();
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryBox);
