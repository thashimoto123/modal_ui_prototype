import React, {  useState } from 'react';
import { css } from '@emotion/react';
import { FaChevronDown } from 'react-icons/fa';
import { userData, User, Group } from '../data';
import { userFilter, groupFilter } from '../filters';
import { TextInput } from './TextInput';
import { SearchTypeModal, typeUser, SearchType } from './SearchTypeModal';
import { UserSuggestions } from './suggestions/UserSuggestions';
import { GroupSuggestions } from './suggestions/GroupSuggestions';
import { SelectedUsers } from './SelectedUsers';

const actions = [{ id: 0, label: '共有しない' }, { id: 1, label: 'アカウント内のすべてのユーザーに共有する'}, { id: 2, label: 'アカウント内の選択したユーザーに共有する'}];

export const Modal: React.FC = () => {
  const [action, setAction] = useState(0);
  const [word, setWord] = useState("");
  const [isOpenSearchType, setIsOpenSearchType] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>(typeUser);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [focused, setFocused] = useState(false);
  const userList = userData.users;
  const groupList = userData.groups;
  const filteredUserList = userList.filter((user: User) => !selectedUsers.includes(user));
  const onChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const onChangeAction = (e: React.ChangeEvent<HTMLInputElement>) => setAction(Number(e.target.value));
  const onClickSearchType = () => { setIsOpenSearchType(!isOpenSearchType) };
  const onChangeSearchType = (type: SearchType) => { setSearchType(type) };
  const onSelect = (user: User) => {
    if (selectedUsers.find((u: User) => u.id === user.id)) return;
    setSelectedUsers([...selectedUsers, user]);
    setWord("");
  }
  const onSelectGroup = (group: Group) => {
    const users = group.users.filter((user) => !selectedUsers.find((u) => u.id === user.id))
    setSelectedUsers([...selectedUsers, ...users]);
    setWord("");
  }
  return <div css={cssWrapper}>
    <div css={cssOverlay}></div>
    <div css={cssModalContent}>
      <h2 css={cssModalTitle}>プロジェクトの他ユーザーとの共有</h2>
      <div onChange={onChangeAction}>{
        actions.map((action) => (
          <div key={action.label} css={cssActionsItem}><label><input name="action" type="radio" value={action.id} />{ action.label }</label></div>
        ))
      }</div>
      {
        action === 2 &&
        <>
          <div css={cssWordInputWrapper}>
            <TextInput defaultValue={word} onInputCapture={onChangeWord} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            <div css={cssSearchType} style={{whiteSpace: 'nowrap', marginLeft: 10}}>{ searchType === typeUser ? 'ユーザー名' : 'グループ名' }</div>
            <div
              css={[cssArrowDownButton, isOpenSearchType && cssButtonIsActive]}
              onClick={onClickSearchType}
            >
              <FaChevronDown />
              <SearchTypeModal css={cssTypeModalPosition} isOpen={isOpenSearchType} onChange={onChangeSearchType} value={searchType} />
            </div>
            {
              searchType === typeUser
              ? <UserSuggestions css={cssSuggestions} visible={focused} word={word} list={filteredUserList} filter={userFilter} onSelect={onSelect} />
              : <GroupSuggestions css={cssSuggestions} visible={focused} word={word} list={groupList} filter={groupFilter} onSelect={onSelectGroup} />
            }
          </div>
          <SelectedUsers users={selectedUsers} />
        </>
      }
    </div>
  </div>
}

const cssWrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const cssOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`
const cssModalContent = css`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 30px;
  max-width: 1000px;
  border-radius: 15px;
  background-color: #fff;
`;

const cssModalTitle = css`
  margin-bottom: 24px;
  font-size: 30px;
`;

const cssActionsItem = css`
  margin-bottom: 14px;
  input {
    margin-right: 10px;
  }
`;

const cssWordInputWrapper = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const cssArrowDownButton = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 14px;
  padding: 6px;
  border-radius: 5px;
  transition: 200ms ease-out;
  svg {
    transition: 200ms ease-out;
  }
  &:hover {
    background-color: #ddeef7;
  }
`;

const cssButtonIsActive = css`
  background-color: #ddeef7;
  svg {
    transform: rotate(180deg);
  }
`;

const cssSearchType = css`
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;

const cssTypeModalPosition = css`
  position: absolute;
  top: calc(100% + 10px);
  left: -5px;
`;

const cssSuggestions = css`
  position: absolute;
  top: 100%;
  left: 0;
`;
