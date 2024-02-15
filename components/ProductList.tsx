import { useCurrencyFormat, useNumberFormat } from '@hooks';
import { createStyles, useStyles, useTheme } from '@theming';
import { Product } from '@types';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DragList, { DragListRenderItemInfo } from './DragList';
import Icon from './Icon';
import { ProductListHeader } from './ProductListHeader';

type SortOrder = 'asc' | 'desc';
type SortField = keyof Product | undefined;

export interface ProductListProps {
  testID: string;
  products: Product[];
  sortOrder: SortOrder;
  sortField: SortField;
  setSortOrder: (update: (order: SortOrder) => SortOrder) => void;
  setSortField: (update: (field: SortField) => SortField) => void;
  onRemove: (id: Product['id']) => void;
  onReorder: (fromIndex: number, toIndex: number) => Promise<void>;
  onIncreaseQuantity: (id: Product['id']) => void;
  onDecreaseQuantity: (id: Product['id']) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  testID,
  products,
  sortOrder,
  sortField,
  setSortOrder,
  setSortField,
  onRemove,
  onReorder,
  onIncreaseQuantity,
  onDecreaseQuantity,
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
        testID={`${testID}.item-${item.name}-${item.id}`}
        product={item}
        isActive={isActive}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onRemove={() => onRemove(item.id)}
        onIncreaseQuantity={() => onIncreaseQuantity(item.id)}
        onDecreaseQuantity={() => onDecreaseQuantity(item.id)}
      />
    ),
    [onRemove, onIncreaseQuantity, onDecreaseQuantity],
  );

  return (
    <View testID={testID} style={styles.container}>
      <ProductListHeader
        testID={`${testID}.list-header`}
        sortOrder={sortOrder}
        sortField={sortField}
        setSortOrder={setSortOrder}
        setSortField={setSortField}
      />
      <DragList
        testID={`${testID}.drag-list`}
        containerStyle={styles.container}
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onReordered={onReorder}
      />
    </View>
  );
};

function keyExtractor(item: Product) {
  return `${item.name}-${item.id}`;
}

export interface ProductListItemProps {
  testID: string;
  product: Product;
  isActive: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  testID,
  product,
  isActive,
  onDragStart,
  onDragEnd,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const theme = useTheme();
  const styles = useStyles(themedStyles);

  const price = useCurrencyFormat(product.price);
  const totalPrice = useCurrencyFormat(product.totalPrice);
  const quantity = useNumberFormat(product.quantity);

  return (
    <Pressable testID={testID} onLongPress={onDragStart} onPressOut={onDragEnd}>
      <View
        testID={`${testID}.container`}
        style={[styles.item, isActive ? styles.itemPressed : {}]}>
        <View testID={`${testID}.header`} style={styles.itemHeader}>
          <View
            testID={`${testID}.name-id-price`}
            style={styles.itemTitlePriceContainer}>
            <View
              testID={`${testID}.name-id`}
              style={styles.itemTitleIDContainer}>
              <Text testID={`${testID}.name`} style={styles.itemTitle}>
                {product.name}
              </Text>
              <Text testID={`${testID}.id`} style={styles.itemID}>
                (ID: {product.id})
              </Text>
            </View>
            <Text testID={`${testID}.price`} style={styles.itemPrice}>
              {price}
            </Text>
          </View>
          <Icon
            testID={`${testID}.trash`}
            name="trash"
            size={20}
            color={theme.danger}
            onPress={onRemove}
          />
        </View>
        <View testID={`${testID}.footer`} style={styles.itemFooter}>
          <View testID={`${testID}.total`} style={styles.itemTotalContainer}>
            <Text
              testID={`${testID}.total.label`}
              style={styles.itemTotalLabel}>
              Total:
            </Text>
            <Text testID={`${testID}.total.value`} style={styles.itemTotal}>
              {totalPrice}
            </Text>
          </View>
          <View
            testID={`${testID}.quantity`}
            style={styles.itemQuantityContainer}>
            <Icon
              testID={`${testID}.quantity.dash`}
              name="dash"
              size={16}
              color={theme.secondary}
              onPress={onDecreaseQuantity}
            />
            <Text
              testID={`${testID}.quantity.value`}
              style={styles.itemQuantity}>
              {quantity}
            </Text>
            <Icon
              testID={`${testID}.quantity.plus`}
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
