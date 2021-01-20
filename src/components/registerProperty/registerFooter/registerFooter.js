import React from 'react'
import './registerFooter.css'
import Hr from '../../UI/hr/Hr'
import Button, {ButtonSecondary} from '../../UI/button/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const RegisterFooter = (props) => {
    // const btnsRef = useRef("")
    // console.log(btnsRef.current.style?.width)
    // btnsRef.current.style.width = props.width+"%"
    // console.log('width<>',props.width)

    const style = {
        width : (props.width+"%").toString(),
        marginTop : (props.marTop+'rem')
    }
    return (
        <div style={style}>
            <Hr className="pages__hr" />
            <div className="pages__next-back">
                <div 
                 className="pages__btn-back">
                    <ButtonSecondary onClick={props.prevURL}><ArrowBackIosIcon /> Back</ButtonSecondary>
                </div>
                {props.lastPage ? <Button onClick={props.publishHandler}>Publish</Button> : <Button onClick={props.nextURL}>Continue</Button>}

            </div>
        </div>
    )
}

export default RegisterFooter
