import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import {
    SendButton,
    HollowButton,
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
        };

        this.actions = this.initActions();

        this.actions.setSaveError = this.actions.setSaveError.bind(this);
        this.actions.setSaveStatus = this.actions.setSaveStatus.bind(this);
        this.saveButtonHandler = this.saveButtonHandler.bind(this);
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
            addComponent: ({ type, addAfterId, defaultValue }) => {
                this.setState((prevState) => {
                    const componentLabels = {
                        heading: 'Heading',
                        text: 'Text field',
                        picture: 'Picture',
                    };

                    const id = uuid();

                    const newComponentConfig = {
                        id,
                        label: componentLabels[type],
                        refName: `${type}-${id}`,
                        type,
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
                        component.type = 'picture';
                    } else if (incomingConfig.text) {
                        component.defaultValue = incomingConfig.content;

                        if (incomingConfig.heading) {
                            component.label = 'Heading';
                            component.type = 'heading';
                        } else {
                            component.label = 'Text field';
                            component.type = 'text';
                        }
                    }

                    component.refName = `${component.type}-${component.id}`;

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
            moveComponent: (up, configId) => {
                this.setState((prevState) => {
                    let currentComponentIndex;
                    let currentComponentConfig;

                    prevState.componentConfigs.map((config, index) => {
                        if (config.id === configId) {
                            currentComponentIndex = index;
                            currentComponentConfig = config;
                        }
                    });

                    const componentConfigs = [];

                    prevState.componentConfigs.map((config, index) => {
                        if (up) {
                            if (
                                index + 1 === currentComponentIndex
                                || currentComponentIndex === 0 && index === 0
                            ) {
                                componentConfigs.push(currentComponentConfig);
                            }

                            if (config.id !== configId) {
                                componentConfigs.push(config);
                            }
                        } else {
                            if (config.id !== configId) {
                                componentConfigs.push(config);
                            }

                            if (
                                index === currentComponentIndex + 1
                                || currentComponentIndex === prevState.componentConfigs.length - 1
                                && index === prevState.componentConfigs.length - 1
                            ) {
                                componentConfigs.push(currentComponentConfig);
                            }
                        }
                    });

                    return { componentConfigs };
                });
            },
            setComponentValue: (value, configId) => {
                this.setState((prevState) => {
                    const componentConfigs = prevState.componentConfigs.map((config) => {
                        const newConfig = { ...config };

                        if (newConfig.id === configId) {
                            newConfig.value = value;
                        }

                        return newConfig;
                    });

                    return { componentConfigs };
                });
            },
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

                if (configRaw.type === 'picture') {
                    config.image = true;
                    config.alt = 'About page picture';
                    config.url = configRaw.value || configRaw.defaultValue;
                } else if (configRaw.type === 'text') {
                    config.text = true;
                    config.content = getInputValue(configRaw.refName);
                } else if (configRaw.type === 'heading') {
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
                        type: 'heading',
                        addAfterId,
                    })}
                />
                <HollowButton
                    text="+  Text box"
                    onClick={() => this.actions.addComponent({
                        type: 'text',
                        addAfterId,
                    })}
                />
                <HollowButton
                    text="+  Picture"
                    onClick={() => this.actions.addComponent({
                        type: 'picture',
                        addAfterId,
                    })}
                />
            </div>
        );
    }

    renderInputField(config) {
        return (
            <div key={config.id}>
                <ConfigInputField
                    className={styles.inputField}
                    label={config.label}
                    setRef={ref => this.actions.setRef(ref, config.refName)}
                    defaultValue={config.defaultValue}
                    secondaryLabel="Optional"
                    onClickRemove={() => this.actions.removeComponent(config.id)}
                    onClickUp={() => this.actions.moveComponent(true, config.id)}
                    onClickDown={() => this.actions.moveComponent(false, config.id)}
                    textarea={config.type === 'text' && true}
                    image={config.type === 'picture' && true}
                    onImageUploaded={(imageUrl) => {
                        this.actions.setComponentValue(imageUrl, config.id);
                    }}
                />
                <div>
                    {this.renderAddButtons(config.id)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.contact}>
                <div className={styles.content}>
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
    config: PropTypes.arrayOf(PropTypes.shape({})),
};

About.defaultProps = {
    onSave: () => {},
    config: {},
};

export default About;
