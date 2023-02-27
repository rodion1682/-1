import React, { useCallback, useEffect, useRef, useState } from 'react';
import CardWrapper from '../../common/Card';
import SmallTitle from '../../common/typografy/smallTitle';

const UseCallBackExample = () => {
   const [data, setData] = useState({});
   const withOutCallback = useRef(0);
   const withCallback = useRef(0);
   const handeChange = ({ target }) => {
      setData((prevState) => ({ ...prevState, [target.name]: target.value }));
   };

   // Without callback
   const validateWithOutCallback = (data) => {
      console.log(data);
   };
   useEffect(() => {
      withOutCallback.current++;
   }, [validateWithOutCallback]);

   // With callback
   const validateWithCallback = useCallback((data) => {
      console.log(data);
   }, []);
   useEffect(() => {
      withCallback.current++;
   }, [validateWithCallback]);

   useEffect(() => {
      validateWithOutCallback(data);
      validateWithCallback(data);
   }, [data]);

   return (
      <CardWrapper>
         <SmallTitle>Example</SmallTitle>
         <p>render withOutCallback: {withOutCallback.current}</p>
         <p>render withCallback: {withCallback.current}</p>
         <label htmlFor="email" className="form-label">
            Email
         </label>
         <input
            type="email"
            className="form-control"
            id="email"
            value={data.email || ''}
            name="email"
            onChange={handeChange}
         />
      </CardWrapper>
   );
};

export default UseCallBackExample;
