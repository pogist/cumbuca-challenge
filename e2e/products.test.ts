import { expect, device } from 'detox';

import { credentials } from './helper';

async function login() {
  await element(by.id('login.cpf.text_input')).typeText(credentials.cpf);
  await element(by.id('login.password.text_input')).typeText(
    credentials.password,
  );
  await element(by.id('login.submit')).tap();
}

describe('Products', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await login();
  });

  describe('when three-bars icon is pressed', () => {
    afterAll(async () => {
      await device.launchApp({ newInstance: true });
      await login();
    });

    it('should be navigate to the settings page', async () => {
      await element(by.id('products.three-bars')).tap();
      await expect(element(by.id('settings'))).toBeVisible();
    });
  });

  describe('when typing price', () => {
    afterEach(async () => {
      await element(by.id('products.price.text_input')).clearText();
    });

    it('should show an error if typed text is not a valid number', async () => {
      const invalidNumber = '25.50.';
      await element(by.id('products.price.text_input')).typeText(invalidNumber);
      await expect(element(by.id('products.price.error'))).toHaveText(
        'Campo deve ser um número válido',
      );
    });
  });

  describe('when typing quantity', () => {
    afterEach(async () => {
      await element(by.id('products.quantity.text_input')).clearText();
    });

    it('should show an error if typed text is not a valid number', async () => {
      const invalidNumber = '25.50.';
      await element(by.id('products.quantity.text_input')).typeText(
        invalidNumber,
      );
      await expect(element(by.id('products.quantity.error'))).toHaveText(
        'Campo deve ser um número válido',
      );
    });

    it('should show an error if typed number is not an integer', async () => {
      const notInteger = '25.5';
      await element(by.id('products.quantity.text_input')).typeText(notInteger);
      await expect(element(by.id('products.quantity.error'))).toHaveText(
        'Campo deve ser um número inteiro',
      );
    });

    it('should show an error if typed number is zero', async () => {
      const zero = '0';
      await element(by.id('products.quantity.text_input')).typeText(zero);
      await expect(element(by.id('products.quantity.error'))).toHaveText(
        'Campo não pode ser 0',
      );
    });
  });

  describe('when adding a product', () => {
    afterEach(async () => {
      await element(by.id('products.name.text_input')).clearText();
    });

    afterAll(async () => {
      await element(by.id('products.list.item-TestProduct1-1.trash')).tap();
      await element(by.id('products.list.item-TestProduct4-2.trash')).tap();
      await element(by.id('products.list.item-TestProduct3-3.trash')).tap();
    });

    it('should automatically infer the total price', async () => {
      await element(by.id('products.name.text_input')).typeText('TestProduct1');
      await element(by.id('products.price.text_input')).typeText('50');
      await element(by.id('products.quantity.text_input')).typeText('2');
      await element(by.id('products.submit')).tap();

      await expect(
        element(by.id('products.list.item-TestProduct1-1.price')),
      ).toHaveText('R$ 50,00');
      await expect(
        element(by.id('products.list.item-TestProduct1-1.total.value')),
      ).toHaveText('R$ 100,00');
    });

    it('should increment the id values', async () => {
      await element(by.id('products.name.text_input')).typeText('TestProduct2');
      await element(by.id('products.submit')).tap();

      await element(by.id('products.name.text_input')).clearText();

      await element(by.id('products.name.text_input')).typeText('TestProduct3');
      await element(by.id('products.submit')).tap();

      await expect(
        element(by.id('products.list.item-TestProduct2-2.id')),
      ).toHaveText('(ID: 2)');
      await expect(
        element(by.id('products.list.item-TestProduct3-3.id')),
      ).toHaveText('(ID: 3)');
    });

    it('should reuse the smallest id available', async () => {
      await element(by.id('products.list.item-TestProduct2-2.trash')).tap();

      await element(by.id('products.name.text_input')).typeText('TestProduct4');
      await element(by.id('products.submit')).tap();

      await expect(
        element(by.id('products.list.item-TestProduct4-2.id')),
      ).toHaveText('(ID: 2)');
    });
  });

  describe("when increasing some product's quantity", () => {
    beforeAll(async () => {
      await element(by.id('products.name.text_input')).clearText();
      await element(by.id('products.price.text_input')).clearText();
      await element(by.id('products.quantity.text_input')).clearText();
    });

    it('should automatically update total price', async () => {
      await element(by.id('products.name.text_input')).typeText('TestQuantity');
      await element(by.id('products.price.text_input')).typeText('15');
      await element(by.id('products.quantity.text_input')).typeText('2');
      await element(by.id('products.submit')).tap();

      const plus = element(
        by.id('products.list.item-TestQuantity-1.quantity.plus'),
      );
      const quantity = element(
        by.id('products.list.item-TestQuantity-1.quantity.value'),
      );
      const total = element(
        by.id('products.list.item-TestQuantity-1.total.value'),
      );

      await plus.tap();
      await plus.tap();

      await expect(total).toHaveText('R$ 60,00');
      await expect(quantity).toHaveText('04');
    });
  });

  describe("when decreasing some product's quantity", () => {
    afterAll(async () => {
      await element(by.id('products.name.text_input')).clearText();
      await element(by.id('products.price.text_input')).clearText();
      await element(by.id('products.quantity.text_input')).clearText();
    });

    it('should automatically update total price', async () => {
      const dash = element(
        by.id('products.list.item-TestQuantity-1.quantity.dash'),
      );
      const quantity = element(
        by.id('products.list.item-TestQuantity-1.quantity.value'),
      );
      const total = element(
        by.id('products.list.item-TestQuantity-1.total.value'),
      );

      await dash.tap();
      await dash.tap();
      await dash.tap();

      await expect(total).toHaveText('R$ 15,00');
      await expect(quantity).toHaveText('01');
    });

    it('should remove the product if quantity reaches 0', async () => {
      const item = element(by.id('products.list.item-TestQuantity-1'));
      const dash = element(
        by.id('products.list.item-TestQuantity-1.quantity.dash'),
      );
      await dash.tap();
      await expect(item).not.toExist();
    });
  });

  it('should persist changes made to the product list', async () => {
    await element(by.id('products.name.text_input')).typeText('TestProduct1');
    await element(by.id('products.price.text_input')).typeText('50');
    await element(by.id('products.quantity.text_input')).typeText('2');
    await element(by.id('products.submit')).tap();

    await element(by.id('products.name.text_input')).clearText();
    await element(by.id('products.name.text_input')).typeText('TestProduct2');
    await element(by.id('products.submit')).tap();

    await element(by.id('products.name.text_input')).clearText();
    await element(by.id('products.name.text_input')).typeText('TestProduct3');
    await element(by.id('products.submit')).tap();

    await device.terminateApp();
    await device.launchApp();
    await login();

    await expect(element(by.id('products.list.item-TestProduct1-1'))).toExist();
    await expect(element(by.id('products.list.item-TestProduct2-2'))).toExist();
    await expect(element(by.id('products.list.item-TestProduct3-3'))).toExist();
  });
});
