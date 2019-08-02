import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { errorTexts } from 'assets/errorTexts'

const editCellStyle = {
    fontSize: '0.875rem',
}

export const InputFieldText = (props) => {
    return (
        <TextValidator
            value={props.value}
            placeholder={props.columnDef.title}
            style={editCellStyle}
            onChange={e => props.onChange(e.target.value)}
            validators={['required']}
            errorMessages={[errorTexts.required]}
            helperText={"\n"}
            fullWidth
        />
    )
}

export const InputFieldNumber = (props) => {
    return (
        <TextValidator
            value={props.value}
            placeholder={props.columnDef.title}
            style={editCellStyle}
            type="number"
            inputProps={{ min: "1", max: "999", step: "1" }}
            onChange={e => props.onChange(e.target.value)}
            validators={['required', 'minFloat:1', 'maxFloat:999']}
            errorMessages={[errorTexts.required, errorTexts.minFloat, errorTexts.maxFloat]}
            helperText={"\n"}
            fullWidth
        />
    )
}

export const InputFieldPassword = (props) => {
    return (
        <TextValidator
            value={props.value}
            style={editCellStyle}
            placeholder={props.columnDef.title}
            type="password"
            onChange={e => props.onChange(e.target.value)}
            validators={['required']}
            errorMessages={[errorTexts.required]}
            helperText={"\n"}
            fullWidth
        />
    )
}

export const InputFieldEmail = (props) => {
    return (
        <TextValidator
            value={props.value}
            style={editCellStyle}
            placeholder={props.columnDef.title}
            onChange={e => props.onChange(e.target.value)}
            validators={['required', 'isEmail']}
            errorMessages={[errorTexts.required, errorTexts.Email]}
            helperText={"\n"}
            fullWidth
        />
    )
}
export const InputFieldPhone = (props) => {
    return (
        <TextValidator
            value={props.value}
            style={editCellStyle}
            placeholder={props.columnDef.title}
            onChange={e => props.onChange(e.target.value)}
            validators={['required', 'matchRegexp:^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$']}
            errorMessages={[errorTexts.required, errorTexts.PhoneNumber]}
            helperText={"\n"}
            fullWidth
        />
    )
}