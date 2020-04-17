import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import './loading.css';

const LoadingIcon = (props) => {
    return (<figure className="to-arrow">
        { props.isLoading === false 
            ? <FontAwesomeIcon icon={faArrowRight} /> 
            : <FontAwesomeIcon icon={faSpinner} spin />
        }
    </figure>)
}

export default LoadingIcon;