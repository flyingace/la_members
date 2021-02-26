import React from 'react';
import styled from 'styled-components';

const TBar = styled.div`
  width: 100%;
  padding: 16px;
  background: linear-gradient(90deg,#005000,#013901);
  font-size: 27px;
  font-weight: 700;
  text-align: left;
  color: white;
`;

/* TitleBar */
export default function TitleBar(props) {
  const { children } = props;

  return (
    <TBar>
      {children}
    </TBar>
  );
};

TitleBar.propTypes = {};

TitleBar.defaultProps = {};
/* */

