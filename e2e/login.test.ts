import { expect, device } from 'detox';

import { credentials } from './helper';

describe('Login', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  describe('when cpf and/or password are empty', () => {
    it('should not perform login', async () => {
      await element(by.id('login.submit')).tap();
      await expect(element(by.id('products'))).not.toBeVisible();
    });
  });

  describe('when typing CPF', () => {
    afterEach(async () => {
      await element(by.id('login.cpf.text_input')).clearText();
    });

    it('should show an error for an invalid CPF', async () => {
      const input = element(by.id('login.cpf.text_input'));
      const error = element(by.id('login.cpf.error'));

      await input.typeText('11122233344');
      await expect(error).toHaveText('CPF inválido');
    });

    it('should not show an error for a valid CPF', async () => {
      const input = element(by.id('login.cpf.text_input'));
      const error = element(by.id('login.cpf.error'));

      await input.typeText('11122233396');
      await expect(error).toHaveText('');
    });

    it('should mask the CPF input as ###.###.###-##', async () => {
      const input = element(by.id('login.cpf.text_input'));

      await input.typeText('11122233396');
      await expect(input).toHaveValue('111.222.333-96');
    });
  });

  describe('when typing password', () => {
    afterEach(async () => {
      await element(by.id('login.password.text_input')).clearText();
    });

    it('should show an error for password with length < 8', async () => {
      const input = element(by.id('login.password.text_input'));
      const error = element(by.id('login.password.error'));

      await input.typeText('abcdefg');
      await expect(error).toHaveText('Mínimo de 8 caracteres');
    });

    it('should not show any errors for passwords with length >= 8', async () => {
      const input = element(by.id('login.password.text_input'));
      const error = element(by.id('login.password.error'));

      await input.typeText('abcdefgh');
      await expect(error).toHaveText('');

      await input.clearText();
      await input.typeText('abcdefghi');
      await expect(error).toHaveText('');
    });
  });

  describe('when first login', () => {
    it("should not show user's last access date", async () => {
      await expect(element(by.id('login.last_accessed'))).not.toBeVisible();
    });

    it('should perform login given any set of valid inputs', async () => {
      const cpf = element(by.id('login.cpf.text_input'));
      const cpfError = element(by.id('login.cpf.error'));
      const password = element(by.id('login.password.text_input'));
      const passwordError = element(by.id('login.password.error'));
      const submit = element(by.id('login.submit'));

      await cpf.typeText(credentials.cpf);
      await expect(cpfError).toHaveText('');

      await password.typeText(credentials.password);
      await expect(passwordError).toHaveText('');

      await submit.tap();

      await expect(element(by.id('products'))).toBeVisible();
    });
  });

  describe('after first login', () => {
    beforeAll(async () => {
      await device.launchApp({ newInstance: true });
    });

    it("should show user's last access date", async () => {
      await expect(element(by.id('login.last_accessed'))).toBeVisible();
    });

    it("should show an error when inputs don't match the ones from first login", async () => {
      const cpf = element(by.id('login.cpf.text_input'));
      const cpfError = element(by.id('login.cpf.error'));
      const password = element(by.id('login.password.text_input'));
      const passwordError = element(by.id('login.password.error'));
      const submit = element(by.id('login.submit'));

      await cpf.clearText();
      await cpf.typeText('52998224725');

      await password.clearText();
      await password.typeText('hgfedcba');

      await submit.tap();

      await expect(cpfError).toHaveText('CPF incorreto');
      await expect(passwordError).toHaveText('Senha incorreta');
      await expect(element(by.id('products'))).not.toBeVisible();
    });

    it('should perform login when inputs match the ones from first login', async () => {
      const cpf = element(by.id('login.cpf.text_input'));
      const password = element(by.id('login.password.text_input'));
      const submit = element(by.id('login.submit'));

      await cpf.clearText();
      await cpf.typeText(credentials.cpf);

      await password.clearText();
      await password.typeText(credentials.password);

      await submit.tap();

      await expect(element(by.id('products'))).toBeVisible();
    });
  });

  // Detox has a fairly old bug regarding `device.matchFinger()` and `device.matchFace`
  // in which tests hang forever on iOS while biometric prompt is present.
  //
  // See: https://github.com/wix/Detox/issues/2981
  describe.skip('when biometric authentication is available', () => {
    beforeAll(async () => {
      // Enable device's biometric authentication
      await device.setBiometricEnrollment(true);
      await device.launchApp({ newInstance: true });

      // Perform login
      await element(by.id('login.cpf.text_input')).typeText('11122233396');
      await element(by.id('login.password.text_input')).typeText('abcdefgh');
      await element(by.id('login.submit')).tap();

      // Navigate to settings page
      await element(by.id('products.three-bars')).tap();

      // Enable login with biometric prompt
      await element(by.id('settings.bio-auth.switch')).tap();
    });

    it('should perform login with biometric prompt', async () => {
      await device.launchApp({ newInstance: true });
      await device.matchFinger();
      await expect(element(by.id('products'))).toBeVisible();
    });

    it('should enable default login with cpf/password if biometric prompt fails', async () => {
      await device.launchApp({ newInstance: true });
      await device.unmatchFinger();
      await element(by.id('login.cpf.text_input')).tap();
      await expect(element(by.id('login.cpf.text_input'))).toBeFocused();
    });
  });
});
