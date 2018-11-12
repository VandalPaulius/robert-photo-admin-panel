import React from 'react';
import PropTypes from 'prop-types';
import { InputField, SendButton } from 'components';
import styles from './styles.scss';

class GalleryGeneralSettings extends React.Component {
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
            <div className={styles.galleryGeneralSettings}>
                <div className={styles.content}>
                    <InputField
                        className={styles.inputField}
                        label="On image 'Get Printed' button content"
                        setRef={ref => this.actions.setRef(ref, 'getPrintedButtonName')}
                        defaultValue={this.props.config.getPrintedButtonName}
                        secondaryLabel="Optional"
                    />
                    <InputField
                        className={styles.inputField}
                        label="Email placeholder"
                        setRef={ref => this.actions.setRef(ref, 'orderEmailPlaceholder')}
                        defaultValue={this.props.config.orderEmailPlaceholder}
                        secondaryLabel="Optional"
                    />
                    <InputField
                        className={styles.inputField}
                        label="Message placeholder"
                        setRef={ref => this.actions.setRef(ref, 'orderMessagePlaceholder')}
                        defaultValue={this.props.config.orderMessagePlaceholder}
                        secondaryLabel="Optional"
                    />
                    <InputField
                        className={styles.inputField}
                        label="Order button content"
                        setRef={ref => this.actions.setRef(ref, 'orderPrintButtonContent')}
                        defaultValue={this.props.config.orderPrintButtonContent}
                        secondaryLabel="Required"
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

GalleryGeneralSettings.propTypes = {
    onSave: PropTypes.func,
    config: PropTypes.shape({
        getPrintedButtonName: PropTypes.string,
        orderEmailPlaceholder: PropTypes.string,
        orderMessagePlaceholder: PropTypes.string,
        orderPrintButtonContent: PropTypes.string,
    }),
};

GalleryGeneralSettings.defaultProps = {
    onSave: () => {},
    config: {},
};

export default GalleryGeneralSettings;
