import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoadingIcon, SendButton, Expandable } from 'components';
import styles from './styles.scss';
import {
    GalleryPictures,
    GalleryPrices,
    Sidebar,
    GalleryGeneralSettings,
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
            showSaveButton: false,
            onClickSave: (params) => {}, // eslint-disable-line no-unused-vars
            saveStatus: '',
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
                                url: 'https://pmcvariety.files.wordpress.com/2017/03/spider-man-homecoming.png?w=1000',
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
                                url: 'https://cdn3.movieweb.com/i/article/8d2c4zexT6kJFnwvfn2Oq7IsH2nOXC/798:50/Spider-Man-Animated-Movie-Why-Different-Liev-Schreiber.jpg',
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
                            galleryPrices: [{
                                name: '16 x 15',
                                price: '£25',
                                id: 'as45as566dasdda798sa7d987fg',
                                orderNumber: 1,
                            }, {
                                name: '16 x 7',
                                price: '£13',
                                id: 'as45as566assadasd45465dasddfg',
                                orderNumber: 2,
                            }, {
                                name: 'NEW 16 x 7',
                                price: '£13',
                                id: 'as45as566a4sdf6sdf46sssadasd45465dasddfg',
                                orderNumber: 3,
                            }, {
                                name: '69 x 71',
                                price: '£13',
                                id: '56dsf46sd4',
                                orderNumber: 4,
                            }, {
                                name: '50cm x 71,3cm',
                                price: '£6953',
                                id: 'as45as566dasddf456afds5sd641ag',
                                orderNumber: 5,
                            }],
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
            setSaveStatus: (saveStatus) => {
                if (this.state.saveStatus !== saveStatus) {
                    this.setState({ saveStatus });
                }
            },
            toggleSaveButton: (showSaveButton, onClickSave = () => {}) => this.setState({
                showSaveButton,
                onClickSave,
            }),
        };
    }

    componentDidMount() {
        this.actions.loadConfig();
    }

    renderRoutes() {
        return (
            <React.Fragment>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <GalleryPictures
                            galleryPrices={this.state.config.galleryPrices}
                        />
                    )}
                />
                <Route
                    path="/gallery-prices"
                    render={() => (
                        <GalleryPrices
                            config={this.state.config.galleryPrices}
                            // eslint-disable-next-line no-console
                            onSave={(data) => { console.log('GalleryPrices onSave: data: ', data); }}
                            changeNoted={this.state.showSaveButton}
                            onChange={onClickSave => this.actions.toggleSaveButton(true, onClickSave)}
                        />
                    )}
                />
                <Route
                    path="/gallery-general"
                    render={() => (
                        <GalleryGeneralSettings
                            config={this.state.config.gallery}
                            // eslint-disable-next-line no-console
                            onSave={(data) => { console.log('GalleryGeneralSettings onSave: data: ', data); }}
                        />
                    )}
                />
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

    saveButtonHandler() {
        this.state.onClickSave({
            onSuccess: () => {
                this.actions.setSaveStatus('success');
                setTimeout(() => {
                    this.actions.toggleSaveButton(false);
                    this.actions.setSaveStatus('idle');
                }, 1000);
            },
            onError: () => this.actions.setSaveStatus('idle'),
        });
    }

    renderSaveButton() {
        return (
            <Expandable
                expanded={this.state.showSaveButton}
            >
                <div className={styles.saveButtonContainer}>
                    <SendButton
                        onClick={() => {
                            this.saveButtonHandler();
                            this.actions.setSaveStatus('loading');
                        }}
                        status={this.state.saveStatus}
                    >
                        Save
                    </SendButton>
                </div>
            </Expandable>
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
                                    <div className={styles.routesContainer}>
                                        <div
                                            className={`${styles.routes} ${
                                                this.state.showSaveButton ? styles.paddedBottom : ''
                                            }`}
                                        >
                                            {this.renderRoutes()}
                                        </div>
                                        <div className={styles.saveButtonLayoutContainer}>
                                            {this.renderSaveButton()}
                                        </div>
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
