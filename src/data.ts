import faker from 'faker';

export type User = {
  id: string;
  name: string;
  email: string;
  permission: number;
}

export type Group = {
  id: string;
  name: string;
  users: User[];
}

export const permissions = { 0: '編集可', 1: '閲覧のみ' };
const users: User[] = [...Array(100)].map((_, i) => {
  faker.locale = 'ja';
  const name = faker.name.lastName() + ' ' + faker.name.firstName();
  faker.locale = 'en';
  const email = faker.internet.email();
  return {
    id: String(i),
    name: name,
    email: email,
    permission: Math.floor(Math.random() * 3),
  }
});
const groups: Group[] = [...Array(10)].map((_, i) => {
  faker.locale = 'ja';
  return {
    id: faker.random.uuid(),
    name: faker.name.jobTitle(),
    users: [...Array(10)].map((_, j) => (users[i * 10 + j])),
  };
});
export const userData = {
  users,
  groups,
}

console.log(userData);
