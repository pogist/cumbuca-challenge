import { useProductFields } from '@hooks/product';
import { makeThemedStyles, useTheme } from '@theme';
import { Product } from '@types';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type ProductField = keyof Product | undefined;

type ProductListHeaderItemData = {
  title: string;
  field: NonNullable<ProductField>;
};

export interface ProductListHeaderProps {
  selectedField: ProductField;
  setSelectedField: (update: (field: ProductField) => ProductField) => void;
}

export const ProductListHeader: React.FC<ProductListHeaderProps> = React.memo(
  ({ selectedField, setSelectedField }) => {
    const theme = useTheme();
    const styles = themedStyles(theme);

    const fields = useProductFields();
    const data: ProductListHeaderItemData[] = Object.keys(fields).map(
      (field) => ({
        field: field as NonNullable<ProductField>,
        title: fields[field as NonNullable<ProductField>],
      }),
    );

    const renderItem = (item: ProductListHeaderItemData) => {
      const onPress = () =>
        setSelectedField((field) =>
          item.field !== field ? item.field : undefined,
        );

      return (
        <Pressable
          style={styles.itemContainer}
          key={item.field}
          onPress={onPress}>
          <ProductListHeaderItem
            title={item.title}
            isSelected={item.field === selectedField}
          />
        </Pressable>
      );
    };

    return <View style={styles.container}>{data.map(renderItem)}</View>;
  },
);

export interface ProductListHeaderItemProps {
  title: string;
  isSelected: boolean;
}

export const ProductListHeaderItem: React.FC<ProductListHeaderItemProps> = ({
  title,
  isSelected,
}) => {
  const theme = useTheme();
  const styles = themedStyles(theme);

  const style: ViewStyle[] = [styles.unselectedItem];
  const titleStyle: TextStyle[] = [styles.unselectedItemTitle];

  if (isSelected) {
    style.push(styles.selectedItem);
    titleStyle.push(styles.selectedItemTitle);
  }

  return (
    <View style={[styles.baseItem, style]}>
      <Text style={[styles.baseItemText, titleStyle]}>{title}</Text>
    </View>
  );
};

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
    },
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    baseItem: {
      paddingHorizontal: 3,
    },
    baseItemText: {
      fontWeight: '600',
    },
    selectedItem: {
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
    unselectedItem: {
      backgroundColor: theme.colors.background,
    },
    selectedItemTitle: {
      color: theme.colors.primaryText,
    },
    unselectedItemTitle: {
      color: theme.colors.primary,
    },
  }),
);
