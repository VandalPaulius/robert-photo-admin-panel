import React from 'react';
import PropTypes from 'prop-types';
import { SendButton } from 'components';
import styles from './styles.scss';

function RemoveConfirmationOverlay(props) {
    return (
        <div className={styles.removeConfirmationOverlay}>
            <div className={styles.content}>
                <div className={styles.message}>
                    Confirm removal
                </div>
                <div className={styles.buttonContainer}>
                    <SendButton onClick={props.onRemove}>
                        Remove
                    </SendButton>
                    <SendButton
                        onClick={props.onCancel}
                        inverted
                    >
                        Cancel
                    </SendButton>
                </div>
            </div>
        </div>
    );
}

RemoveConfirmationOverlay.propTypes = {
    onRemove: PropTypes.func,
    onCancel: PropTypes.func,
};

RemoveConfirmationOverlay.defaultProps = {
    onRemove: () => {},
    onCancel: () => {},
};

export default RemoveConfirmationOverlay;
