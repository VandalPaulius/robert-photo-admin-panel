import React from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from 'components';
import styles from './styles.scss';

function Contact(props) {
    const sendEnquiry = ({
        data,
        onSuccess,
        onError, // eslint-disable-line no-unused-vars
        resetStateCallback,
    }) => {
        // eslint-disable-next-line no-console
        console.log('sendEnquiry data: ', data);

        setTimeout(() => { // dev
            onSuccess();
            setTimeout(() => resetStateCallback(), 1300);

            // onError('An error has occurred');
        }, 500);
    };

    return (
        <div className={styles.contact}>
            <ContactForm
                className={styles.contactForm}
                caption={props.caption}
                emailPlaceholder={props.emailPlaceholder}
                messagePlaceholder={props.messagePlaceholder}
                onFormFillSuccess={sendEnquiry}
            />
        </div>
    );
}

Contact.propTypes = {
    caption: PropTypes.string,
    messagePlaceholder: PropTypes.string,
    emailPlaceholder: PropTypes.string,
};

Contact.defaultProps = {
    caption: '',
    messagePlaceholder: '',
    emailPlaceholder: '',
};

export default Contact;
