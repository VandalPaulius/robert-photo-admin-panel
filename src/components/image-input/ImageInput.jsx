import React from 'react';
import PropTypes from 'prop-types';
import { SendButton } from 'components';
import styles from './styles.scss';

class ImageInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            error: '',
            uploadStatus: '',
            uploadButtonMouseEntered: false,
        };

        this.actions = this.initActions();
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
            uploadImage: (event) => {
                this.setState({ uploadStatus: 'loading' });

                const reader = new FileReader();

                reader.onerror = () => this.setState({ error: 'Error while reading a file' });

                reader.onload = () => {
                    // const imageFile = reader.result; // actual image base64 URL to be uploaded

                    setTimeout(() => {
                        // returned from server URL
                        const imageUrl = 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3e/FlamePrincess.png/revision/latest?cb=20160314152748';

                        this.setState({
                            uploadStatus: 'success',
                            imageUrl,
                        });
                        this.props.onUploaded(imageUrl);
                    }, 500);
                };

                reader.readAsDataURL(event.target.files[0]);
            },
            setError: error => this.setState({ error }),
            toggleUploadButtonMouseEnter: uploadButtonMouseEntered => this.setState({
                uploadButtonMouseEntered,
            }),
        };
    }

    render() {
        const imageUrl = this.props.defaultValue || this.state.imageUrl;

        return (
            <div className={`${styles.imageInput} ${this.props.className}`}>
                {this.props.secondaryLabel && this.props.label && (
                    <div className={styles.labelContainer}>
                        <div className={styles.label}>
                            {this.props.label}
                        </div>
                        <div className={styles.secondaryLabel}>
                            {this.props.secondaryLabel}
                        </div>
                    </div>
                )}
                {imageUrl ? (
                    <React.Fragment>
                        <div
                            className={styles.image}
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                                height: this.props.imageHeight,
                            }}
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className={styles.uploadButtonContainer}>
                            <div
                                className={`${styles.uploadContainer} ${
                                    this.state.uploadButtonMouseEntered ? styles.hovered : ''
                                }`}
                                onMouseEnter={() => {
                                    this.actions.toggleUploadButtonMouseEnter(true);
                                }}
                                onMouseLeave={() => {
                                    this.actions.toggleUploadButtonMouseEnter(false);
                                }}
                            >
                                <SendButton
                                    className={styles.button}
                                    onClick={this.initActions}
                                    status={this.state.uploadStatus}
                                    inverted={this.state.uploadButtonMouseEntered}
                                >
                                    Choose and upload
                                </SendButton>
                                <input
                                    type="file"
                                    onInput={this.actions.uploadImage}
                                />
                            </div>
                        </div>
                        <div className={styles.error}>
                            {this.state.error}
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

ImageInput.propTypes = {
    className: PropTypes.string,
    onUploaded: PropTypes.func,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    secondaryLabel: PropTypes.string,
    imageHeight: PropTypes.string,
};

ImageInput.defaultProps = {
    className: '',
    onUploaded: () => {},
    defaultValue: '',
    label: '',
    secondaryLabel: '',
    imageHeight: '200px',
};

export default ImageInput;
