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
            uploadImage: () => {
                this.setState({ uploadStatus: 'loading' });

                setTimeout(() => {
                    const imageUrl = 'http://apeconcerts.com/wp-content/uploads/2017/07/BTSM_1024-1024x576.jpg';

                    this.setState({
                        uploadStatus: 'success',
                        imageUrl,
                    });
                    this.props.onUploaded(imageUrl);
                }, 500);
            },
            setError: error => this.setState({ error }),
            toggleUploadButtonMouseEnter: uploadButtonMouseEntered => this.setState({
                uploadButtonMouseEntered,
            }),
        };
    }

    render() {
        console.log('ImageInput this.props: ', this.props)

        const imageUrl = this.props.defaultValue || this.state.imageUrl;
        console.log('ImageInput imageUrl: ', imageUrl)

        return (
            <div className={`${styles.imageInput} ${this.props.className}`}>
                <div className={styles.labelContainer}>
                    <div className={styles.label}>
                        {this.props.label}
                    </div>
                    {this.props.secondaryLabel && (
                        <div className={styles.secondaryLabel}>
                            {this.props.secondaryLabel}
                        </div>
                    )}
                </div>
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
                        {/* <div className={styles.uploadButtonContainer}>
                            <input type="file" />
                            <SendButton
                                onClick={this.initActions}
                                status={this.state.uploadStatus}
                            >
                                Upload
                            </SendButton>
                        </div> */}


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
                                    Upload
                                </SendButton>
                                <input type="file" />
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
