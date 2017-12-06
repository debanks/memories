import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Navbar, MenuItem, NavDropdown, Nav, Button} from 'react-bootstrap';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import MemoryEditor from '../../global/components/Editors/MemoryEditor';

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showThought: false,
            login: false,
            creds: {
                password: "",
                email: ""
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        if (this.props.user) {
            this.props.getItems();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state.creds[name] = value;

        this.setState(state);
    }

    render() {
        const {className} = this.props;

        let accountIcon = (user) => <span>
            <img className="user-icon" src={user.profile_photo_url}/> {user.name}
        </span>;

        return (
            <div className={classnames('HeaderComponent', className)}>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Our Memories</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav className="no-divider" pullRight>
                            {this.props.user && <NavDropdown title={accountIcon(this.props.user)} id="basic-nav-dropdown-1">
                                <MenuItem onClick={() => this.props.editorShow('memory')}>Add Memory</MenuItem>
                                <MenuItem divider/>
                                <MenuItem href="" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.handleLogout()
                                }}>Logout</MenuItem>
                            </NavDropdown>}
                            {!this.props.user && <li className={"login" + (this.state.login ? " active" : "")}>
                                <a onClick={() => {this.setState({login: true});}} href="#">
                                    Log In
                                </a>
                                {this.state.login === true && <RootCloseWrapper noWrap onRootClose={() => this.setState({login: false})}><div className="login-container">
                                    <form onSubmit={(e) => this.props.login(e, this.state.creds)}>
                                        <input name="email" placeholder="Email" onChange={this.handleInputChange}/>
                                        <input name="password" type="password" placeholder="Password" onChange={this.handleInputChange}/>
                                        <Button type="submit" bsStyle="primary">Login</Button>
                                    </form>
                                </div></RootCloseWrapper>}
                            </li>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.show === 'memory' && <MemoryEditor/>}
            </div>
        )
    }
}

export default HeaderComponent;