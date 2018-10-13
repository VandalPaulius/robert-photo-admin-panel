import React from 'react';
import PropTypes from 'prop-types';
import { ChevronIcon, Expandable } from 'components';
import styles from './styles.scss';
import { OrderForm } from './components';

class Picture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };

        this.actions = this.initActions();

        this.actions.togglePictureExpand = this.actions.togglePictureExpand.bind(this);
    }

    initActions() {
        return {
            togglePictureExpand: (expanded) => {
                this.setState({ expanded });
            },
        };
    }

    render() {
        return (
            <div className={styles.picture}>
                <div
                    className={styles.imageContainer}
                    onClick={() => this.actions.togglePictureExpand(!this.state.expanded)}
                    role="button"
                    tabIndex={0}
                >
                    <img
                        src={this.props.picture.url}
                        alt={this.props.picture.name}
                        className={styles.image}
                    />
                    <div className={styles.buttonOverlay}>
                        {this.props.getPrintedButtonName && (
                            <div className={styles.getPrintedOverlayButton}>
                                {this.props.getPrintedButtonName}
                            </div>
                        )}
                        <ChevronIcon
                            className={`${
                                styles.chevronIcon
                            } ${
                                this.state.expanded ? styles.rotated : ''
                            }`}
                        />
                    </div>
                </div>
                <Expandable expanded={this.state.expanded}>
                    <OrderForm
                        picture={this.props.picture}
                        orderButtonContent={this.props.orderPrintButtonContent}
                        emailPlaceholder={this.props.orderEmailPlaceholder}
                        messagePlaceholder={this.props.orderMessagePlaceholder}
                        onSuccess={(resetStateCallback) => {
                            setTimeout(() => {
                                this.actions.togglePictureExpand(false);
                                resetStateCallback();
                            }, 1000);
                        }}
                    />
                </Expandable>
            </div>
        );
    }
}

Picture.propTypes = {
    picture: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        sizes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.string,
            id: PropTypes.string,
        })),
    }),
    getPrintedButtonName: PropTypes.string,
    orderPrintButtonContent: PropTypes.string,
    orderMessagePlaceholder: PropTypes.string,
    orderEmailPlaceholder: PropTypes.string,
};

Picture.defaultProps = {
    picture: {},
    getPrintedButtonName: '',
    orderPrintButtonContent: '',
    orderMessagePlaceholder: '',
    orderEmailPlaceholder: '',
};

export default Picture;
