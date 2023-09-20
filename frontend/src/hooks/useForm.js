import { useState } from "react";

export function useForm(inputValues={}) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    //   setValues({...values, [event.target.name]: event.target.value});
    };
    return {values, handleChange, setValues};
  }
  