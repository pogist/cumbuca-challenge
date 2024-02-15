import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNullable } from '@util';

const SETTINGS = '@settings';

export type SettingsObject = {
  darkTheme: boolean;
  bioAuth: boolean;
  hasBioAuthSupport: boolean;
};

async function set(settings: SettingsObject) {
  await AsyncStorage.setItem(SETTINGS, JSON.stringify(settings));
}

async function get(): Promise<SettingsObject | null> {
  const value = await AsyncStorage.getItem(SETTINGS);
  if (isNullable(value)) {
    return null;
  }
  return JSON.parse(value);
}

async function setDarkTheme(enabled: boolean): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    await set({ darkTheme: enabled, bioAuth: false, hasBioAuthSupport: false });
  } else {
    if (currentSettings.darkTheme !== enabled) {
      await set({ ...currentSettings, darkTheme: enabled });
    }
  }
  return enabled;
}

async function setBioAuth(enabled: boolean): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    await set({ darkTheme: false, bioAuth: enabled, hasBioAuthSupport: false });
  } else {
    if (currentSettings.bioAuth !== enabled) {
      await set({ ...currentSettings, bioAuth: enabled });
    }
  }
  return enabled;
}

async function setHasBioAuthSupport(support: boolean): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    await set({
      darkTheme: false,
      bioAuth: false,
      hasBioAuthSupport: support,
    });
  } else {
    if (currentSettings.hasBioAuthSupport !== support) {
      await set({ ...currentSettings, hasBioAuthSupport: support });
    }
  }
  return support;
}

async function getDarkTheme(): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    return false;
  }
  return currentSettings.darkTheme;
}

async function getBioAuth(): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    return false;
  }
  return currentSettings.bioAuth;
}

async function hasBioAuthSupport(): Promise<boolean> {
  const currentSettings = await get();
  if (isNullable(currentSettings)) {
    return false;
  }
  return currentSettings.hasBioAuthSupport;
}

export default {
  getDarkTheme,
  getBioAuth,
  hasBioAuthSupport,
  setDarkTheme,
  setBioAuth,
  setHasBioAuthSupport,
};
