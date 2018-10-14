import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function InputField(props) {
    return (
        <div className={`${styles.iputField} ${props.className}`}>
            <div className={styles.label}>
                {props.label}
            </div>
            {props.textarea ? (
                <textarea
                    className={styles.input}
                    placeholder={props.placeholder}
                    ref={props.setRef}
                    style={{
                        minHeight: props.minTextareaHeight,
                    }}
                />
            ) : (
                <input
                    className={styles.input}
                    placeholder={props.placeholder}
                    ref={props.setRef}
                    type={props.type}
                />
            )}
            <div className={styles.error}>
                {props.error}
            </div>
        </div>
    );
}

InputField.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    setRef: PropTypes.func,
    type: PropTypes.string,
    error: PropTypes.string,
    textarea: PropTypes.bool,
    minTextareaHeight: PropTypes.string,
};

InputField.defaultProps = {
    className: '',
    label: '',
    placeholder: '',
    setRef: () => {},
    type: 'text',
    error: '',
    textarea: false,
    minTextareaHeight: '40px',
};

export default InputField;
