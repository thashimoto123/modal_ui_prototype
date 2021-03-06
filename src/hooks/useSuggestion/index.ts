import { useMemo, useState, useEffect } from 'react';
import getWordsContainingString from './getWordsContainingString';
import createKeydownHandler from './createKeydownHandler';

interface UseSuggestion {
  (
    // 検索するキーワード
    word: string,
    // キーワードを検索するリスト
    list: any[],
    // サジェスチョンを選択した時に実行する関数
    callbackSelectSuggestion: any,
    // リストからキーワード検索するためのフィルター関数
    filter?: (word: string, list: any[]) => any[]
  ) : {
    // サジェスチョンのリスト
    suggestions: any[];
    // 選択中のサジェスチョンのインデックス
    activeIndex: number;
  };
}

export const useSuggestion: UseSuggestion = (word, list, callbackSelectSuggestion, filter = getWordsContainingString) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const suggestions = useMemo(() => {
    return filter(word, list);
  }, [word, list, filter]);

  // 上矢印キーを押したときの処理
  // 選択中のサジェスチョンのインデックスを変更
  const handleKeydownArrowUp = useMemo(() => createKeydownHandler({
    key: 'ArrowUp',
    control: false,
    handler: (ev) => {
      if (suggestions.length === 0) return;
      ev.preventDefault();
      const newIndex = activeIndex - 1 >= -1 ? activeIndex -1 : suggestions.length - 1;
      setActiveIndex(newIndex);
    }
  }), [suggestions, activeIndex, setActiveIndex]);

  // 下矢印キーを押したときの処理
  // 選択中のサジェスチョンのインデックスを変更
  const handleKeydownArrowDown = useMemo(() => createKeydownHandler({
    key: 'ArrowDown',
    control: false,
    handler: (ev) => {
      if (suggestions.length === 0) return;
      ev.preventDefault();
      const newIndex = activeIndex + 1 < suggestions.length ? activeIndex + 1 : -1;
      setActiveIndex(newIndex);
    }
  }), [suggestions, activeIndex, setActiveIndex]);

  // エンターキーを押したときの処理
  // コールバック関数にサジェスチョンの値を渡す
  const handleKeydownEnter = useMemo(() => createKeydownHandler({
    key: 'Enter',
    control: false,
    handler: (ev) => {
      if (activeIndex === -1 || suggestions.length === 0) return;
      ev.preventDefault();
      callbackSelectSuggestion(suggestions[activeIndex]);
    }
  }), [suggestions, callbackSelectSuggestion, activeIndex]);

  const handleKeydown = useMemo(() => (ev:  KeyboardEvent) => {
    handleKeydownArrowUp(ev);
    handleKeydownArrowDown(ev);
    handleKeydownEnter(ev);
  }, [handleKeydownArrowUp, handleKeydownArrowDown, handleKeydownEnter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => { window.removeEventListener('keydown', handleKeydown)};
  }, [handleKeydown]);

  return { suggestions, activeIndex };
}

export default useSuggestion
