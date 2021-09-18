import { css } from '@emotion/react';

export const cssSuggestions = css`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.25);
  list-style: none;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow: auto;
  li {
    width: 100%;
    padding: 8px;
    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
    list-style: none;
    list-style-type: none;
    cursor: pointer;
    &:hover {
      background-color: #ddeef7;
    }
  }
`;
export const cssIsActive = css`
  background-color: #ddeef7;
`;

export const cssSubInfo = css`
  font-size: 12px;
  color: #888;
`;
