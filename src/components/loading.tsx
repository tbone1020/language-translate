import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import './loading.css';

const LoadingIcon = (props) => {
    return (<figure className="to-arrow">
        { props.isTranslating === false 
            ? <FontAwesomeIcon icon={faArrowRight} /> 
            : <FontAwesomeIcon size="lg" icon={faSpinner} spin />
        }
    </figure>)
}

export default LoadingIcon;