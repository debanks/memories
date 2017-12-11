import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {requestContent, clearExtraContent} from '../../actions';
import MemoryBox from '../ContentBoxes/MemoryBox';
import './index.sass';

class ContentColumns extends Component {

    constructor(props) {
        super(props);
        this.props.clearContent();
    }

    render() {
        const {className, ...props} = this.props;

        let contentComp = (content, key) => <div className="home-box" key={key}>
            <MemoryBox item={content} performUpdate={this.props.performUpdate} user={this.props.user} openModal={this.props.openModal}/>
        </div>;

        let content = this.props.content.concat(this.props.addedContent);
        let rows = this.props.rows ? this.props.rows : 10;

        return (
            <div className="ContentColumns">
                {this.props.title && <h2 className="align-center">{this.props.title}</h2>}
                {this.props.width >= 1600 && <Grid>
                    <Row>
                        <Col md={3}>
                            {content.map(function (content, key) {
                                if (key % 4 !== 0 || Math.ceil((key + 1) / 4) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                        <Col md={3}>
                            {content.map(function (content, key) {
                                if (key % 4 !== 1 || Math.ceil((key + 1) / 4) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                        <Col md={3}>
                            {content.map(function (content, key) {
                                if (key % 4 !== 2 || Math.ceil((key + 1) / 4) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                        <Col md={3}>
                            {content.map(function (content, key) {
                                if (key % 4 !== 3 || Math.ceil((key + 1) / 4) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                    </Row>
                </Grid>}
                {this.props.width >= 1100 && this.props.width < 1600 && <Grid>
                    <Row>
                        <Col md={4}>
                            {content.map(function (content, key) {
                                if (key % 3 !== 0 || Math.ceil((key + 1) / 3) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                        <Col md={4}>
                            {content.map(function (content, key) {
                                if (key % 3 !== 1 || Math.ceil((key + 1) / 3) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                        <Col md={4}>
                            {content.map(function (content, key) {
                                if (key % 3 !== 2 || Math.ceil((key + 1) / 3) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                    </Row>
                </Grid>}
                {this.props.width >= 600 && this.props.width < 1100 && <Grid>
                    <Row>
                        <Col md={6}>
                            {content.map(function (content, key) {
                                if (key % 2 !== 0 || Math.ceil((key + 1) / 2) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                        <Col md={6}>
                            {content.map(function (content, key) {
                                if (key % 2 !== 1 || Math.ceil((key + 1) / 2) > rows) {
                                    return;
                                }
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                    </Row>
                </Grid>}
                {this.props.width < 600 && <Grid>
                    <Row>
                        <Col xs={12}>
                            {content.map(function (content, key) {
                                return contentComp(content, key);
                            }, this)}
                        </Col>
                    </Row>
                </Grid>}
                {content.length === 0 && <div className="no-content"> No Content Yet</div>}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
        addedContent: state.global.content,
        page: state.global.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: (url, page) => {
            dispatch(requestContent(url, page));
        },
        clearContent: () => {
            dispatch(clearExtraContent());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentColumns);