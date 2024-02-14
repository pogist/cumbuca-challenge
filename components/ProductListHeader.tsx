import { createStyles, useStyles } from '@theming';
import { Product } from '@types';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';

import Icon from './Icon';

type SortOrder = 'asc' | 'desc';
type ProductField = keyof Product | undefined;

type ProductListHeaderItemData = {
  title: string;
  field: NonNullable<ProductField>;
};

export interface ProductListHeaderProps {
  sortOrder: SortOrder;
  selectedField: ProductField;
  setSortOrder: (update: (order: SortOrder) => SortOrder) => void;
  setSelectedField: (update: (field: ProductField) => ProductField) => void;
}

export const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  sortOrder,
  selectedField,
  setSortOrder,
  setSelectedField,
}) => {
  const styles = useStyles(themedStyles);
  const fields = useRef({
    id: 'ID',
    name: 'Produto',
    price: 'Valor',
    quantity: 'Quantidade',
    totalPrice: 'Total',
  }).current;

  const renderItem = (item: ProductListHeaderItemData) => {
    const onPress = () =>
      setSelectedField((field) =>
        item.field !== field ? item.field : undefined,
      );
    return (
      <Pressable
        key={item.field}
        style={styles.itemContainer}
        onPress={onPress}>
        <ProductListHeaderItem
          title={item.title}
          isSelected={item.field === selectedField}
        />
      </Pressable>
    );
  };

  const toggleSortOrder = React.useCallback(() => {
    setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
  }, []);

  return (
    <View style={styles.container}>
      {Object.keys(fields).map((field) =>
        renderItem({
          field: field as NonNullable<ProductField>,
          title: fields[field as NonNullable<ProductField>],
        }),
      )}
      <Icon
        onPress={toggleSortOrder}
        name={sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'}
        style={styles.icon}
        containerStyle={styles.item}
      />
    </View>
  );
};

export interface ProductListHeaderItemProps {
  title: string;
  isSelected: boolean;
}

export const ProductListHeaderItem: React.FC<ProductListHeaderItemProps> = ({
  title,
  isSelected,
}) => {
  const styles = useStyles(themedStyles);
  const titleStyle: TextStyle[] = [styles.unselectedItemTitle];
  if (isSelected) {
    titleStyle.push(styles.selectedItemTitle);
  }
  return (
    <View style={styles.item}>
      <Text style={[styles.baseItemText, titleStyle]}>{title}</Text>
    </View>
  );
};

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    itemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      paddingHorizontal: 3,
    },
    icon: {
      color: theme.primary,
      fontSize: 18,
    },
    baseItemText: {
      fontSize: 15,
      fontWeight: '600',
    },
    selectedItemTitle: {
      color: theme.primary,
    },
    unselectedItemTitle: {
      color: theme.secondary,
    },
  }),
);
