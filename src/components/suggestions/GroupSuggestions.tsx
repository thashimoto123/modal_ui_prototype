import React from 'react';
import * as styles from './styles';
import useSuggestion from '../../hooks/useSuggestion';

export const GroupSuggestions: React.FC<{ word: string; list: any[]; filter: any; onSelect: any; visible: boolean; }> = ({
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
    <ul css={styles.cssSuggestions}>
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
