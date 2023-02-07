import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';

const Login = () => {
   const [data, setData] = useState({ email: '', password: '' });
   const [errors, setErrors] = useState({});

   const handelChange = ({ target }) => {
      setData((prevState) => ({
         ...prevState,
         [target.name]: target.value,
      }));
   };

   const validatorConfig = {
      email: {
         isRequired: { message: 'Email is required to fill' },
         isEmail: { message: 'Email typed incorrect' },
      },
      password: {
         isRequired: { message: 'Password is required to fill' },
         isCapitalSumbol: {
            message: 'Password must contain at least one capital symbol',
         },
         isContainDigit: {
            message: 'Password must contain at least one number',
         },
         min: {
            message: 'Password length must be at least 8 characters',
            value: 8,
         },
      },
   };

   useEffect(() => {
      validate();
   }, [data]);
   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const isValid = Object.keys(errors).length === 0;

   const handelSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      console.log(data);
   };

   return (
      <div className="container mt-5">
         <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
               <h3 className="mb-4">Login</h3>
               <form onSubmit={handelSubmit}>
                  <TextField
                     label="Email"
                     name="email"
                     value={data.email}
                     onChange={handelChange}
                     error={errors.email}
                  />
                  <TextField
                     label="Password"
                     type="password"
                     name="password"
                     value={data.password}
                     onChange={handelChange}
                     error={errors.password}
                  />
                  <button
                     type="submit"
                     className="btn btn-primary w-100 mx-auto"
                     disabled={!isValid}
                  >
                     Submit
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
