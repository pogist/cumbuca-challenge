import Icon from '@components/Icon';
import Switch from '@components/Switch';
import settings from '@storage/settings';
import { createStyles, useStyles, useTheme } from '@theming';
import React, { useEffect } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  const theme = useTheme();
  const styles = useStyles(themedStyles);

  const [darkThemeEnabled, setDarkThemeEnabled] = React.useState(false);
  const [bioAuthEnabled, setBioAuthEnabled] = React.useState(false);
  const [bioAuthSupported, setBioAuthSupported] = React.useState(false);

  useEffect(() => {
    settings.getDarkThemeEnabled().then(setDarkThemeEnabled);
    settings.getBioAuthEnabled().then(setBioAuthEnabled);
    settings.getBioAuthSupported().then(setBioAuthSupported);
  }, []);

  useEffect(() => {
    settings.setBioAuthEnabled(bioAuthEnabled).then();
  }, [bioAuthEnabled]);

  useEffect(() => {
    settings.setDarkThemeEnabled(darkThemeEnabled).then((enabled) => {
      if (enabled) {
        Appearance.setColorScheme('dark');
      } else {
        Appearance.setColorScheme('light');
      }
    });
  }, [darkThemeEnabled]);

  return (
    <View testID="settings" style={styles.container}>
      {bioAuthSupported && (
        <View testID="settings.bio-auth" style={styles.option}>
          <View testID="settings.bio-auth.info" style={styles.optionInfo}>
            <Text testID="settings.bio-auth.title" style={styles.optionTitle}>
              Biometria
            </Text>
            <Text testID="settings.bio-auth.desc" style={styles.optionDesc}>
              Habilite/desabilite login por biometria
            </Text>
          </View>
          <Switch
            testID="settings.bio-auth.switch"
            value={bioAuthEnabled}
            onValueChange={() => setBioAuthEnabled((prev) => !prev)}
            trueColor={theme.primary}
            falseColor={theme.border}
          />
        </View>
      )}
      <View testID="settings.dark-theme" style={styles.option}>
        <View testID="settings.dark-theme.info" style={styles.optionInfo}>
          <View
            testID="settings.dark-theme.title"
            style={styles.optionTitleContainer}>
            <Text
              testID="settings.dark-theme.title.value"
              style={styles.optionTitle}>
              Tema escuro
            </Text>
            <Icon
              testID="settings.dark-theme.title.moon"
              style={styles.optionTitle}
              name="moon"
              disabled
              noFeedback
            />
          </View>
          <Text testID="settings.dark-theme.desc" style={styles.optionDesc}>
            Habilite/desabilite o tema escuro
          </Text>
        </View>
        <Switch
          testID="settings.dark-theme.switch"
          value={darkThemeEnabled}
          onValueChange={() => setDarkThemeEnabled((prev) => !prev)}
          trueColor={theme.primary}
          falseColor={theme.border}
        />
      </View>
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      gap: 18,
      flex: 1,
      padding: 10,
      paddingTop: 20,
      backgroundColor: theme.background,
    },
    option: {
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.card,
      borderRadius: 10,
    },
    optionInfo: {
      gap: 4,
    },
    optionTitle: {
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: '600',
    },
    optionDesc: {
      color: theme.secondaryText,
    },
    optionTitleContainer: {
      gap: 8,
      alignItems: 'center',
      flexDirection: 'row',
    },
  }),
);
