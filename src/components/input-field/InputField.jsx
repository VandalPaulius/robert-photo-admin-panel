import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function InputField(props) {
    return (
        <div className={`${styles.inputField} ${props.className}`}>
            {props.secondaryLabel && props.label && (
                <div className={styles.labelContainer}>
                    <div className={styles.label}>
                        {props.label}
                    </div>
                    <div className={styles.secondaryLabel}>
                        {props.secondaryLabel}
                    </div>
                </div>
            )}
            {props.textarea ? (
                <textarea
                    className={styles.input}
                    placeholder={props.placeholder}
                    ref={props.setRef}
                    style={{
                        minHeight: props.minTextareaHeight,
                    }}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            ) : (
                <input
                    className={styles.input}
                    placeholder={props.placeholder}
                    ref={props.setRef}
                    type={props.type}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
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
    defaultValue: PropTypes.string,
    secondaryLabel: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
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
    defaultValue: '',
    secondaryLabel: '',
    onChange: () => {},
    onBlur: () => {},
};

export default InputField;
