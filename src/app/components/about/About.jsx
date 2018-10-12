import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function About(props) {
    return (
        <div className={styles.about}>
            <div className={styles.content}>
                {props.description.map((data, index) => {
                    if (data.image) {
                        return (
                            <div key={data.id} className={styles.imageContainer}>
                                <img src={data.url} alt={data.alt} className={styles.image} />
                            </div>
                        );
                    }

                    if (data.text) {
                        let textAfter = false;

                        if (data.heading) {
                            if (index + 1 < props.description.length) {
                                const upcoming = props.description[index + 1];
                                if (upcoming.text && !upcoming.heading) {
                                    textAfter = true;
                                }
                            }
                        }

                        return (
                            <div
                                key={data.id}
                                className={
                                    `${
                                        styles.text
                                    } ${
                                        data.heading ? styles.heading : ''
                                    } ${
                                        textAfter ? styles.textAfter : ''
                                    }`
                                }
                            >
                                {data.content}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

About.propTypes = {
    description: PropTypes.arrayOf(PropTypes.shape({})),
};

About.defaultProps = {
    description: [],
};

export default About;
