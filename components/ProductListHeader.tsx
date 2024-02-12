import { useProductFields } from '@hooks/product';
import { createStyles, useStyles } from '@theming';
import { Product } from '@types';
import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';

type ProductField = keyof Product | undefined;

type ProductListHeaderItemData = {
  title: string;
  field: NonNullable<ProductField>;
};

export interface ProductListHeaderProps {
  selectedField: ProductField;
  setSelectedField: (update: (field: ProductField) => ProductField) => void;
}

export const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  selectedField,
  setSelectedField,
}) => {
  const fields = useProductFields();
  const styles = useStyles(themedStyles);

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

  return (
    <View style={styles.container}>
      {Object.keys(fields).map((field) =>
        renderItem({
          field: field as NonNullable<ProductField>,
          title: fields[field as NonNullable<ProductField>],
        }),
      )}
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
      backgroundColor: theme.background,
    },
    itemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      paddingHorizontal: 3,
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
