import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNullable } from '@util';

const DARK_THEME_ENABLED = '@dark_theme_enabled';
const BIO_AUTH_ENABLED = '@bio_auth_enabled';
const BIO_AUTH_SUPPORTED = '@bio_auth_supported';

async function setDarkThemeEnabled(enabled: boolean): Promise<boolean> {
  try {
    await AsyncStorage.setItem(DARK_THEME_ENABLED, JSON.stringify(enabled));
    return enabled;
  } catch (error) {
    throw error;
  }
}

async function getDarkThemeEnabled(): Promise<boolean> {
  const current = await AsyncStorage.getItem(DARK_THEME_ENABLED);
  if (isNullable(current)) {
    return await setDarkThemeEnabled(false);
  }
  return JSON.parse(current) as boolean;
}

async function setBioAuthEnabled(enabled: boolean): Promise<boolean> {
  try {
    await AsyncStorage.setItem(BIO_AUTH_ENABLED, JSON.stringify(enabled));
    return enabled;
  } catch (error) {
    throw error;
  }
}

async function getBioAuthEnabled(): Promise<boolean> {
  const current = await AsyncStorage.getItem(BIO_AUTH_ENABLED);
  if (isNullable(current)) {
    return await setBioAuthEnabled(false);
  }
  return JSON.parse(current) as boolean;
}

async function setBioAuthSupported(supported: boolean): Promise<boolean> {
  try {
    await AsyncStorage.setItem(BIO_AUTH_SUPPORTED, JSON.stringify(supported));
    return supported;
  } catch (error) {
    throw error;
  }
}

async function getBioAuthSupported(): Promise<boolean> {
  const current = await AsyncStorage.getItem(BIO_AUTH_SUPPORTED);
  if (isNullable(current)) {
    return await setBioAuthSupported(false);
  }
  return JSON.parse(current) as boolean;
}

export default {
  getBioAuthEnabled,
  getBioAuthSupported,
  getDarkThemeEnabled,
  setBioAuthEnabled,
  setBioAuthSupported,
  setDarkThemeEnabled,
};
