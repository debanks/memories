import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from '../../../services/NumberFormat';
import FaClock from 'react-icons/lib/fa/clock-o';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import {showEditor, hideMemory} from '../../actions';
import './index.sass';

class Memory extends Component {

    render() {
        const {className, user, memory, ...props} = this.props;

        return (<div className={classnames('Memory', className)} onClick={this.props.hide}>
                <div className="memory-content" onClick={(e) => e.stopPropagation()}>
                    <h2>{memory.title}
                        <div className="pull-right">
                            {user && <Button onClick={() => this.props.editorShow('memory', memory)}>Edit</Button>}
                            {user && <Button onClick={this.props.hide} bsStyle="danger">Close</Button>}
                        </div>
                    </h2>

                    <span className="article-html"
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(JSON.parse(memory.content)))}}></span>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        memory: state.global.memory,
        user: state.header.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hide: () => {
            dispatch(hideMemory());
        },
        editorShow: (editor, memory) => {
            dispatch(showEditor(editor, memory));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memory);
