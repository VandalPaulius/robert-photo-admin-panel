import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ChevronIcon } from 'components';
import styles from './styles.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openCloseEnabled: false,
            open: false,
        };

        this.actions = this.initActions();

        this.windowResizeListener = this.windowResizeListener.bind(this);
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
            toggleMenuOpen: (open) => {
                this.setState({ open });
            },
            updateOpenCloseEnabled: (openCloseEnabled) => {
                this.setState({ openCloseEnabled });
            },
        };
    }

    componentDidMount() {
        this.windowResizeListener()
        window.addEventListener('resize', this.windowResizeListener);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeListener);
    }

    windowResizeListener() {
        const page = document.documentElement;
        if (page.offsetWidth < 800) {
            if (!this.state.openCloseEnabled) {
                this.actions.updateOpenCloseEnabled(true);
            }
            if (this.state.open) {
                this.actions.toggleMenuOpen(false);
            }
        } else if (this.state.openCloseEnabled) {
            this.actions.updateOpenCloseEnabled(false);
        }
    }

    renderLink(path, name) {
        return (
            <Link
                to={path}
                tabIndex={0}
                role="button"
                onClick={() => {
                    if (this.state.openCloseEnabled) {
                        this.actions.toggleMenuOpen(false);
                    }
                }}
                className={
                    `${
                        styles.item
                    } ${
                        this.props.location.pathname === path ? styles.active : ''
                    }`
                }
            >
                {name}
            </Link>
        );
    }

    renderBackButton() {
        return (
            <div className={styles.buttonContainer}>
                <div
                    className={`${
                        styles.openCloseButton
                    } ${
                        this.state.openCloseEnabled ? '' : 'hide'
                    }`}
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                        if (this.state.openCloseEnabled) {
                            this.actions.toggleMenuOpen(!this.state.open);
                        }
                    }}
                >
                    <ChevronIcon
                        className={`${
                            styles.chevronIcon
                        } ${
                            this.state.open ? styles.rotated : ''
                        }`}
                    />
                </div>
            </div>
        );
    }

    render() {
        console.log('Sidebar this.state: ', this.state)

        return (
            <div className={styles.sidebar}>
                {this.renderBackButton()}
                <div className={styles.mainContent}>
                    {this.renderLink('/', 'Gallery')}
                    {this.renderLink('/about', 'About')}
                    {this.renderLink('/contact', 'Contact')}
                    {this.renderLink('/general', 'General Settings')}
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};

Sidebar.defaultProps = {
};

export default withRouter(Sidebar);