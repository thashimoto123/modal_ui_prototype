import { User, Group } from '../../src/data';
import { userFilter, groupFilter } from '../../src/filters';

describe('userFilter', () => {
  it('未入力の場合、 リスト内の全てのアイテムを出力する', () => {
    const list: User[] = [
      { id: '1', name: 'aaa', email: 'aaa@email.com', permission: 0 },
      { id: '2', name: 'bbb', email: 'bbb@email.com', permission: 0 },
    ];
    const output = userFilter('', list);
    expect(output).toEqual(list);
  });
  it('ひらがなとカタカナを区別せずにマッチする', () => {
    const list: User[] = [
      { id: '1', name: 'あああ', email: 'aaa@email.com', permission: 0 },
      { id: '2', name: 'アアア', email: 'bbb@email.com', permission: 1 },
      { id: '3', name: 'いいい', email: 'ccc@email.com', permission: 1 },
    ];
    const output = userFilter('あああ', list);
    expect(output).toEqual([list[0], list[1]]);
  });
  it('大文字と小文字を区別せずにマッチする', () => {
    const list: User[] = [
      { id: '1', name: 'aaa', email: 'aaa@email.com', permission: 0 },
      { id: '2', name: 'AAa', email: 'AAA@email.com', permission: 1 },
      { id: '3', name: 'acc', email: 'ccc@email.com', permission: 1 },
    ];
    const output = userFilter('aaa', list);
    expect(output).toEqual([list[0], list[1]]);
  });
});


describe('groupFilter', () => {
  it('未入力の場合、 リスト内の全てのアイテムを出力する', () => {
    const list: Group[] = [
      { id: '1', name: 'aaa', users: [] },
      { id: '2', name: 'bbb', users: [] },
    ];
    const output = groupFilter('', list);
    expect(output).toEqual(list);
  });
  it('ひらがなとカタカナを区別せずにマッチする', () => {
    const list: Group[] = [
      { id: '1', name: 'あああ', users: [] },
      { id: '2', name: 'アアア', users: [] },
      { id: '3', name: 'いいい', users: [] },
    ];
    const output = groupFilter('あああ', list);
    expect(output).toEqual([list[0], list[1]]);
  });
  it('大文字と小文字を区別せずにマッチする', () => {
    const list: Group[] = [
      { id: '1', name: 'aaa', users: [] },
      { id: '2', name: 'AAa', users: [] },
      { id: '3', name: 'acc', users: [] },
    ];
    const output = groupFilter('aaa', list);
    expect(output).toEqual([list[0], list[1]]);
  });
});
