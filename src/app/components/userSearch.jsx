import React from 'react';

const UserSearch = ({ ...props }) => {
   return <input {...props} />;
};

// const UserSearch = React.forwardRef((props, ref) => {
// return <input ref={ref} {...props} />;
// });

export default UserSearch;
