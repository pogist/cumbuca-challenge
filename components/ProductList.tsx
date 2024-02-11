import { createStyles, useStyles, useTheme } from '@theming';
import { Product } from '@types';
import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';

// import Button from './Button';
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

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <FlatList
      style={styles.list}
      data={products}
      extraData={selectedField}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeaderComponent}
      ItemSeparatorComponent={renderItemSeparator}
    />
  );
};

export interface ProductListItemProps {
  product: Product;
  onDelete: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const theme = useTheme();
  const styles = useStyles(themedStyles);
  return (
    <View>
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{product.id}</Text>
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{product.name}</Text>
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{product.price}</Text>
        </View>
        <View style={styles.itemQuantityComponent}>
          <Icon
            name="dash"
            color={theme.secondary}
            size={16}
            onPress={onDecreaseQuantity}
          />
        </View>
        <View style={styles.itemQuantityComponent}>
          <Text style={styles.itemText}>{product.quantity}</Text>
        </View>
        <View style={styles.itemQuantityComponent}>
          <Icon
            name="plus"
            color={theme.secondary}
            size={16}
            onPress={onIncreaseQuantity}
          />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{product.totalPrice}</Text>
        </View>
      </View>
      <View style={styles.deleteButtonContainer}>
        <Icon name="trash" size={24} color={theme.danger} />
      </View>
    </View>
  );
};

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    list: {
      flex: 1,
      alignSelf: 'stretch',
    },
    itemSeparator: {
      borderBottomColor: theme.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    item: {
      marginTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemText: {
      color: theme.primaryText,
      fontVariant: ['tabular-nums'],
    },
    itemTextContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemQuantityComponent: {
      flex: 0.33,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityContainer: {
      flex: 1,
      gap: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    deleteButtonContainer: {
      margin: 12,
      alignItems: 'center',
    },
    // deleteButtonLabel: {
    //   color: theme.colors.failure,
    // },
  }),
);
