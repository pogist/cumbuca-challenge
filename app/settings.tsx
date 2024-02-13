import Switch from '@components/Switch';
import { Ionicons } from '@expo/vector-icons';
import { createStyles, useStyles, useTheme } from '@theming';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  const theme = useTheme();
  const styles = useStyles(themedStyles);

  const [bioAuth, setBioAuth] = React.useState(false);
  const [darkTheme, setDarkTheme] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>Biometria</Text>
          <Text style={styles.optionDesc}>
            Habilite/desabilite o login por biometria
          </Text>
        </View>
        <Switch
          value={bioAuth}
          onValueChange={() => setBioAuth((prev) => !prev)}
          trueColor={theme.primary}
          falseColor={theme.border}
        />
      </View>
      <View style={styles.option}>
        <View style={styles.optionInfo}>
          <View style={styles.optionTitleContainer}>
            <Text style={styles.optionTitle}>Tema escuro</Text>
            <Ionicons style={styles.optionTitle} name="moon" />
          </View>
          <Text style={styles.optionDesc}>
            Habilite/desabilite o tema escuro
          </Text>
        </View>
        <Switch
          value={darkTheme}
          onValueChange={() => setDarkTheme((prev) => !prev)}
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
