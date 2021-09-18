import React from 'react';
import { css } from '@emotion/react';

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input css={cssWordInput} type={'text'} {...props} />
}

const cssWordInput = css`
  padding: 8px;
  width: 100%;
  font-size: 16px;
`;
