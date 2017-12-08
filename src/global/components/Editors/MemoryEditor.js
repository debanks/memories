import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {
    Button,
    Grid,
    Row,
    Col,
    FormControl,
    Alert
} from 'react-bootstrap';
import {format} from "d3-format";
import {timeFormat, utcFormat} from "d3-time-format";
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {updateUrls, hideEditor, updateImageOne} from '../../actions';
import FaClose from 'react-icons/lib/fa/close';
import ImageUpload from '../ImageUpload/imageUpload';
import {requestApiUpdate, requestApiInsert} from '../../../api/actions';
import ApiService from '../../../api/ApiService';
import './index.sass';
import FaSpinner from 'react-icons/lib/fa/spinner';

class ArticleEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
            title: this.props.memory ? this.props.memory.title : "",
            summary: this.props.memory ? this.props.memory.summary : "",
            content: this.props.memory ? this.props.memory.content : "",
            memory_date: this.props.memory ? this.props.memory.memory_date : "",
            thumbnail_url: this.props.memory ? this.props.memory.thumbnail_url : "",
            contentState: this.props.memory ? JSON.parse(this.props.memory.content) : {
                "entityMap": {},
                "blocks": [{
                    "key": "637gr",
                    "text": "",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [{
                        length: 13,
                        offset: 0,
                        style: "fontsize-18"
                    }],
                    "entityRanges": [],
                    "data": {}
                }]
            }
        };

        this.props.setUrls(this.state.thumbnail_url);

        this.updateSelected = this.updateSelected.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.inputParse = this.inputParse.bind(this);
    }

    onEditorStateChange(editorState) {

        this.setState({
            contentState: editorState,
        });
    };

    updateSelected(e, key, value) {
        e.preventDefault();

        let arr = this.state[key];

        let index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(value);
        }

        this.setState({
            [key]: arr
        });
        return false;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state[name] = value;

        this.setState(state);
    }

    inputParse(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state[name] = parseFloat(value);

        this.setState(state);
    }

    submit(event) {

        event.preventDefault();

        let errorMessage = "";
        let memory = {};
        let content = this.state.contentState;
        let htmlContent = draftToHtml(content);

        if (this.props.image_loading) {
            errorMessage += "Image loading in. "
        }

        if (!this.state.title || this.state.title === '' || !/^([A-Za-z0-9 \-!?,;_@<>:"'|~%]*)$/.test(this.state.title)) {
            errorMessage += 'Title must be filled in and not contain & or / or \\. ';
        } else {
            memory.title = this.state.title;
        }

        if (!this.props.image_one || this.props.image_one === '') {
            memory.thumbnail_url = null;
        } else {
            memory.thumbnail_url = this.props.image_one;
        }

        if (this.state.memory_date === '' || this.state.memory_date === null) {
            errorMessage += "Need Date. "
        } else {
            memory.memory_date = this.state.memory_date;
        }

        if (this.state.summary === '' || this.state.summary === null) {
            errorMessage += "Need summary. "
        } else {
            memory.summary = this.state.summary;
        }

        if (!htmlContent || htmlContent === '') {
            errorMessage += 'Content must be filled in. ';
        } else {
            memory.content = JSON.stringify(content);
            memory.htmlContent = htmlContent;
        }

        if (errorMessage === "") {
            if (this.props.memory) {
                this.props.updateObject(this.props.finishAction, 'memories', memory, this.props.memory.id);
            } else {
                this.props.insertObject(this.props.finishAction, 'memories', memory);
            }
            this.props.editorHide();
        } else {
            this.setState({errorMessage: errorMessage});
        }
    }

    uploadImage(event) {
        console.log(event);
        return ApiService.performImageUrl(event);
    }

    render() {
        const {className} = this.props;

        return (
            <div className={classnames('MemoryEditor', 'Editor', className)}>
                <a href className="editor-close" onClick={(e) => {e.preventDefault(); this.props.editorHide()}}><FaClose/></a>
                <h2>{this.props.memory ? 'Edit Memory' : 'Create New Memory'}</h2>
                {this.state.errorMessage !== "" && <Alert bsStyle="danger">
                    {this.state.errorMessage}
                </Alert>}
                <Grid>
                    <Row>
                        <Col md={8}>
                            <div className="input-container">
                                <label>Title</label>
                                <input name="title" type="text" value={this.state.title}
                                       onChange={this.handleInputChange} className="title-input"/>
                            </div>

                            <div className="input-container">
                                <label>Summary</label>
                                <FormControl className="summary-area" defaultValue={this.state.summary} name="summary"
                                             onChange={this.handleInputChange} componentClass="textarea"/>
                            </div>

                            <div className="input-container">
                                <label>Content</label>
                                <Editor
                                    initialContentState={this.state.contentState}
                                    onContentStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'colorPicker', 'link', 'image', 'remove', 'history'],
                                        inline: {
                                            inDropdown: false,
                                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
                                        },
                                        fontSize: {
                                            options: [18, 24, 36],
                                            defaultFontSize: 18
                                        },
                                        fontFamily: {
                                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']
                                        },
                                        colorPicker: {
                                            colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                                        },
                                        image: {
                                            urlEnabled: true,
                                            uploadEnabled: true,
                                            alignmentEnabled: true,
                                            uploadCallback: this.uploadImage,
                                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                            alt: {present: false, mandatory: false},
                                            defaultSize: {
                                                height: 'auto',
                                                width: 'auto',
                                            },
                                        }
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={4}>

                            <div className="input-container">
                                <label>Thumbnail URL</label>
                                <ImageUpload action={updateImageOne}/>
                                {this.props.image_loading && this.props.image_one === "" &&
                                <FaSpinner className="spin image-spin"/>}
                                {this.props.image_one !== "" &&
                                <img className="art-image" src={this.props.image_one}/>}
                            </div>

                            <div className="input-container">
                                <label>Date</label>
                                <input defaultValue={this.state.memory_date} type="date" name="memory_date" onChange={this.handleInputChange}/>
                            </div>

                            <Button onClick={(e) => {
                                e.preventDefault();
                                this.props.editorHide()
                            }}>Close</Button>
                            <Button onClick={(e) => this.submit(e)}>Submit</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
        image_one: state.global.image_one,
        image_loading: state.global.image_loading,
        show: state.global.show,
        memory: state.global.editMemory,
        items: state.header.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        insertObject: (action, method, object) => {
            dispatch(requestApiInsert(method, object, action));
        },
        updateObject: (action, method, object, objectId) => {
            dispatch(requestApiUpdate(method, object, objectId, action));
        },
        setUrls: (thumb) => {
            dispatch(updateUrls(thumb));
        },
        editorHide: () => {
            dispatch(hideEditor())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);