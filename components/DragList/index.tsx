import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  FlatListProps,
  Insets,
  LayoutChangeEvent,
  LayoutRectangle,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import {
  DragListProvider,
  LayoutCache,
  useDragListContext,
} from './DragListContext';

type ExtraData = {
  activeKey: string | null;
  panIndex: number;
};

export interface DragListRenderItemInfo<T> extends ListRenderItemInfo<T> {
  isActive: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export interface DragListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  containerStyle?: StyleProp<ViewStyle>;
  data: T[];
  insets?: Insets;
  keyExtractor: (item: T) => string;
  onLayout?: (event: LayoutChangeEvent) => void;
  onReordered?: (fromIndex: number, toIndex: number) => Promise<void>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  renderItem: (info: DragListRenderItemInfo<T>) => React.ReactElement | null;
}

function DragList<T>(props: DragListProps<T>) {
  const {
    containerStyle,
    data,
    insets,
    keyExtractor,
    onLayout,
    onScroll,
    renderItem,
    ...otherProps
  } = props;

  // activeKey and activeIndex represent the item being dragged
  const activeKey = useRef<string | null>(null);
  const activeIndex = useRef(-1);

  // list position where pan gesture is currently at
  const panIndex = useRef(-1);

  // ensure flat list re-renders when activeKey or panIndex changes
  const [extra, setExtra] = useState<ExtraData>({
    activeKey: activeKey.current,
    panIndex: -1,
  });

  const layouts = useRef<LayoutCache>(new Map()).current;
  const dataRef = useRef(data);
  const panGranted = useRef(false);
  const reorderRef = useRef(props.onReordered);

  const flatRef = useRef<FlatList<T> | null>(null);
  const wrapRef = useRef<View>(null);
  const wrapLayout = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });

  const scrollPos = useRef(0);

  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !!activeKey.current,
      onStartShouldSetPanResponderCapture: () => !!activeKey.current,
      onMoveShouldSetPanResponder: () => !!activeKey.current,
      onMoveShouldSetPanResponderCapture: () => !!activeKey.current,
      onPanResponderGrant: (_, gesture) => {
        pan.setValue(gesture.dy);
        panGranted.current = true;
        wrapRef.current?.measureInWindow((x, y) => {
          wrapLayout.current = { ...wrapLayout.current, x, y };
        });
      },
      onPanResponderMove: (_, gesture) => {
        const wrapY = gesture.y0 + gesture.dy - wrapLayout.current.y;
        const clientY = wrapY + scrollPos.current - (insets?.top ?? 0);

        if (activeKey.current && layouts.has(activeKey.current)) {
          const itemHeight = layouts.get(activeKey.current)!.height;

          // compute what the `panIndex` should be based on items sizes.
          let currentIndex = 0;
          let key;
          while (
            currentIndex < dataRef.current.length &&
            layouts.has((key = keyExtractor(dataRef.current[currentIndex]))) &&
            layouts.get(key)!.y + layouts.get(key)!.height < clientY
          ) {
            currentIndex++;
          }

          pan.setValue(
            clientY - (layouts.get(activeKey.current)!.y + itemHeight / 2),
          );

          const topEdge = wrapY - itemHeight / 2.5;
          const bottomEdge = wrapY + itemHeight / 2.5;

          let offset = 0;
          if (topEdge < (insets?.top ?? 0)) {
            offset =
              scrollPos.current >= itemHeight
                ? -itemHeight
                : -scrollPos.current;
          } else if (bottomEdge > wrapLayout.current.height) {
            offset = scrollPos.current + itemHeight;
          }

          if (offset !== 0) {
            flatRef?.current?.scrollToOffset({
              animated: true,
              offset: scrollPos.current + offset,
            });
          }

          if (panIndex.current !== currentIndex) {
            setExtra((prev) => ({ ...prev, panIndex: currentIndex }));
          }

          panIndex.current = currentIndex;
        }
      },
      onPanResponderRelease: () => {
        if (
          activeIndex.current !== panIndex.current &&
          // ignore the case where last item is dragged beyond the end
          !(
            activeIndex.current === dataRef.current.length - 1 &&
            panIndex.current > activeIndex.current
          )
        ) {
          reorderRef.current?.(activeIndex.current, panIndex.current);
        }
        reset();
      },
    }),
  ).current;

  const reset = useCallback(() => {
    activeIndex.current = -1;
    activeKey.current = null;
    panIndex.current = -1;
    setExtra({ activeKey: null, panIndex: -1 });
    pan.setValue(0);
    panGranted.current = false;
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    reorderRef.current = props.onReordered;
  }, [props.onReordered]);

  const renderDragItem = useCallback(
    (info: ListRenderItemInfo<T>) => {
      const key = keyExtractor(info.item);
      const isActive = key === activeKey.current;
      const onDragStart = () => {
        // disable dragging for lists of a single item
        if (data.length > 1) {
          activeIndex.current = info.index;
          activeKey.current = key;
          panIndex.current = activeIndex.current;
          setExtra({ activeKey: key, panIndex: info.index });
        }
      };
      const onDragEnd = () => {
        if (activeKey.current !== null && !panGranted.current) {
          reset();
        }
      };
      return props.renderItem({
        ...info,
        onDragStart,
        onDragEnd,
        isActive,
      });
    },
    [data.length],
  );

  const onDragScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollPos.current = event.nativeEvent.contentOffset.y;
      if (onScroll) {
        onScroll(event);
      }
    },
    [onScroll],
  );

  const onDragLayout = useCallback(
    (event: LayoutChangeEvent) => {
      wrapRef.current?.measure((x, y, width, height) => {
        wrapLayout.current = { x, y, width, height };
      });
      if (onLayout) {
        onLayout(event);
      }
    },
    [onLayout],
  );

  return (
    <DragListProvider
      activeIndex={activeIndex.current}
      activeKey={activeKey.current}
      keyExtractor={keyExtractor}
      layouts={layouts}
      pan={pan}
      panIndex={panIndex.current}>
      <View
        ref={wrapRef}
        style={containerStyle}
        {...panResponder.panHandlers}
        onLayout={onDragLayout}>
        <FlatList
          ref={flatRef}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderDragItem}
          CellRendererComponent={CellRendererComponent}
          extraData={extra}
          scrollEnabled={!activeKey.current}
          onScroll={onDragScroll}
          removeClippedSubviews={false}
          {...otherProps}
        />
      </View>
    </DragListProvider>
  );
}

