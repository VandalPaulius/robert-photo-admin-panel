import React from 'react';
import PropTypes from 'prop-types';
import { InputField, SendButton } from 'components';
import styles from './styles.scss';

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refs: {},
            saveError: '',
            saveStatus: '',
        };

        this.actions = this.initActions();

        this.actions.setSaveError = this.actions.setSaveError.bind(this);
        this.actions.setSaveStatus = this.actions.setSaveStatus.bind(this);
        this.saveButtonHandler = this.saveButtonHandler.bind(this);
    }

    initActions() {
        return {
            setRef: (ref, name) => {
                if (!this.state.refs[name]) {
                    this.setState(prevState => ({
                        refs: {
                            ...prevState.refs,
                            [name]: ref,
                        },
                    }));
                }
            },
            setSaveError: saveError => this.setState({ saveError }),
            setSaveStatus: saveStatus => this.setState({ saveStatus }),
        };
    }

    saveButtonHandler() {
        const getInputValues = () => {
            const values = {};

            Object.keys(this.state.refs).map((key) => {
                values[key] = this.state.refs[key].value;
            });

            return values;
        };

        this.actions.setSaveStatus('loading');
        this.actions.setSaveError('');

        this.props.onSave({
            data: getInputValues(),
            onError: (error) => {
                this.actions.setSaveStatus('');
                this.actions.setSaveError(error);
            },
            onSuccess: () => setTimeout(() => {
                this.actions.setSaveStatus('success');
            }, 1200),
        });
    }

    render() {
        return (
            <div className={styles.contact}>
                <div className={styles.content}>
                    <InputField
                        className={styles.inputField}
                        label="Caption"
                        setRef={ref => this.actions.setRef(ref, 'contactCaption')}
                        defaultValue={this.props.config.contactCaption}
                        secondaryLabel="Optional"
                    />
                    <InputField
                        className={styles.inputField}
                        label="Email placeholder"
                        setRef={ref => this.actions.setRef(ref, 'emailPlaceholder')}
                        defaultValue={this.props.config.emailPlaceholder}
                        secondaryLabel="Optional"
                    />
                    <InputField
                        className={styles.inputField}
                        label="Message placeholder"
                        setRef={ref => this.actions.setRef(ref, 'messagePlaceholder')}
                        defaultValue={this.props.config.messagePlaceholder}
                        secondaryLabel="Optional"
                    />
                    <div className={styles.buttonContainer}>
                        <SendButton
                            onClick={this.saveButtonHandler}
                            status={this.state.saveStatus}
                        >
                            Save
                        </SendButton>
                    </div>
                    <div className={styles.saveErrorContainer}>
                        <div className={styles.error}>
                            {this.state.saveError}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Contact.propTypes = {
    onSave: PropTypes.func,
    config: PropTypes.shape({
        contactCaption: PropTypes.string,
        emailPlaceholder: PropTypes.string,
        messagePlaceholder: PropTypes.string,
    }),
};

Contact.defaultProps = {
    onSave: () => {},
    config: {},
};

export default Contact;
