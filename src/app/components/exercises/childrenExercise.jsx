import React from 'react';
import PropTypes from 'prop-types';
import CollapseWrapper from '../common/collapse';
import Divider from '../common/divider';
import SmallTitle from '../common/typografy/smallTitle';

const ChildrenExercise = () => {
   return (
      <CollapseWrapper title="Упражнение">
         <p className="mt-3">
            У вас есть компоненты Списка. Вам необходимо к каждому из них
            добавить порядковый номер, относительно того, как они располагаются
            на странице. Вы можете использовать как{' '}
            <code>React.Children.map</code> так и{' '}
            <code>React.Children.toArray</code>
         </p>
         <Divider />
         <SmallTitle>Решение</SmallTitle>

         <ComponentsWrapper>
            <Component />
            <Component />
            <Component />
         </ComponentsWrapper>
      </CollapseWrapper>
   );
};
const ComponentsWrapper = ({ children }) => {
   const arrayOfChildren = React.Children.toArray(children);
   return React.Children.map(arrayOfChildren, (child) =>
      React.cloneElement(child, {
         ...child.props,
         number: +child.key.replace('.', '') + 1,
      })
   );
};

ComponentsWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
};

const Component = ({ number }) => {
   return <div>{number} Компонент списка</div>;
};

Component.propTypes = {
   number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ChildrenExercise;
