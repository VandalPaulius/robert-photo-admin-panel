import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon } from 'components';
import { Picture } from './components';
import styles from './styles.scss';

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pictures: [],
            loading: false,
            batch: 0,
            scrollEventListener: null,
        };

        this.actions = this.initActions();
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
                        id: 'asdasdd54654fg',
                    }],
                }];

                this.setState({ loading: true })

                setTimeout(() => {
                    this.setState((prevState) => {
                        const newPictures = [...prevState.pictures];
                        pictures.map((picture) => {
                            newPictures.push(picture);
                        });

                        return ({
                            pictures: newPictures,
                            loading: false,
                            batch: prevState.batch + 1,
                        });
                    });
                }, 1000);
            },
            setScrollEventListener: (scrollEventListener) => {
                this.setState({ scrollEventListener });
            },
        };
    }

    componentDidMount() {
        this.initPictureLoad();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.state.scrollEventListener);
    }

    initPictureLoad() {
        this.actions.loadPictures();

        const scrollEventListener = window.addEventListener('scroll', () => {
            const page = document.documentElement;

            if (
                page.clientHeight + page.scrollTop
                >= page.scrollHeight - (page.scrollHeight * 0.2)
            ) {
                if (!this.state.loading) {
                    this.actions.loadPictures();
                }
            }
        });

        this.actions.setScrollEventListener(scrollEventListener);
    }

    render() {
        return (
            <div className={styles.gallery}>
                <div className={styles.content}>
                    {this.state.pictures.map(picture => (
                        <Picture
                            picture={picture}
                            key={picture.id}
                            getPrintedButtonName={this.props.getPrintedButtonName}
                            orderPrintButtonContent={this.props.orderPrintButtonContent}
                            orderEmailPlaceholder={this.props.orderEmailPlaceholder}
                            orderMessagePlaceholder={this.props.orderMessagePlaceholder}
                        />
                    ))}
                    {this.state.loading && (
                        <div className={styles.loader}>
                            <LoadingIcon className={styles.loadingIcon} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Gallery.propTypes = {
    getPrintedButtonName: PropTypes.string,
    orderPrintButtonContent: PropTypes.string,
    orderMessagePlaceholder: PropTypes.string,
    orderEmailPlaceholder: PropTypes.string,
};

Gallery.defaultProps = {
    getPrintedButtonName: '',
    orderPrintButtonContent: '',
    orderMessagePlaceholder: '',
    orderEmailPlaceholder: '',
};

export default Gallery;