const SCALE_DURATION = 200;
const SLIDE_DURATION = 200;

type CellRendererProps<T> = React.PropsWithChildren<{
  item: T;
  index: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
}>;

function CellRendererComponent<T>(props: CellRendererProps<T>) {
  const { item, index, children, style, onLayout, ...otherProps } = props;
  const { keyExtractor, activeKey, activeIndex, layouts, pan, panIndex } =
    useDragListContext<T>();

  const [isOffset, setIsOffset] = useState(false);

  const key = keyExtractor(item, index);
  const isActive = key === activeKey;

  const scale = useRef(new Animated.Value(1)).current;
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeKey && !isActive && layouts.has(activeKey)) {
      if (index >= panIndex && index <= activeIndex) {
        Animated.timing(slide, {
          duration: SLIDE_DURATION,
          easing: Easing.inOut(Easing.linear),
          toValue: layouts.get(activeKey)!.height,
          useNativeDriver: true,
        }).start();
        setIsOffset(true);
        return;
      } else if (index >= activeIndex && index <= panIndex) {
        Animated.timing(slide, {
          duration: SLIDE_DURATION,
          easing: Easing.inOut(Easing.linear),
          toValue: -layouts.get(activeKey)!.height,
          useNativeDriver: true,
        }).start();
        setIsOffset(true);
        return;
      }
    }
    if (!activeKey) {
      slide.setValue(0);
    }
    setIsOffset(false);
  }, [index, panIndex, activeKey, activeIndex, isActive]);

  useEffect(() => {
    if (!isOffset) {
      Animated.timing(slide, {
        duration: SLIDE_DURATION,
        easing: Easing.inOut(Easing.linear),
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffset]);

  useEffect(() => {
    if (isActive) {
      Animated.timing(scale, {
        duration: SCALE_DURATION,
        easing: Easing.inOut(Easing.linear),
        toValue: 1.02,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scale, {
        duration: SCALE_DURATION,
        easing: Easing.inOut(Easing.linear),
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive]);

  function onCellLayout(event: LayoutChangeEvent) {
    layouts.set(key, event.nativeEvent.layout);
    if (onLayout) {
      onLayout(event);
    }
  }

  const animation = isActive
    ? {
        elevation: 1,
        zIndex: 999,
        transform: [{ scale }, { translateY: pan }],
      }
    : {
        elevation: 0,
        zIndex: 0,
        transform: [{ scale }, { translateY: slide }],
      };

  return (
    <Animated.View
      key={key}
      {...otherProps}
      style={[style, animation]}
      onLayout={onCellLayout}>
      {children}
    </Animated.View>
  );
}

export default DragList;
