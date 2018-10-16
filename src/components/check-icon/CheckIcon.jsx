import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function CheckIcon(props) {
    return (
        <svg
            className={`${styles.checkIcon} ${props.className}`}
            style={{
                fill: props.style.color,
                ...props.style,
            }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
        >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
    );
}

CheckIcon.propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({
        color: PropTypes.string,
    }),
};

CheckIcon.defaultProps = {
    className: '',
    style: {
        color: '#000000',
    },
};

export default CheckIcon;
