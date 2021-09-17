
import { User, Group } from '../data';
interface Converter {
  (str: string): string;
}

const kana2hira = (str:string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, (match: string):string => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
  })
}

const hira2kana = (str: string): string => {
  console.log(str);
  return str.replace(/[\u3041-\u3096]/g, (match: string) => {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
  })
}

const lower2upper = (str: string): string => {
  return str.toUpperCase();
}

const upper2lower = (str: string): string => {
  return str.toLowerCase();
}

const createSearchPattern = (str: string, converters: Converter[]):string => {
  let convertedWords:string[] = converters.map((converter):string => {
      return converter(str);
  });
  let pattern:string = '';
  for (let i = 0; i < str.length; i++) {
      pattern += '[';
      for (let j = 0; j < convertedWords.length; j++){
          pattern +=  convertedWords[j][i];
      }
      pattern += ']';
  }
  pattern += '.*$';
  return pattern;
}

export const userFilter = (userName: string, users: User[]): User[] => {
  if (userName === '') return [...users];
  const converters = [hira2kana, kana2hira, upper2lower, lower2upper];
  const pattern = createSearchPattern(userName, converters);
  const reg = new RegExp(pattern);
  const hits = users.filter(user => {
    return user.name.match(reg);
  });
  return hits;
}

export const groupFilter = (groupName: string, groups: Group[]): Group[] => {
  if (groupName === '') return [...groups];
  const converters = [hira2kana, kana2hira, upper2lower, lower2upper];
  const pattern = createSearchPattern(groupName, converters);
  const reg = new RegExp(pattern);
  const hits = groups.filter(group => {
    return group.name.match(reg);
  });
  return hits;
}
