import React from 'react';
import PropTypes from 'prop-types';
import { InputField, SendButton } from 'components';
import styles from './styles.scss';

class GeneralSettings extends React.Component {
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
                        label="Website name"
                        setRef={ref => this.actions.setRef(ref, 'websiteName')}
                        defaultValue={this.props.config.websiteName}
                        secondaryLabel="Required"
                    />
                    <InputField
                        className={styles.inputField}
                        label="Instagram URL"
                        setRef={ref => this.actions.setRef(ref, 'instagramUrl')}
                        defaultValue={this.props.config.instagramUrl}
                        secondaryLabel="Optional"
                    />
                    <InputField
                        className={styles.inputField}
                        label="Copyright note"
                        setRef={ref => this.actions.setRef(ref, 'copyrightNote')}
                        defaultValue={this.props.config.copyrightNote}
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

GeneralSettings.propTypes = {
    onSave: PropTypes.func,
    config: PropTypes.shape({
        websiteName: PropTypes.string,
        copyrightNote: PropTypes.string,
        instagramUrl: PropTypes.string,
    }),
};

GeneralSettings.defaultProps = {
    onSave: () => {},
    config: {},
};

export default GeneralSettings;
