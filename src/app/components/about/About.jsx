import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { InputField, SendButton } from 'components';
import styles from './styles.scss';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refs: {},
            saveError: '',
            saveStatus: '',
            componentConfigs: [],
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
            // addComponent: componentType => this.setState(prevState => ({
            //     components: [
            //         ...prevState.components,
            //         componentType,
            //     ],
            // })),
            addComponent: (componentType, addAfterId) => {
                this.setState((prevState) => {
                    const componentLabels = {
                        heading: 'Heading',
                        text: 'Text field',
                        picture: 'Picture URL',
                    };

                    const id = uuid();

                    const newComponentConfig = {
                        id,
                        label: componentLabels[componentType],
                        refName: `${componentType}-${id}`,
                        type: componentType,
                    };

                    const componentConfigs = [];
                    if (!addAfterId) {
                        componentConfigs.push(newComponentConfig);

                        prevState.componentConfigs.map((config) => {
                            componentConfigs.push(config);
                        });
                    } else {
                        prevState.componentConfigs.map((config) => {
                            componentConfigs.push(config);
    
                            if (config.id === addAfterId) {
                                componentConfigs.push(newComponentConfig);
                            }
                        });
                    }

                    return ({ componentConfigs });
                });
            },
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

    renderAddButtons(addAfterId) {
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
                    onClick={() => this.actions.addComponent('heading', addAfterId)}
                />
                <AddButton
                    text="+  Text box"
                    onClick={() => this.actions.addComponent('text', addAfterId)}
                />
                <AddButton
                    text="+  Picture"
                    onClick={() => this.actions.addComponent('picture', addAfterId)}
                />
            </div>
        );
    }

    renderInputField(config) {
        return (
            <div key={config.id}>
                <InputField
                    className={styles.inputField}
                    label={config.label}
                    setRef={ref => this.actions.setRef(ref, config.refName)}
                    // defaultValue={this.props.config.contactCaption}
                    secondaryLabel="Optional"
                />
                <div>
                    {this.renderAddButtons(config.id)}
                </div>
            </div>
        );
    }

    render() {
        console.log('About: this.state: ', this.state)

        return (
            <div className={styles.contact}>
                <div className={styles.content}>
                    {/* {this.renderInputField()} */}
                    <div>
                        {this.renderAddButtons()}
                    </div>
                    {this.state.componentConfigs.map(
                        componentConfig => this.renderInputField(componentConfig),
                    )}
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
