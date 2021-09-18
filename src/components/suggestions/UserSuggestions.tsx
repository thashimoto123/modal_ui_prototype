import React from 'react';
import { User } from '../../data';
import * as styles from './styles';
import useSuggestion from '../../hooks/useSuggestion';

type Props = {
  className?: string;
  word: string;
  list: User[];
  filter: (word: string, list: User[]) => User[];
  visible: boolean;
  onSelect: (group: User) => void;
}
export const UserSuggestions: React.FC<Props> = ({
  className,
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
    <ul css={styles.cssSuggestions} className={className}>
    {
      suggestions.map((item, i) => (
        <li
          key={item + i}
          css={[i === activeIndex && styles.cssIsActive]}
          onMouseDown={() => onSelect(item)}
        >{ item.name }<br/><span css={styles.cssSubInfo}>{ item.email }</span></li>
      ))
    }
    </ul>
  )
}
