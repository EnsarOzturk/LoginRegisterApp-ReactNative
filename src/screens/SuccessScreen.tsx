import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next'; // bu gene çeviri için 

const SuccessScreen = () => {
  const { t } = useTranslation();

  return (
    // ekran title e ve çeviri
    <View style={styles.container}>
      <Text style={styles.title}>{t('loginSuccess')}</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // ekranı komple kapladı.
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
});

export default SuccessScreen;
