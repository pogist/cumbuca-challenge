import { expect, device } from 'detox';

import { credentials } from './helper';

async function login() {
  await element(by.id('login.cpf.text_input')).typeText(credentials.cpf);
  await element(by.id('login.password.text_input')).typeText(
    credentials.password,
  );
  await element(by.id('login.submit')).tap();
}

describe('Settings', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await login();
  });

  it('should persist settings values', async () => {
    await element(by.id('products.three-bars')).tap();

    await expect(
      element(by.id('settings.dark-theme.switch')),
    ).toHaveToggleValue(false);

    await element(by.id('settings.dark-theme.switch')).tap();

    await expect(
      element(by.id('settings.dark-theme.switch')),
    ).toHaveToggleValue(true);

    await device.terminateApp();
    await device.launchApp();
    await login();

    await element(by.id('products.three-bars')).tap();
    await expect(
      element(by.id('settings.dark-theme.switch')),
    ).toHaveToggleValue(true);
  });
});
