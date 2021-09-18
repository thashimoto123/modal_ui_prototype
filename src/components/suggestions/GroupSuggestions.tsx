import React from 'react';
import { Group } from '../../data';
import * as styles from './styles';
import useSuggestion from '../../hooks/useSuggestion';

type Props = {
  className?: string;
  word: string;
  list: Group[];
  filter: (word: string, list: Group[]) => Group[];
  visible: boolean;
  onSelect: (group: Group) => void;
}
export const GroupSuggestions: React.FC<Props> = ({
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
        >{ item.name }<br/><span css={styles.cssSubInfo}>{ item.users.length } users</span></li>
      ))
    }
    </ul>
  )
}
