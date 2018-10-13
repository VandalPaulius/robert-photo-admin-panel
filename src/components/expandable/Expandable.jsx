import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Expandable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containerRef: null,
            contentRef: null,
            initialRender: true,
        };

        this.actions = this.initActions();
    }

    // eslint-disable-next-line react/sort-comp
    initActions() {
        return {
            setContainerRef: (containerRef) => {
                if (!this.state.containerRef) {
                    this.setState({ containerRef });
                }
            },
            setContentRef: (contentRef) => {
                if (!this.state.contentRef) {
                    this.setState({ contentRef });
                }
            },
            expand: () => {
                const targetHeight = this.state.contentRef.scrollHeight;
                this.state.containerRef.style.height = `${targetHeight}px`;

                const eventListenerHandler = () => {
                    this.props.onExpanded();
                    this.state.containerRef.removeEventListener('transitionend', eventListenerHandler);
                };
                this.state.containerRef.addEventListener('transitionend', eventListenerHandler);
            },
            contract: () => {
                this.state.containerRef.style.height = null;

                const eventListenerHandler = () => {
                    this.props.onContracted();
                    this.state.containerRef.removeEventListener('transitionend', eventListenerHandler);
                };
                this.state.containerRef.addEventListener('transitionend', eventListenerHandler);
            },
            setInitialRenderFlag: () => {
                this.setState({ initialRender: false });
            },
        };
    }

    componentDidUpdate(prevProps) {
        let shouldResize = false;

        if (this.state.initialRender && this.state.contentRef) {
            shouldResize = true;
        }
        if (prevProps.expanded !== this.props.expanded) {
            shouldResize = true;
        }

        if (shouldResize) {
            if (this.props.expanded) {
                this.actions.expand();
            } else {
                this.actions.contract();
            }
        }
    }

    render() {
        return (
            <div className={styles.expandable} ref={this.actions.setContainerRef}>
                <div ref={this.actions.setContentRef}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Expandable.propTypes = {
    expanded: PropTypes.bool,
    onExpanded: PropTypes.func,
    onContracted: PropTypes.func,
    children: PropTypes.node,
};

Expandable.defaultProps = {
    expanded: false,
    onExpanded: () => {},
    onContracted: () => {},
    children: '',
};

export default Expandable;
