import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'; //navigattion = sayfalar arası geçiş için !!

const WelcomeScreen = () => {
  const { t, i18n } = useTranslation(); // çeviriler. t = dilegöre çevƒiri yapıyor
  const navigation = useNavigation();
  const [language, setLanguage] = useState(i18n.language); // dil içn statimiz, başlangıç dili 

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tr' : 'en'; // açılışda ilk dil ingilizce seçilene göre değiştiren kısım
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage); // yeni dil i set et!!!
  };

  // ekranımdaki kompnentler.
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
          <Text style={styles.languageButtonText}>{language === 'en' ? 'TR' : 'EN'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcomeTitle}>{t('welcome')}</Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('SignIn' as never)} // Signın ekranına gitmece
      >
        <Text style={styles.nextButtonText}>{t('next')}</Text> 
      </TouchableOpacity>
      <View style={styles.myFooter}>
        <Text style={styles.myText}>Product by Ensar Öztürk</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 80,
  },
  header: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  languageButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  languageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  myFooter: {
    position: 'absolute',
    bottom: 25, 
    width: '100%',
    alignItems: 'center',
  },
  myText: {
    fontSize: 16,
    color: '#333',
  },
});

export default WelcomeScreen;