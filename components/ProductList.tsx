import { useCurrencyFormat, useNumberFormat } from '@hooks/product';
import { createStyles, useStyles, useTheme } from '@theming';
import { Product } from '@types';
import { shallowEqual } from '@util';
import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';

import Icon from './Icon';
import { ProductListHeader } from './ProductListHeader';

type ProductField = keyof Product | undefined;

export interface ProductListProps {
  products: Product[];
  selectedField: ProductField;
  setSelectedField: (update: (field: ProductField) => ProductField) => void;
  onDeleteItem: (id: Product['id']) => void;
  onIncreaseQuantity: (id: Product['id']) => void;
  onDecreaseQuantity: (id: Product['id']) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedField,
  setSelectedField,
  onDeleteItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const styles = useStyles(themedStyles);

  const keyExtractor = (item: Product, index: number) =>
    `${item.name}_${item.id}_${index}`;

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductListItem
      product={item}
      onDelete={() => onDeleteItem(item.id)}
      onIncreaseQuantity={() => onIncreaseQuantity(item.id)}
      onDecreaseQuantity={() => onDecreaseQuantity(item.id)}
    />
  );

  const renderHeaderComponent = () => (
    <ProductListHeader
      selectedField={selectedField}
      setSelectedField={setSelectedField}
    />
  );

  return (
    <FlatList
      style={styles.list}
      data={products}
      extraData={selectedField}
      stickyHeaderIndices={[0]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeaderComponent}
    />
  );
};

export interface ProductListItemProps {
  product: Product;
  onDelete: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

function areProducListItemPropsEqual(
  prev: ProductListItemProps,
  next: ProductListItemProps,
) {
  return shallowEqual(prev.product, next.product);
}

export const ProductListItem: React.FC<ProductListItemProps> = React.memo(
  ({ product, onDelete, onIncreaseQuantity, onDecreaseQuantity }) => {
    const theme = useTheme();
    const styles = useStyles(themedStyles);

    const price = useCurrencyFormat(product.price / 100);
    const totalPrice = useCurrencyFormat(product.totalPrice / 100);
    const quantity = useNumberFormat(product.quantity);

    return (
      <View style={styles.item}>
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
    );
  },
  areProducListItemPropsEqual,
);

ProductListItem.displayName = 'ProductListItem';

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    list: {
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
