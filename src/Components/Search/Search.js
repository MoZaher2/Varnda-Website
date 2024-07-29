import {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import api from "../../API/ApiLink.js";
import { AllSearchOptions } from "../../utility/AllSearchOption.js";
export default function Search({setSearchText}) {
  // Get all data for search
  const [searchOptions,setSearchOptions]=useState(AllSearchOptions)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getAllCitiesAndGovernorates");
        setSearchOptions(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
    const handleOptionSelect = (event, value) => {
    if (value) {
      setSearchText(value)
    }
  };

  return (

    <Autocomplete
    multiple
    limitTags={2}
    id="multiple-limit-tags"
    options={searchOptions}
    onChange={handleOptionSelect}
    getOptionLabel={(option) => option.name}
    defaultValue={[]}
    getOptionSelected={(option, value) => option.id === value.id}
    sx={{ width: 300 }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="اختر الموقع"
        onKeyDown={handleKeyDown}
      />
    )}
    renderOption={(props, option, { selected }) => (
      <li {...props} key={`${option.name}-${props['data-option-index']}`}>
        {option.name}
      </li>
    )}
  />

  );
}






