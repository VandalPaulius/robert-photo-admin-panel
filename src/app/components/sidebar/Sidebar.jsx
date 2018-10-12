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
    }

    initActions() {
        return {
            toggleMenuOpen: (open) => {
                this.setState({ open });
            },
        };
    }

    render() {
        console.log('Sidebar this.props: ', this.props)

        return (
            <div className={styles.sidebar}>
                <div className={styles.buttonContainer}>
                    <div
                        className={styles.openCloseButton}
                        tabIndex={0}
                        role="button"
                        onClick={() => this.actions.toggleMenuOpen(!this.state.open)}
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
                
                <div className={styles.mainContent}>
                    <Link
                        to="/"
                        tabIndex={0}
                        role="button"
                        onClick={() => this.actions.toggleMenuOpen(false)}
                        className={
                            `${
                                styles.item
                            } ${
                                this.props.location.pathname === '/' ? styles.active : ''
                            }`
                        }
                    >
                        Gallery
                    </Link>
                    <Link
                        to="/about"
                        tabIndex={0}
                        role="button"
                        onClick={() => this.actions.toggleMenuOpen(false)}
                        className={
                            `${
                                styles.item
                            } ${
                                this.props.location.pathname === '/about' ? styles.active : ''
                            }`
                        }
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        tabIndex={0}
                        role="button"
                        onClick={() => this.actions.toggleMenuOpen(false)}
                        className={
                            `${
                                styles.item
                            } ${
                                this.props.location.pathname === '/contact' ? styles.active : ''
                            }`
                        }
                    >
                        Contact
                    </Link>
                    <Link
                        to="/general"
                        tabIndex={0}
                        role="button"
                        onClick={() => this.actions.toggleMenuOpen(false)}
                        className={
                            `${
                                styles.item
                            } ${
                                this.props.location.pathname === '/general' ? styles.active : ''
                            }`
                        }
                    >
                        General Settings
                    </Link>
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
