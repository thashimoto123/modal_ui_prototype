import React, {  useState } from 'react';
import { css } from '@emotion/react';
import { cx } from '@emotion/css';
import { FaChevronDown } from 'react-icons/fa';
import { userData, User, Group } from './data';
import useSuggestion from './hooks/useSuggestion';
import { userFilter, groupFilter } from './filters';
import { TextInput } from '@/components/TextInput';

console.log(userData);
const actions = [{ id: 0, label: '共有しない' }, { id: 1, label: 'アカウント内のすべてのユーザーに共有する'}, { id: 2, label: 'アカウント内の選択したユーザーに共有する'}];
export const Modal: React.FC = () => {
  const [action, setAction] = useState(0);
  const [word, setWord] = useState("");
  const [isOpenSearchType, setIsOpenSearchType] = useState(false);
  const [searchType, setSearchType] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [focused, setFocused] = useState(false);
  const list: any[] = searchType === 0 ? userData.users : userData.groups;
  const filteredList = searchType === 0 ? list.filter((user: any) => !selectedUsers.includes(user)) : list;
  console.log(selectedUsers);
  const onChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const onChangeAction = (e: React.ChangeEvent<HTMLInputElement>) => setAction(Number(e.target.value));
  const onClickSearchType = () => { setIsOpenSearchType(!isOpenSearchType) };
  const onChangeSearchType = (type: number) => { setSearchType(type) };
  const onSelect = (user: any) => {
    console.log('onselect', user);
    if (selectedUsers.find((u: any) => u.id === user.id)) return;
    setSelectedUsers([...selectedUsers, user]);
    setWord("");
  }
  const onSelectGroup = (group: Group) => {
    const users = group.users.filter((user) => selectedUsers.find((u) => u.id !== user.id))
    setSelectedUsers([...selectedUsers, ...users]);
    setWord("");
  }
  return <div css={cssWrapper}>
    <div css={cssOverlay}></div>
    <div css={cssModalContent}>
      <h2 css={cssModalTitle}>プロジェクトの他ユーザーとの共有</h2>
      <div css={cssActions} onChange={onChangeAction}>{
        actions.map((action) => (
          <div key={action.label} css={cssActionsItem}><label><input name="action" type="radio" value={action.id} />{ action.label }</label></div>
        ))
      }</div>
      {
        action === 2 &&
        <>
          <div css={cssWordInputWrapper}>
            <TextInput value={word} onInputCapture={onChangeWord} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            <div css={cssSearchType} style={{whiteSpace: 'nowrap', marginLeft: 10}}>{ searchType === 0 ? 'ユーザー名' : 'グループ名' }</div>
            <div
              css={cssArrowDownButton}
              className={cx({isActive: isOpenSearchType})}
              onClick={onClickSearchType}
            >
              <FaChevronDown />
              <SearchTypeModal isOpen={isOpenSearchType} onChange={onChangeSearchType} value={searchType} />
            </div>
            {
              searchType === 0
              ? <Suggestions visible={focused} word={word} list={filteredList} filter={userFilter} onSelect={onSelect} />
              : <GroupSuggestions visible={focused} word={word} list={filteredList} filter={groupFilter} onSelect={onSelectGroup} />
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

const cssActions = css`
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
  &.isActive {
    background-color: #ddeef7;
    svg {
      transform: rotate(180deg);
    }
  }
`;

const cssSearchType = css`
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;


const SearchTypeModal: React.FC<{
  isOpen: boolean;
  value: number;
  onChange: (type: number) => void;
}> = ({ isOpen, onChange, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  return <div css={cssSearchTypeModal} className={cx({ isOpen })}>
    <div className="modalTitle">SEARCH IN</div>
    <div onChange={handleChange}>
      <div className="searchTypeRadio"><label><input type="radio" name="searchType" value={0} defaultChecked={value === 0} />ユーザー名</label></div>
      <div className="searchTypeRadio"><label><input type="radio" name="searchType" value={1} defaultChecked={value === 1} />グループ名</label></div>
    </div>
  </div>
}
const cssSearchTypeModal = css`
  position: absolute;
  top: calc(100% + 10px);
  left: -5px;
  width: 260px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.25);
  opacity: 0;
  transition: 250ms ease-out;
  &.isOpen {
    opacity: 1;
  }
  .modalTitle {
    margin-bottom: 10px;
    font-size: 16px;
    color: #aaa;
  }
  .searchTypeRadio {
    margin-bottom: 6px;
    input {
      margin-right: 4px;
    }
  }
`;


const Suggestions: React.FC<{ word: string; list: any[]; filter: any; onSelect: any; visible: boolean; }> = ({
  word,
  list,
  filter,
  visible,
  onSelect,
}) => {
  const handleSelect = visible ? onSelect : () => {};
  const { suggestions, activeIndex } = useSuggestion(word, list, handleSelect, filter);
  if (!visible) return null;
  return (
    <ul css={cssSuggestions}>
    {
      suggestions.map((item, i) => (
        <li
          key={item + i}
          className={cx({isActive: i === activeIndex})}
          onMouseDown={() => onSelect(item)}
        >{ item.name }<br/><span className="email">{ item.email }</span></li>
      ))
    }
    </ul>
  )
}

const GroupSuggestions: React.FC<{ word: string; list: any[]; filter: any; onSelect: any; visible: boolean; }> = ({
  word,
  list,
  filter,
  visible,
  onSelect,
}) => {

  const handleSelect = visible ? onSelect : () => {};
  const { suggestions, activeIndex } = useSuggestion(word, list, handleSelect, filter);
  if (!visible) return null;
  return (
    <ul css={cssSuggestions}>
    {
      suggestions.map((item, i) => (
        <li
          key={item + i}
          className={cx({isActive: i === activeIndex})}
          onMouseDown={() => onSelect(item)}
        >{ item.name }<br/><span className="members">{ item.users.length } users</span></li>
      ))
    }
    </ul>
  )
}

const cssSuggestions = css`
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
    &:hover,
    &.isActive {
      background-color: #ddeef7;
    }
    .email,
    .members {
      font-size: 12px;
      color: #888;
    }
  }
`;

const SelectedUsers: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <ul css={cssSelectedUsers}>
      {users.map((user) => (
        <li key={user.id}>
          <span className="inner">
            <span>{ user.name }</span>
            <select name="" id="" value={user.permission}>
              <option value={0}>編集可</option>
              <option value={1}>閲覧のみ</option>
            </select>
          </span>
          <span className="email">{user.email}</span>
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
