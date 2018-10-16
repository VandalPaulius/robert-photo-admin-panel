import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon, CheckIcon } from 'components';
import styles from './styles.scss';

class SendButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false,
        };

        this.actions = this.initActions();
    }

    initActions() {
        return {
            updateHoverState: (isHovered) => {
                this.setState({ isHovered });
            },
        };
    }

    render() {
        return (
            <div
                className={`${styles.button} ${this.props.className}`}
                onClick={this.props.onClick}
                role="button"
                tabIndex={0}
                onMouseEnter={() => this.actions.updateHoverState(true)}
                onMouseLeave={() => this.actions.updateHoverState(false)}
            >
                <div className={styles.content}>
                    <div className={this.props.status ? styles.hide : ''}>
                        {this.props.children}
                    </div>
                    <div className={`${styles.iconContainer} ${this.props.status === 'loading' ? '' : styles.hide}`}>
                        <LoadingIcon
                            className={styles.loadingIcon}
                            style={{ color: this.state.isHovered ? '#000000' : '#FFFFFF' }}
                        />
                    </div>
                    <div className={`${styles.iconContainer} ${this.props.status === 'success' ? '' : styles.hide}`}>
                        <CheckIcon
                            className={styles.checkMarkIcon}
                            style={{ color: this.state.isHovered ? '#000000' : '#FFFFFF' }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

SendButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    status: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

SendButton.defaultProps = {
    onClick: () => {},
    className: '',
    status: '',
    children: '',
};

export default SendButton;
