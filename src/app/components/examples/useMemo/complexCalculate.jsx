import React, { useState, useEffect, useMemo } from 'react';
import CardWrapper from '../../common/Card';
import SmallTitle from '../../common/typografy/smallTitle';

function factorial(n) {
   return n ? n * factorial(n - 1) : 1;
}

function runFactorial(n) {
   console.log('run Factorial');
   return factorial(n);
}

const ComplexCalculateExample = () => {
   const [value, setVlue] = useState(100);
   const [otherState, setOtherState] = useState('false');
   const buttonCollor = otherState ? 'primary' : 'secondary';

   useEffect(() => {
      console.log('render button color');
   }, [buttonCollor]);
   const fact = useMemo(() => runFactorial(value), [value]);
   return (
      <>
         <CardWrapper>
            <SmallTitle>Кэширование сложных вычислений</SmallTitle>
            <p>Value: {value}</p>
            <p>Result fact: {fact}</p>
            <button
               className="btn btn-primary mx-2"
               onClick={() => setVlue((prevState) => prevState + 10)}
            >
               Inctriment
            </button>
            <button
               className="btn btn-primary mx-2"
               onClick={() => setVlue((prevState) => prevState - 10)}
            >
               Dictriment
            </button>
         </CardWrapper>
         <CardWrapper>
            <SmallTitle>Зависимость от сторонних setState</SmallTitle>
            <button
               className={`btn ms-md-2 btn-` + buttonCollor}
               onClick={() => setOtherState((prevState) => !prevState)}
            >
               Change color
            </button>
         </CardWrapper>
      </>
   );
};

export default ComplexCalculateExample;
