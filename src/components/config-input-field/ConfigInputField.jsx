import React from 'react';
import PropTypes from 'prop-types';
import {
    HollowButton,
    RemoveConfirmationOverlay,
    InputField,
    ImageInput,
} from 'components';
import styles from './styles.scss';

class ConfigInputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showConfirmationOverlay: null,
        };

        this.actions = this.initActions();

        this.actions.toggleConfirmationOverlay = this.actions.toggleConfirmationOverlay.bind(this);
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
            toggleConfirmationOverlay: showConfirmationOverlay => this.setState({
                showConfirmationOverlay,
            }),
        };
    }

    renderButtonPanel() {
        return (
            <div className={styles.buttonPanel}>
                {this.props.onClickRemove && (
                    <HollowButton
                        text="Remove"
                        onClick={() => {
                            this.actions.toggleConfirmationOverlay(true);
                        }}
                    />
                )}
                <div className={styles.upDownContainer}>
                    {this.props.onClickUp && (
                        <HollowButton
                            text="Move up"
                            onClick={this.props.onClickUp}
                        />
                    )}
                    {this.props.onClickDown && (
                        <HollowButton
                            text="Move down"
                            onClick={this.props.onClickDown}
                        />
                    )}
                </div>
            </div>
        );
    }

    renderInput() {
        if (this.props.image) {
            return (
                <div className={styles.inputFieldContainer}>
                    <ImageInput
                        className={styles.inputField}
                        onUploaded={this.props.onImageUploaded}
                        defaultValue={this.props.defaultValue}
                        label={this.props.label}
                        secondaryLabel={this.props.secondaryLabel}
                        imageHeight="200px"
                    />
                </div>
            );
        }

        return (
            <div className={styles.inputFieldContainer}>
                <InputField
                    className={styles.inputField}
                    label={this.props.label}
                    setRef={this.props.setRef}
                    defaultValue={this.props.defaultValue}
                    secondaryLabel={this.props.secondaryLabel}
                    textarea={this.props.textarea}
                    minTextareaHeight="140px"
                />
            </div>
        );
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className={styles.configInputField}>
                    {this.renderInput()}
                    {this.props.children}
                    {this.renderButtonPanel()}
                </div>

                {this.state.showConfirmationOverlay && (
                    <RemoveConfirmationOverlay
                        onRemove={this.props.onClickRemove}
                        onCancel={() => this.actions.toggleConfirmationOverlay(false)}
                    />
                )}
            </div>
        );
    }
}

ConfigInputField.propTypes = {
    className: PropTypes.string,
    onClickRemove: PropTypes.func,
    onClickUp: PropTypes.func,
    onClickDown: PropTypes.func,
    setRef: PropTypes.func,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    secondaryLabel: PropTypes.string,
    textarea: PropTypes.bool,
    image: PropTypes.bool,
    onImageUploaded: PropTypes.func,
    children: PropTypes.node,
};

ConfigInputField.defaultProps = {
    className: '',
    onClickRemove: null,
    onClickUp: null,
    onClickDown: null,
    setRef: () => {},
    defaultValue: '',
    label: '',
    secondaryLabel: '',
    textarea: false,
    image: false,
    onImageUploaded: () => {},
    children: null,
};

export default ConfigInputField;
