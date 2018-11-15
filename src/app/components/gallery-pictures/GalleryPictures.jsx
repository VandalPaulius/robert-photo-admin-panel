import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import {
    SendButton,
    HollowButton,
    ConfigInputField,
    LoadingIcon,
} from 'components';
import styles from './styles.scss';

class GalleryPictures extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refs: {},
            saveError: '',
            saveStatus: '',
            componentConfigs: [],
            loading: true,
        };

        this.actions = this.initActions();

        // this.actions.setSaveError = this.actions.setSaveError.bind(this);
        // this.actions.setSaveStatus = this.actions.setSaveStatus.bind(this);
        // this.saveButtonHandler = this.saveButtonHandler.bind(this);
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
            loadPictures: () => {
                const pictures = [{
                    id: 'dsfdsfdhfghfgjhfghfgh',
                    name: 'Autumn road',
                    url: 'http://coolwallpaper.website/wp-content/uploads/2018/03/nature-background-images-for-photoshop-unique-1836-road-hd-wallpapers-background-images-wallpaper-abyss-of-nature-background-images-for-photoshop.jpg',
                    sizes: [{
                        name: '16 x 15',
                        price: '£25',
                        id: 'as45as566dasdda798sa7d987fg',
                    }, {
                        name: '16 x 7',
                        price: '£13',
                        id: 'as45as566assadasd45465dasddfg',
                    }, {
                        name: '50cm x 71,3cm',
                        price: '£6953',
                        id: 'as45as566dasddf456afds5sd641ag',
                    }],
                }, {
                    id: 'dsfdsfdhfghfgjhfgh4656546fgh',
                    name: '1980 Porsche 911 SC Targa',
                    url: 'https://i.ytimg.com/vi/og4k9JPsA_g/maxresdefault.jpg',
                    sizes: [{
                        name: '16 x 15',
                        price: '£25',
                        id: 'as45as566dasd54saddfg',
                    }, {
                        name: '16 x 7',
                        price: '£13',
                        id: 'as45as56sa4d4aasd6dasddfg',
                    }, {
                        name: '50cm x 71,3cm',
                        price: '£6953',
                        id: 'as45as566das74978ddfg',
                    }],
                }, {
                    id: 'dsfdsfd878dsfhfghfgjhfghfgh',
                    name: 'Anime girl',
                    url: 'https://i.pinimg.com/originals/58/92/e7/5892e7f3cc64c8a912e2494a3ff77e08.jpg',
                    sizes: [{
                        name: '16 x 15',
                        price: '£25',
                        id: 'as45as566dasddfg',
                    }, {
                        name: '16 x 7',
                        price: '£13',
                        id: 'asdassdf452121011ddfg',
                    }, {
                        name: '50cm x 71,3cm',
                        price: '£6953',
                        id: 'asdasddfsd4f65g',
                    }],
                }, {
                    id: 'dsfdsfdsdf4sd65fhfghfgjhfghfgh',
                    name: 'Himari',
                    url: 'https://vignette.wikia.nocookie.net/omamori-himari/images/1/10/007.jpg/revision/latest?cb=20120507105337',
                    sizes: [{
                        name: '16 x 15',
                        price: '£25',
                        id: 'asdasdd4sf6dfg',
                    }, {
                        name: '50cm x 71,3cm',
                        price: '£6953',
                        id: 'asdasdd5sdf66fg',
                    }],
                }, {
                    id: 'dsfdsfdhfghdsf4sd65fgjhfghfgh',
                    name: 'Mirrors Edge Catalyst',
                    url: 'https://gpstatic.com/acache/30/32/1/uk/s7-949b4aa41fa9c297522b46ddfbe2c3da.jpg',
                    sizes: [{
                        name: '50cm x 71,3cm',
                        price: '£6953',
                        id: 'asdasddfgsdf8965',
                    }],
                }, {
                    id: 'dsfdsfdhf5ds6f4484684adasghfgjhfghfgh',
                    name: 'Beyond Good and Evil 2 Pey\'j',
                    url: 'https://drdw8nfjvtevv.cloudfront.net/wp-content/uploads/2018/06/35144684_10155334422642143_1141390934756294656_n.jpg',
                    sizes: [{
                        name: '16 x 15',
                        price: '£25',
                        id: 'asdasddfg',
                    }, {
                        name: '16 x 7',
                        price: '£13',
                        id: 'asdas46sdfsddfg',
                    }, {
                        name: '50cm x 71,3cm',
                        price: '£6953',
                        id: 'asdashj46dd54654fg',
                    }],
                }];

                this.setState({ loading: true });

                setTimeout(() => {
                    this.setState({
                        componentConfigs: pictures,
                        loading: false,
                    });
                }, 500);
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
            addPicture: (addAfterId) => {
                // this.setState((prevState) => {
                //     const componentLabels = {
                //         heading: 'Heading',
                //         text: 'Text field',
                //         picture: 'Picture',
                //     };

                //     const id = uuid();

                //     const newComponentConfig = {
                //         id,
                //         label: componentLabels[type],
                //         refName: `${type}-${id}`,
                //         type,
                //         defaultValue: defaultValue || '',
                //     };

                //     const componentConfigs = [];
                //     if (!addAfterId) {
                //         componentConfigs.push(newComponentConfig);

                //         prevState.componentConfigs.map((config) => {
                //             componentConfigs.push(config);
                //         });
                //     } else {
                //         prevState.componentConfigs.map((config) => {
                //             componentConfigs.push(config);

                //             if (config.id === addAfterId) {
                //                 componentConfigs.push(newComponentConfig);
                //             }
                //         });
                //     }

                //     return ({ componentConfigs });
                // });
            },
            removePicture: (configId) => {
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
            setPictureUrl: (url, configId) => {
                // this.setState((prevState) => {
                //     const componentConfigs = prevState.componentConfigs.map((config) => {
                //         const newConfig = { ...config };

                //         if (newConfig.id === configId) {
                //             newConfig.value = value;
                //         }

                //         return newConfig;
                //     });

                //     return { componentConfigs };
                // });
            },
        };
    }

    componentDidMount() {
        this.actions.loadPictures();
    }

    // saveButtonHandler() {
    //     const getConfigs = () => {
    //         const getInputValue = refName => this.state.refs[refName].value;

    //         return this.state.componentConfigs.map((configRaw) => {
    //             const config = {};
    //             config.id = configRaw.id;

    //             if (configRaw.type === 'picture') {
    //                 config.image = true;
    //                 config.alt = 'About page picture';
    //                 config.url = configRaw.value || configRaw.defaultValue;
    //             } else if (configRaw.type === 'text') {
    //                 config.text = true;
    //                 config.content = getInputValue(configRaw.refName);
    //             } else if (configRaw.type === 'heading') {
    //                 config.text = true;
    //                 config.heading = true;
    //                 config.content = getInputValue(configRaw.refName);
    //             }

    //             return config;
    //         });
    //     };

    //     this.actions.setSaveStatus('loading');
    //     this.actions.setSaveError('');

    //     this.props.onSave({
    //         data: getConfigs(),
    //         onError: (error) => {
    //             this.actions.setSaveStatus('');
    //             this.actions.setSaveError(error);
    //         },
    //         onSuccess: () => setTimeout(() => {
    //             this.actions.setSaveStatus('success');
    //         }, 1200),
    //     });
    // }

    renderAddButtons(addAfterId) {
        return (
            <div className={styles.addButtonContainer}>
                <HollowButton
                    text="+  Picture"
                    onClick={() => this.actions.addPicture(addAfterId)}
                />
            </div>
        );
    }

    renderInputField(picture) {
        return (
            <div key={picture.id}>
                <ConfigInputField
                    className={styles.inputField}
                    defaultValue={picture.url}
                    onClickRemove={() => this.actions.removeComponent(picture.id)}
                    onClickUp={() => this.actions.moveComponent(true, picture.id)}
                    onClickDown={() => this.actions.moveComponent(false, picture.id)}
                    image
                    onImageUploaded={(imageUrl) => {
                        this.actions.setComponentValue(imageUrl, picture.id);
                    }}
                />
                <div>
                    {this.renderAddButtons(picture.id)}
                </div>
            </div>
        );
    }

    render() {
        console.log('GalleryPictures this.state: ', this.state)
        
        return (
            <div className={styles.galleryPictures}>
                <div className={styles.content}>
                    {this.state.loading ? (
                        <div className={styles.loader}>
                            <LoadingIcon
                                className={styles.loadingIcon}
                            />
                        </div>
                    ) : (
                        <React.Fragment>
                            <div>
                                {this.renderAddButtons()}
                            </div>
                            {this.state.componentConfigs.map(
                                picture => this.renderInputField(picture),
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
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

GalleryPictures.propTypes = {

};

GalleryPictures.defaultProps = {

};

export default GalleryPictures;
