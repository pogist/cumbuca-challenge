import React, { useContext } from 'react';
import { Animated, LayoutRectangle } from 'react-native';

export type LayoutCache = Map<string, LayoutRectangle>;

type DragListContextValue<T> = {
  activeIndex: number;
  activeKey: string | null;
  keyExtractor: (item: T, index: number) => string;
  layouts: LayoutCache;
  pan: Animated.Value;
  panIndex: number;
};

const DragListContext = React.createContext<
  DragListContextValue<any> | undefined
>(undefined);

type DragListProviderProps<T> = React.PropsWithChildren<
  DragListContextValue<T>
>;

export function DragListProvider<T>({
  activeIndex,
  activeKey,
  keyExtractor,
  layouts,
  pan,
  panIndex,
  children,
}: DragListProviderProps<T>) {
  const value = React.useMemo(
    () => ({ activeIndex, activeKey, keyExtractor, layouts, pan, panIndex }),
    [activeIndex, activeKey, keyExtractor, layouts, pan, panIndex],
  );
  return (
    <DragListContext.Provider value={value}>
      {children}
    </DragListContext.Provider>
  );
}

export function useDragListContext<T>(): DragListContextValue<T> {
  const value = useContext(DragListContext);
  if (!value) {
    throw new Error(
      'useDragListContext must be called within DragListProvider',
    );
  }
  return value;
}
