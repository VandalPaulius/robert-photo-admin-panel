import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoadingIcon } from 'components';
import styles from './styles.scss';
import {
    Sidebar,
    /* Gallery, */
    About,
    Contact,
    GeneralSettings,
} from './components';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            config: {},
            loaded: false,
            headerOffset: null,
        };

        this.actions = this.initActions();
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
            loadConfig: () => {
                setTimeout(() => {
                    this.setState({
                        loaded: true,
                        config: {
                            about: [{
                                id: 'asdasd',
                                image: true,
                                alt: 'Fabulous Rob',
                                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/26805064_10215337302006544_272682501393385032_n.jpg?_nc_cat=0&oh=787c47aa5cfa28f1b779fb828030c984&oe=5C02BFE3',
                            }, {
                                id: 'ds4fsd6f4sd',
                                text: true,
                                heading: true,
                                content: 'Lorem Ipsum',
                            }, {
                                id: '6ds5fsdf56ad',
                                text: true,
                                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                            }, {
                                id: '56dsf4sd6f465484dsf565',
                                image: true,
                                alt: 'More of him',
                                url: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/17156214_10212262683222996_3831772522503633545_n.jpg?_nc_cat=0&oh=8de33e8b224c176a85f96298bddbc35e&oe=5C00B928',
                            }, {
                                id: 'sdfsd989223a',
                                text: true,
                                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                            }],
                            contact: {
                                contactCaption: 'Fancy a chat?',
                                messagePlaceholder: 'Hi, ...',
                                emailPlaceholder: 'Email',
                            },
                            gallery: {
                                getPrintedButtonName: 'Get Printed',
                                orderPrintButtonContent: 'Send Enquiry',
                                orderMessagePlaceholder: 'Hi, my address is...',
                                orderEmailPlaceholder: 'Email',
                            },
                            general: {
                                websiteName: 'Robert Photo',
                                copyrightNote: 'Robert Arthur Photography ©',
                                instagramUrl: 'https://www.instagram.com/ridebmx/?hl=en',
                            },
                        },
                    });
                }, 100);
            },
            setHeaderOffset: (headerRef) => {
                if (!this.state.headerOffset) {
                    this.setState({
                        headerOffset: headerRef.offsetHeight,
                    });
                }
            },
            toggleSidebarCollapsible: (sidebarCollapsible) => {
                this.setState({ sidebarCollapsible });
            },
        };
    }

    componentDidMount() {
        this.actions.loadConfig();
    }

    renderRoutes() {
        return (
            <React.Fragment>
                {/* <Route
                    exact
                    path="/"
                    render={() => (
                        <Gallery
                            getPrintedButtonName={this.state.config.gallery.getPrintedButtonName}
                            // eslint-disable-next-line max-len
                            orderPrintButtonContent={
                                this.state.config.gallery.orderPrintButtonContent}
                            orderEmailPlaceholder={this.state.config.gallery.orderEmailPlaceholder}
                            // eslint-disable-next-line max-len
                            orderMessagePlaceholder={
                                this.state.config.gallery.orderMessagePlaceholder}
                        />
                    )}
                />
                <Route
                    path="/about"
                    render={() => (
                        <About
                            description={this.state.config.aboutMe}
                        />
                    )}
                /> */}
                <Route
                    path="/about"
                    render={() => (
                        <About
                            config={this.state.config.about}
                            // eslint-disable-next-line no-console
                            onSave={(data) => { console.log('About onSave: data: ', data); }}
                        />
                    )}
                />
                <Route
                    path="/contact"
                    render={() => (
                        <Contact
                            config={this.state.config.contact}
                            // eslint-disable-next-line no-console
                            onSave={(data) => { console.log('Contact onSave: data: ', data); }}
                        />
                    )}
                />
                <Route
                    path="/general"
                    render={() => (
                        <GeneralSettings
                            config={this.state.config.general}
                            // eslint-disable-next-line no-console
                            onSave={(data) => { console.log('GeneralSettings onSave: data: ', data); }}
                        />
                    )}
                />
            </React.Fragment>
        );
    }

    render() {
        return (
            <Router>
                <div className={styles.app}>
                    {this.state.loaded ? (
                        <React.Fragment>
                            <div className={styles.header}>
                                {`${this.state.config.general.websiteName} Admin Panel`}
                            </div>
                            <div className={styles.mainContentWrapper}>
                                <div
                                    className={`${styles.mainContent} ${
                                        this.state.sidebarCollapsible ? styles.sidebarCollapsed : ''
                                    }`}
                                >
                                    <div className={styles.sidebar}>
                                        <Sidebar
                                            onCollapsable={() => {
                                                this.actions.toggleSidebarCollapsible(true);
                                            }}
                                            onStatic={() => {
                                                this.actions.toggleSidebarCollapsible(false);
                                            }}
                                        />
                                    </div>
                                    <div className={styles.routes}>
                                        {this.renderRoutes()}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className={styles.loader}>
                            <LoadingIcon
                                className={styles.loadingIcon}
                            />
                        </div>
                    )}
                </div>
            </Router>
        );
    }
}

export default App;
