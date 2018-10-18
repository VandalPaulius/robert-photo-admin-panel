import React from 'react';
import PropTypes from 'prop-types';
import { InputField, SendButton } from 'components';
import styles from './styles.scss';

class About extends React.Component {
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

    renderAddButtons() {
        const AddButton = ({
            text,
            onClick,
        }) => (
            <div
                className={styles.addButton}
                tabIndex={0}
                role="button"
                onClick={onClick}
            >
                {text}
            </div>
        );

        return (
            <div className={styles.addButtonContainer}>
                <AddButton
                    text="+  Heading"
                />
                <AddButton
                    text="+  Text box"
                />
                <AddButton
                    text="+  Picture"
                />
            </div>
        );
    }

    renderInputField() {
        return (
            <div>
                <InputField
                    className={styles.inputField}
                    label="Caption"
                    setRef={ref => this.actions.setRef(ref, 'caption')}
                    defaultValue={this.props.config.contactCaption}
                    secondaryLabel="Optional"
                />
                <div>
                    {this.renderAddButtons()}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.contact}>
                <div className={styles.content}>
                    {this.renderInputField()}
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

About.propTypes = {
    onSave: PropTypes.func,
    config: PropTypes.arrayOf(PropTypes.shape({

    })),
};

About.defaultProps = {
    onSave: () => {},
    config: {},
};

export default About;
