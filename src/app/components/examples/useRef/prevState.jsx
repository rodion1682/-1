import React, { useRef, useState, useEffect } from 'react';
import CardWrapper from '../../common/Card';
import SmallTitle from '../../common/typografy/smallTitle';
const PrevStateExample = () => {
   const prevState = useRef('');
   const [otherState, setOtherState] = useState('false');
   const toogleOtherState = () => {
      setOtherState((prevState) => (prevState === 'false' ? 'true' : 'false'));
   };
   useEffect(() => {
      prevState.current = otherState;
   }, [otherState]);
   return (
      <CardWrapper>
         <SmallTitle>Предыдущее состояние</SmallTitle>
         <p>prev State {prevState.current}</p>
         <p>current State {otherState}</p>
         <button className="btn btn-primary" onClick={toogleOtherState}>
            Toggle other state
         </button>
      </CardWrapper>
   );
};

export default PrevStateExample;
