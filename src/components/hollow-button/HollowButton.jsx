import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function HollowButton(props) {
    return (
        <div
            className={`${styles.hollowButton} ${props.className}`}
            tabIndex={0}
            role="button"
            onClick={props.onClick}
        >
            {props.text}
        </div>
    );
}

HollowButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
};

HollowButton.defaultProps = {
    className: '',
    onClick: () => {},
    text: '',
};

export default HollowButton;
