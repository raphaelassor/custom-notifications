import InfoIcon from '@material-ui/icons/InfoOutlined';
import WarningIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorIcon from '@material-ui/icons/NotInterestedOutlined';
import SucessIcon from '@material-ui/icons/DoneOutlined';
import ExitIcon from '@material-ui/icons/ClearOutlined';
import { useState,useEffect } from 'react';

export const UserNotification = ({ notific, handleClick }) => {
const [className,setClass]=useState('')
    useEffect(()=>{
        setTimeout(()=>{
            setClass('slide')
        },200)
    },[])
    const getIcon = (type) => {
        const options = {
            info: <InfoIcon />,
            success: <SucessIcon />,
            warning: <WarningIcon />,
            error: <ErrorIcon />,
        }
        return options[type] || options.info
    }

    return <div onClick={handleClick}
        className={`user-notification ${notific.type || 'default'} ${className}` }>
        {getIcon(notific.type)}
        <span className="msg">
        {notific.message}
        </span>
        <ExitIcon />
    </div>
}