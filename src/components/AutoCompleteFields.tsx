import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';
import React from 'react'
import { CastMember } from '../types/CastMember';
import { Category } from '../types/Category';
import { Genre } from '../types/Genre';

type Props = {
    isLoading?: boolean;
    isDisabled?: boolean;
    options: (Genre | Category | CastMember)[];
    values?: (Genre | Category | CastMember)[];
    label: string;
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AutoCompleteFields({
    isLoading,
    options,
    values,
    label,
    name,
    handleChange
}: Props) {

    function renderOptions(props: React.HTMLAttributes<HTMLLIElement>, option: Genre | Category | CastMember){
        return (
            <li {...props} key={option.id}>
                    {option.name}
            </li>
        );
    }

    function handleOnChange(_e: React.SyntheticEvent<Element, Event>, newValue: (Genre | Category | CastMember)[]) {
        handleChange({
            target: { name: name, value: newValue.map(c => c) }
        } as any)
    }

    const renderInputs =(params: AutocompleteRenderInputParams ) => <TextField {...params} label={label} />;

    const isEqual = (option: Genre | Category | CastMember, value: Genre | Category | CastMember) => { 
        if(!option || !value) return false
        return option.id === value.id;
    }
    
    return (
        <Autocomplete
            multiple
            loading={isLoading}
            options={options}
            isOptionEqualToValue={isEqual}
            value={values}
            disabled={options.length === 0}
            getOptionLabel={(option) => option.name}
            renderOption={renderOptions}
            onChange={handleOnChange}
            sx={{ width: '100%' }}
            renderInput={renderInputs}
        />
    )
}
