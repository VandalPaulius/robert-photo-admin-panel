import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import {
    ConfigInputField,
    InputField,
    HollowButton,
} from 'components';
import styles from './styles.scss';

class GalleryPrices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedConfig: [],
            refs: {},
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);

        this.actions = this.initActions();
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
            moveComponent: (up, id) => {
                const moveComponent = (container, componentId, moveUp) => {
                    let currentComponentIndex;
                    let currentComponent;

                    container.map((component, index) => {
                        if (component.id === componentId) {
                            currentComponentIndex = index;
                            currentComponent = component;
                        }
                    });

                    const newContainer = [];

                    container.map((component, index) => {
                        if (moveUp) {
                            if (
                                index + 1 === currentComponentIndex
                                || currentComponentIndex === 0 && index === 0
                            ) {
                                newContainer.push(currentComponent);
                            }

                            if (component.id !== componentId) {
                                newContainer.push(component);
                            }
                        } else {
                            if (component.id !== componentId) {
                                newContainer.push(component);
                            }

                            if (
                                index === currentComponentIndex + 1
                                || currentComponentIndex === container.length - 1
                                && index === container.length - 1
                            ) {
                                newContainer.push(currentComponent);
                            }
                        }
                    });

                    return newContainer;
                };

                this.setState((prevState) => {
                    const config = prevState.updatedConfig.length
                        ? [...prevState.updatedConfig]
                        : [...this.props.config];
                    
                    const newConfig = moveComponent(config, id, up);
                    
                    return {
                        updatedConfig: newConfig,
                    };
                });
            },
            removeComponent: (id) => {
                this.setState((prevState) => {
                    const config = prevState.updatedConfig.length
                        ? [...prevState.updatedConfig]
                        : [...this.props.config];

                    return {
                        updatedConfig: config.filter(component => component.id !== id),
                    };
                }, this.changeHandler);
            },
            removeRefs: (id) => {
                this.setState((prevState) => {
                    const refs = { ...prevState.refs };

                    const price = `${id}-price`;
                    const name = `${id}-name`;

                    if (refs[price]) {
                        delete refs[price];
                    }
                    if (refs[name]) {
                        delete refs[name];
                    }

                    return { refs };
                }, this.changeHandler);
            },
            addSize: (addAfterId) => {
                const newSize = {
                    name: '',
                    price: '',
                    id: uuid(),
                };

                this.setState((prevState) => {
                    const config = prevState.updatedConfig.length
                        ? [...prevState.updatedConfig]
                        : [...this.props.config];

                    let location = 0;

                    if (addAfterId) {
                        config.forEach((size, index) => {
                            if (size.id === addAfterId) {
                                location = index + 1;
                            }
                        });
                    }
                    
                    config.splice(location, 0, newSize);

                    return {
                        updatedConfig: config,
                    };
                }, this.changeHandler);
            },
        };
    }

    changeHandler() {
        console.log('changeHandler: this.props.changeNoted', this.props.changeNoted)
        if (!this.props.changeNoted) {
            this.props.onChange(this.saveHandler);
        }
    }

    saveHandler({ onSuccess, onError }) {
        console.log('onSave');
    }

    renderAddButton(addAfterId) {
        return (
            <div className={styles.addButtonContainer}>
                <HollowButton
                    text="+  Size"
                    onClick={() => this.actions.addSize(addAfterId)}
                />
            </div>
        );
    }

    renderSizes() {
        const sizes = this.state.updatedConfig.length
            ? this.state.updatedConfig
            : this.props.config;

        return (
            <div className={styles.sizeButtonContainer}>
                {sizes.map(size => (
                    <div key={size.id}>
                        <ConfigInputField
                            label="Size name"
                            setRef={ref => this.actions.setRef(ref, `${size.id}-name`)}
                            onClickRemove={() => {
                                this.actions.removeComponent(size.id);
                                this.actions.removeRefs(size.id);
                            }}
                            onClickUp={() => this.actions.moveComponent(true, size.id)}
                            onClickDown={() => this.actions.moveComponent(false, size.id)}
                            defaultValue={size.name}
                            className={styles.inputFieldContainer}
                            secondaryLabel="Required"
                            onTextInputChange={this.changeHandler}
                        >
                            <InputField
                                label="Price"
                                setRef={ref => this.actions.setRef(ref, `${size.id}-price`)}
                                defaultValue={size.price}
                                secondaryLabel="Required"
                                onChange={this.changeHandler}
                            />
                        </ConfigInputField>
                        {this.renderAddButton(size.id)}
                    </div>
                ))}
            </div>
        );
    }

    render() {
        console.log('GalleryPrices this.state: ', this.state)
        
        return (
            <div className={styles.galleryPrices}>
                {this.renderAddButton()}
                {this.renderSizes()}
            </div>
        );
    }
}

GalleryPrices.propTypes = {
    config: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        price: PropTypes.string,
        name: PropTypes.string,
        orderNumber: PropTypes.number,
    })),
    onChange: PropTypes.func.isRequired,
    changeNoted: PropTypes.bool,
};

GalleryPrices.defaultProps = {
    config: [],
    changeNoted: false,
};

export default GalleryPrices;
