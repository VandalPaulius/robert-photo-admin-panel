import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function ChevronIcon(props) {
    const iconStyles = {
        fill: props.style.color,
        stroke: props.style.color,
        enableBackground: 'new 0 0 50 50',
        ...props.style,
    };
    if (props.rotateBy) {
        iconStyles.transform = `rotate(${props.rotateBy}deg)`;
    }


    return (
        <svg
            className={`${styles.chevronIcon} ${props.className}`}
            style={iconStyles}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
        >
            <svg
                id="chevron-right"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
            </svg>
        </svg>
    );
}

ChevronIcon.propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({
        color: PropTypes.string,
    }),
    rotateBy: PropTypes.number,
};

ChevronIcon.defaultProps = {
    className: '',
    style: {},
    rotateBy: 0,
};

export default ChevronIcon;
