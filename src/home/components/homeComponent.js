import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import ArticleBox from "../../global/components/ContentBoxes/MemoryBox";
import ContentColumns from '../../global/components/Content/ContentColumns';
import {helper} from "react-stockcharts";
let {fitWidth} = helper;

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skill: 'all'
        }
    }

    componentWillMount() {
        this.props.loadContent();
    }

    render() {
        const {className} = this.props;
        const meta = {
            title: 'Our Memories',
            description: 'Thoughts on everything we have been through',
            canonical: 'http://davisbanks.com',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,developer,engineer,mysql,php,react,web'
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('HomeComponent', className)}>
                    <ContentColumns content={this.props.memories} width={this.props.width}/>
                </div>
            </DocumentMeta>
        )
    }
}

HomeComponent = fitWidth(HomeComponent);

export default HomeComponent;
