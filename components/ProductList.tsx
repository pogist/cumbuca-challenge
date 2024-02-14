import { useCurrencyFormat, useNumberFormat } from '@hooks';
import { createStyles, useStyles, useTheme } from '@theming';
import { Product } from '@types';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DragList, { DragListRenderItemInfo } from './DragList';
import Icon from './Icon';
import { ProductListHeader } from './ProductListHeader';

type SortOrder = 'asc' | 'desc';
type ProductField = keyof Product | undefined;

export interface ProductListProps {
  products: Product[];
  sortOrder: SortOrder;
  selectedField: ProductField;
  onDecreaseQuantity: (id: Product['id']) => void;
  onDeleteItem: (id: Product['id']) => void;
  onIncreaseQuantity: (id: Product['id']) => void;
  onReorderProducts: (fromIndex: number, toIndex: number) => Promise<void>;
  setSelectedField: (update: (field: ProductField) => ProductField) => void;
  setSortOrder: (update: (order: SortOrder) => SortOrder) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  sortOrder,
  selectedField,
  onDeleteItem,
  onIncreaseQuantity,
  onReorderProducts,
  onDecreaseQuantity,
  setSelectedField,
  setSortOrder,
}) => {
  const styles = useStyles(themedStyles);

  const renderItem = React.useCallback(
    ({
      item,
      isActive,
      onDragStart,
      onDragEnd,
    }: DragListRenderItemInfo<Product>) => (
      <ProductListItem
        product={item}
        isActive={isActive}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDelete={() => onDeleteItem(item.id)}
        onIncreaseQuantity={() => onIncreaseQuantity(item.id)}
        onDecreaseQuantity={() => onDecreaseQuantity(item.id)}
      />
    ),
    [onDeleteItem, onIncreaseQuantity, onDecreaseQuantity],
  );

  return (
    <View style={styles.container}>
      <ProductListHeader
        sortOrder={sortOrder}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        setSortOrder={setSortOrder}
      />
      <DragList
        containerStyle={styles.container}
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onReordered={onReorderProducts}
      />
    </View>
  );
};

function keyExtractor(item: Product) {
  return `${item.name}_${item.id}`;
}

export interface ProductListItemProps {
  product: Product;
  isActive: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDelete: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  isActive,
  onDragStart,
  onDragEnd,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const theme = useTheme();
  const styles = useStyles(themedStyles);

  const price = useCurrencyFormat(product.price / 100);
  const totalPrice = useCurrencyFormat(product.totalPrice / 100);
  const quantity = useNumberFormat(product.quantity);

  return (
    <Pressable onLongPress={onDragStart} onPressOut={onDragEnd}>
      <View style={[styles.item, isActive ? styles.itemPressed : {}]}>
        <View style={styles.itemHeader}>
          <View style={styles.itemTitlePriceContainer}>
            <View style={styles.itemTitleIDContainer}>
              <Text style={styles.itemTitle}>{product.name}</Text>
              <Text style={styles.itemID}>(ID: {product.id})</Text>
            </View>
            <Text style={styles.itemPrice}>{price}</Text>
          </View>
          <Icon
            name="trash"
            size={20}
            color={theme.danger}
            onPress={onDelete}
          />
        </View>
        <View style={styles.itemFooter}>
          <View style={styles.itemTotalContainer}>
            <Text style={styles.itemTotalLabel}>Total:</Text>
            <Text style={styles.itemTotal}>{totalPrice}</Text>
          </View>
          <View style={styles.itemQuantityContainer}>
            <Icon
              name="dash"
              size={16}
              color={theme.secondary}
              onPress={onDecreaseQuantity}
            />
            <Text style={styles.itemQuantity}>{quantity}</Text>
            <Icon
              name="plus"
              size={16}
              color={theme.secondary}
              onPress={onIncreaseQuantity}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
    },
    item: {
      height: 120,
      margin: 6,
      padding: 16,
      borderRadius: 16,
      backgroundColor: theme.card,
    },
    itemPressed: {
      opacity: 0.75,
    },
    itemHeader: {
      flex: 1,
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemTitleIDContainer: {
      gap: 6,
      alignItems: 'center',
      flexDirection: 'row',
    },
    itemTitle: {
      color: theme.primaryText,
      fontSize: 20,
      fontVariant: ['tabular-nums'],
      fontWeight: '700',
      lineHeight: 20,
    },
    itemID: {
      color: theme.secondaryText,
      fontSize: 12,
      fontVariant: ['tabular-nums'],
      lineHeight: 12,
    },
    itemTitlePriceContainer: {
      gap: 4,
    },
    itemPrice: {
      color: theme.primaryText,
      fontVariant: ['tabular-nums'],
    },
    itemFooter: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemTotalContainer: {
      gap: 6,
      alignItems: 'center',
      flexDirection: 'row',
    },
    itemTotalLabel: {
      color: theme.primaryText,
      fontSize: 14,
      lineHeight: 14,
    },
    itemTotal: {
      color: theme.primary,
      fontSize: 18,
      lineHeight: 18,
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
    },
    itemQuantityContainer: {
      gap: 14,
      alignItems: 'center',
      flexDirection: 'row',
    },
    itemQuantity: {
      color: theme.primaryText,
      fontSize: 16,
      lineHeight: 16,
      fontWeight: '500',
      fontVariant: ['tabular-nums'],
    },
  }),
);
