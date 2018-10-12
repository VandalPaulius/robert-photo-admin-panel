import React from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from 'components';
import styles from './styles.scss';

const initialState = {
    activeSizes: [],
    pictureSizeError: '',
};

class OrderForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...initialState };

        this.actions = this.initActions();

        this.actions.submitOrder = this.actions.submitOrder.bind(this);
        this.actions.resetState = this.actions.resetState.bind(this);
    }

    initActions() {
        return {
            toggleActiveSize: (id) => {
                const activeSIze = this.state.activeSizes.find(sizeId => sizeId === id);

                if (activeSIze) {
                    this.setState(prevState => ({
                        activeSizes: prevState.activeSizes.filter(sizeId => sizeId !== id),
                    }));
                } else {
                    this.setState((prevState) => {
                        const activeSizes = [...prevState.activeSizes];
                        activeSizes.push(id);

                        return { activeSizes };
                    });
                }
            },
            submitOrder: ({
                data,
                onSuccess,
                onError, // eslint-disable-line no-unused-vars
                resetStateCallback,
            }) => {
                const isValid = () => {
                    let pictureSizeError = '';
                    let valid = true;

                    if (!this.state.activeSizes.length) {
                        pictureSizeError = 'No picture size selected';
                        valid = false;
                    }

                    this.setState({ pictureSizeError });
                    return valid;
                };

                if (!isValid()) {
                    return;
                }

                const order = {
                    email: data.email,
                    message: data.message,
                    pictureSizes: this.props.picture.sizes.filter((size) => {
                        const foundSize = this.state.activeSizes.find(sizeId => sizeId === size.id);

                        if (foundSize) {
                            return size;
                        }
                    }),
                };

                // eslint-disable-next-line no-console
                console.log('submitOrder order: ', order);

                setTimeout(() => { // dev
                    onSuccess();
                    this.props.onSuccess(() => {
                        resetStateCallback();
                        this.actions.resetState();
                    });
                    // onError('An error has occurred');
                }, 500);
            },
            resetState: () => {
                this.state = {};
                this.setState({ ...initialState });
            },
        };
    }

    renderSizeButtons() {
        return (
            <React.Fragment>
                <div className={styles.sizeButtonContainer}>
                    {this.props.picture.sizes.map(size => (
                        <div
                            className={`${
                                styles.sizeToggleButton
                            } ${
                                this.state.activeSizes.find(sizeId => sizeId === size.id)
                                    ? styles.selected
                                    : ''
                            }`}
                            key={size.id}
                            onClick={() => this.actions.toggleActiveSize(size.id)}
                            role="button"
                            tabIndex={0}
                        >
                            <div>
                                {size.name}
                            </div>
                            <div className={styles.price}>
                                {size.price}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.error}>
                    {this.state.pictureSizeError}
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className={styles.orderForm}>
                {this.renderSizeButtons()}
                <ContactForm
                    className={styles.contactForm}
                    emailPlaceholder={this.props.emailPlaceholder}
                    messagePlaceholder={this.props.messagePlaceholder}
                    onFormFillSuccess={this.actions.submitOrder}
                    sendButtonContent={this.props.orderButtonContent}
                />
            </div>
        );
    }
}

OrderForm.propTypes = {
    picture: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        sizes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.string,
            id: PropTypes.string,
        })),
    }).isRequired,
    orderButtonContent: PropTypes.string,
    onSuccess: PropTypes.func,
    messagePlaceholder: PropTypes.string,
    emailPlaceholder: PropTypes.string,
};

OrderForm.defaultProps = {
    orderButtonContent: '',
    onSuccess: () => {},
    messagePlaceholder: '',
    emailPlaceholder: '',
};

export default OrderForm;
