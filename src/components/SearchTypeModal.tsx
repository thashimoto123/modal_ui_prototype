import React from 'react';
import { css } from '@emotion/react';

export const SearchTypeModal: React.FC<{
  isOpen: boolean;
  value: number;
  onChange: (type: number) => void;
  className?: string;
}> = ({ isOpen, onChange, value, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  return (
    <div css={[cssSearchTypeModal, isOpen && cssIsOpen]} className={className}>
      <div css={cssModalTitle}>SEARCH IN</div>
      <div onChange={handleChange}>
        <div css={cssSearchTypeRadio}><label><input type="radio" name="searchType" value={0} defaultChecked={value === 0} />ユーザー名</label></div>
        <div css={cssSearchTypeRadio}><label><input type="radio" name="searchType" value={1} defaultChecked={value === 1} />グループ名</label></div>
      </div>
    </div>
  )
}

const cssSearchTypeModal = css`
  width: 260px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.25);
  opacity: 0;
  transition: 250ms ease-out;
  pointer-events: none;
`;

const cssIsOpen = css`
  opacity: 1;
  pointer-events: auto;
`;

const cssModalTitle = css`
  margin-bottom: 10px;
  font-size: 16px;
  color: #aaa;
`;

const cssSearchTypeRadio = css`
  margin-bottom: 6px;
  input {
    margin-right: 4px;
  }
`;
