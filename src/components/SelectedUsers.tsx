import React from 'react';
import { css } from '@emotion/react';
import { User } from '../data';

export const SelectedUsers: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <ul css={cssSelectedUsers}>
      {users.map((user) => (
        <li key={user.id}>
          <span css={cssInner}>
            <span>{ user.name }</span>
            <select name="" id="" value={user.permission}>
              <option value={0}>編集可</option>
              <option value={1}>閲覧のみ</option>
            </select>
          </span>
          <span css={cssEmail}>{user.email}</span>
        </li>
      ))}
    </ul>
  )
}

const cssSelectedUsers = css`
  padding: 0;
  width: 100%;
  border: 1px solid #aaa;
  overflow: auto;
  li {
    margin: 0;
    padding: 8px;
    &:not(:last-child) {
      border-bottom: 1px solid #aaa;
    }
    .inner {
      display: flex;
      justify-content: space-between;
    }
    .email {
      font-size: 12px;
      color: #888;
    }
  }
`;

const cssInner = css`
  display: flex;
  justify-content: space-between;
`;
const cssEmail = css`
  font-size: 12px;
  color: #888;
`;
