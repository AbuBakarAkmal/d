import React from 'react'
import classes from './Input.module.css'
// import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

export const Select = (props) => {
    return (
        <div className={classes.select_box}>
            {/* <ArrowDropDownOutlinedIcon /> */}
            <label className={classes.select_box__label}>{props?.label}</label>
            <select name={props.name} onChange={props.change} className={classes.select + " " + props?.className}>
                <option value={props?.list[0]?.value}>{props?.list[0]?.name}</option>
                {props.list?.slice(1).map((item, i) => <option key={i} value={props.value}>
                    {item.name}
                </option>
                )}
            </select>
        </div>
    )
}

export const SelectSmall = (props) => {
    return (
        <div className={classes.select_box}>
            {/* <ArrowDropDownOutlinedIcon /> */}
            <label className={classes.select_box__label}>{props?.label}</label>
            <select name={props.name} onChange={props.change} className={classes.SelectSmall + " " + props?.className}>
                <option value={props?.list[0]?.value}>{props?.list[0]?.name}</option>
                {props.list?.slice(1).map((item, i) => <option key={i} value={props.value}>
                    {item.name}
                </option>
                )}
            </select>
        </div>
    )
}


export const InlineSelect = (props) => {
    return (
        <select onChange={props.change} className={[classes.selectInline,props?.className].join(" ")}>
            <option value={props?.list[0]?.value}>{props?.list[0]?.name}</option>
            {props.list?.slice(1).map((item, i) => <option key={i} value={props.value}>
                {item.name}
            </option>
            )}
        </select>
    )
}


export const Input = (props) => {
    return (
        <>
            <label className={classes.select_box__label}>{props?.label}</label>
            <input value={props.value} onChange={props.onChange} className={classes.input}
                placeholder={props.placeholder}
                {...props}>
            </input>
        </>
    )
}

export const InputSmall = (props) => {
    return (
        <>
            <label className={classes.select_box__label}>{props?.label}</label>
            <input value={props.value} onChange={props.onChange} className={classes.InputSmall}
                placeholder={props.placeholder}
                {...props}>
            </input>
        </>
    )
}

export const InputInt = (props) => {
    return (
        <>
            <label className={classes.select_box__label}>{props?.label}</label>
            <div className={classes.input_int} >
                <span className={classes.input_int__span}>{props.span}</span>
                <IconButton onClick={props.increment}>
                    <AddIcon />
                </IconButton>
                <span className={classes.input_int__value}>{props.value}</span>
                <IconButton onClick={props.decrement}>
                    <RemoveIcon />
                </IconButton>
            </div>
        </>
    )
}

export const Textarea = (props) => {
    return (
        <>
            <label className={classes.select_box__label}>{props?.label}</label>
            <textarea {...props} value={props.value} onChange={props.onChange} className={classes.textarea + " " + props?.className}>Some text...</textarea>
        </>
    )
}


