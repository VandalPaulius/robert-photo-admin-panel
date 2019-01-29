import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class GalleryPrices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.actions = this.initActions();
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
        
        };
    }

    renderSizes() {
        return (
            <div className={styles.sizeButtonContainer}>
                {this.props.config.map((price, index) => (
                    <div>
                        <div>
                            {index}
                        </div>
                        <div>
                            {price.name}
                        </div>
                        <div className={styles.price}>
                            {price.price}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        console.log('GalleryPrices this.state: ', this.state)
        
        return (
            <div className={styles.galleryPrices}>
                GalleryPrices
            </div>
        );
    }
}

GalleryPrices.propTypes = {
    config: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        price: PropTypes.string,
        name: PropTypes.string,
    })),
};

GalleryPrices.defaultProps = {
    config: [],
};

export default GalleryPrices;
