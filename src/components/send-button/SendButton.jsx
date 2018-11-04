import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon, CheckIcon } from 'components';
import styles from './styles.scss';

class SendButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inverted: false,
        };

        this.actions = this.initActions();
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
            toggleInvertedState: () => this.setState(prevState => ({
                inverted: !prevState.inverted,
            })),
            setInverted: inverted => this.setState({ inverted }),
        };
    }

    componentDidMount() {
        this.actions.setInverted(this.props.inverted);
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.inverted !== this.props.inverted) {
            this.actions.setInverted(this.props.inverted);
        }
    }

    render() {
        return (
            <div
                className={`${styles.button} ${this.state.inverted ? styles.inverted : ''} ${this.props.className}`}
                onClick={this.props.onClick}
                role="button"
                tabIndex={0}
                onMouseEnter={() => this.actions.toggleInvertedState()}
                onMouseLeave={() => this.actions.toggleInvertedState()}
            >
                <div className={styles.content}>
                    <div className={this.props.status ? styles.hide : ''}>
                        {this.props.children}
                    </div>
                    <div className={`${styles.iconContainer} ${this.props.status === 'loading' ? '' : styles.hide}`}>
                        <LoadingIcon
                            className={styles.loadingIcon}
                            style={{ color: this.state.inverted ? '#000000' : '#FFFFFF' }}
                        />
                    </div>
                    <div className={`${styles.iconContainer} ${this.props.status === 'success' ? '' : styles.hide}`}>
                        <CheckIcon
                            className={styles.checkMarkIcon}
                            style={{ color: this.state.inverted ? '#000000' : '#FFFFFF' }}
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
    inverted: PropTypes.bool,
};

SendButton.defaultProps = {
    onClick: () => {},
    className: '',
    status: '',
    children: '',
    inverted: false,
};

export default SendButton;
