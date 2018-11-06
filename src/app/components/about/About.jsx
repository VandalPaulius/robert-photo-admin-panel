import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import {
    InputField,
    SendButton,
    HollowButton,
    // RemoveConfirmationOverlay,
    ConfigInputField,
} from 'components';
import styles from './styles.scss';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refs: {},
            saveError: '',
            saveStatus: '',
            componentConfigs: [],
            // confirmationOverlay: null,
        };

        this.actions = this.initActions();

        this.actions.setSaveError = this.actions.setSaveError.bind(this);
        this.actions.setSaveStatus = this.actions.setSaveStatus.bind(this);
        this.saveButtonHandler = this.saveButtonHandler.bind(this);
        // this.actions.toggleConfirmationOverlay = this.actions.toggleConfirmationOverlay.bind(this);
    }

    // eslint-disable-next-line react/sort-comp
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
            setSaveError: (saveError) => {
                if (this.state.saveError !== saveError) {
                    this.setState({ saveError });
                }
            },
            setSaveStatus: (saveStatus) => {
                if (this.state.saveStatus !== saveStatus) {
                    this.setState({ saveStatus });
                }
            },
            addComponent: ({ componentType, addAfterId, defaultValue }) => {
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
                        defaultValue: defaultValue || '',
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
            loadDefaultValues: (incomingConfigs) => {
                const componentConfigs = incomingConfigs.map((incomingConfig) => {
                    const component = {};
                    component.id = incomingConfig.id;

                    if (incomingConfig.image) {
                        component.label = 'Picture URL';
                        component.defaultValue = incomingConfig.url;
                        component.componentType = 'picture';
                    } else if (incomingConfig.text) {
                        component.defaultValue = incomingConfig.content;

                        if (incomingConfig.heading) {
                            component.label = 'Heading';
                            component.componentType = 'heading';
                        } else {
                            component.label = 'Text field';
                            component.componentType = 'text';
                        }
                    }

                    component.refName = `${component.componentType}-${component.id}`;

                    return component;
                });

                this.setState({ componentConfigs });
            },
            removeComponent: (configId) => {
                this.setState(prevState => ({
                    componentConfigs: prevState.componentConfigs
                        .filter(config => config.id !== configId),
                }));
            },
            // toggleConfirmationOverlay: ({
            //     onRemove,
            //     onCancel,
            //     showOverlay,
            // }) => {
            //     if (showOverlay) {
            //         this.setState({
            //             confirmationOverlay: {
            //                 onRemove,
            //                 onCancel,
            //             },
            //         });
            //     } else {
            //         this.setState({ confirmationOverlay: null });
            //     }
            // },
        };
    }

    componentDidMount() {
        this.actions.loadDefaultValues(this.props.config);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.config) !== JSON.stringify(this.props.config)) {
            this.actions.loadDefaultValues(this.props.config);
        }
    }

    saveButtonHandler() {
        const getConfigs = () => {
            const getInputValue = refName => this.state.refs[refName].value;

            return this.state.componentConfigs.map((configRaw) => {
                const config = {};
                config.id = configRaw.id;

                if (configRaw.componentType === 'picture') {
                    config.image = true;
                    config.alt = 'About page picture';
                    config.url = getInputValue(configRaw.refName);
                } else if (configRaw.componentType === 'text') {
                    config.text = true;
                    config.content = getInputValue(configRaw.refName);
                } else if (configRaw.componentType === 'heading') {
                    config.text = true;
                    config.heading = true;
                    config.content = getInputValue(configRaw.refName);
                }

                return config;
            });
        };

        this.actions.setSaveStatus('loading');
        this.actions.setSaveError('');

        this.props.onSave({
            data: getConfigs(),
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
        return (
            <div className={styles.addButtonContainer}>
                <HollowButton
                    text="+  Heading"
                    onClick={() => this.actions.addComponent({
                        componentType: 'heading',
                        addAfterId,
                    })}
                />
                <HollowButton
                    text="+  Text box"
                    onClick={() => this.actions.addComponent({
                        componentType: 'text',
                        addAfterId,
                    })}
                />
                <HollowButton
                    text="+  Picture"
                    onClick={() => this.actions.addComponent({
                        componentType: 'picture',
                        addAfterId,
                    })}
                />
            </div>
        );
    }

    renderInputField(config) {
        return (
            <div key={config.id}>
                <div className={styles.removeButtonContainer}>
                    {/* <HollowButton
                        text="Remove"
                        onClick={() => {
                            this.actions.toggleConfirmationOverlay({
                                showOverlay: true,
                                onRemove: () => {
                                    this.actions.removeComponent(config.id);
                                    this.actions.toggleConfirmationOverlay({ showOverlay: false });
                                },
                                onCancel: () => this.actions.toggleConfirmationOverlay({
                                    showOverlay: false,
                                }),
                            });
                        }}
                    /> */}
                </div>
                {/* <InputField
                    className={styles.inputField}
                    label={config.label}
                    setRef={ref => this.actions.setRef(ref, config.refName)}
                    defaultValue={config.defaultValue}
                    secondaryLabel="Optional"
                /> */}
                <ConfigInputField
                    label={config.label}
                    setRef={ref => this.actions.setRef(ref, config.refName)}
                    defaultValue={config.defaultValue}
                    secondaryLabel="Optional"
                    onClickRemove={() => this.actions.removeComponent(config.id)}
                    onClickUp={() => { console.log('clickUp'); }}
                    onClickDown={() => { console.log('clickDown'); }}
                    textarea={config.componentType === 'text' && true}
                />
                <div>
                    {this.renderAddButtons(config.id)}
                </div>
            </div>
        );
    }

    render() {
        console.log('About this.state: ', this.state)

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
                {/* {this.state.confirmationOverlay && (
                    <RemoveConfirmationOverlay
                        onRemove={this.state.confirmationOverlay.onRemove}
                        onCancel={this.state.confirmationOverlay.onCancel}
                    />
                )} */}
            </div>
        );
    }
}

About.propTypes = {
    onSave: PropTypes.func,
    config: PropTypes.arrayOf(PropTypes.shape({})),
};

About.defaultProps = {
    onSave: () => {},
    config: {},
};

export default About;
