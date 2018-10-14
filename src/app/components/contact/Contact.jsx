import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'components';
import styles from './styles.scss';

function Contact(props) {
    return (
        <div className={styles.contact}>
            <div className={styles.content}>
                <InputField
                    className={styles.inputField}
                    label="Caption"
                    error="Please input email"
                />
                <InputField
                    className={styles.inputField}
                    label="Email placeholder"
                    error="Please input email"
                />
                <InputField
                    className={styles.inputField}
                    label="Message placeholder"
                    error="Please input email"
                />
            </div>
        </div>
    );
}

Contact.propTypes = {

};

Contact.defaultProps = {

};

export default Contact;
