import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next'; // dil seçenği için kütüphane
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup'; // form için validasyonlar-mail hatası şifre vs
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

// t = dil destiği için! 
// Ekran form alanlarının tipl...
interface RegisterValues {
  email: string;
  password: string;
  acceptTerms: boolean;
}

const RegisterScreen = () => {
  const { t } = useTranslation(); // çeiirileri alma yerimiz
  const navigation = useNavigation(); // ekran geçişleriiii

  //yup= ekrandaki formların doğrulamaları
  const RegisterYup = Yup.object().shape({
    email: Yup.string().email(t('invalidEmail')).required(t('emailRequired')),
    password: Yup.string()
      .min(6, t('passwordTooShort'))
      .required(t('passwordRequired')),
    acceptTerms: Yup.boolean().oneOf([true], t('acceptTermsRequired')), // checkboxx
  });

  const handleRegister = async (
    values: RegisterValues,  // bunlar form verileri 
    { setSubmitting, setFieldError }: FormikHelpers<RegisterValues> //formikin fonksyionları. buton devre dışı kalsın ve hata.
  ) => {                                                              
    try {
      // istek atıp mail ve şifreyi gönderme
      const response = await axios.post('https://reqres.in/api/register', {
        email: values.email,
        password: values.password,
      });
      
      if (response.data.token) { // token mantığı aslında. token dönmesini bekliypruz gibi bişi
        alert(t('registerSuccessful')); // i18 ile kayıt başarılı mesajı kısmı
        navigation.navigate('SignIn' as never); // sonra sign ekranına gitmek için
      }
    } catch (error: any) {  
      if (error.response?.status === 400) {
        setFieldError('email', t('invalidEmailPassword')); 
      } else {
        setFieldError('general', t('registerFailed') + (error.response?.data?.error || t('unknownError')));
      }
    } finally {
      setSubmitting(false); // buton aktif ol!!!!!
    }
  };

  const registerButtonTapped = (submitForm: (e?: React.FormEvent<HTMLFormElement>) => void) => //html olmalı 
    (event: GestureResponderEvent) => { // event touchable gibi birşey.
      submitForm(); // register butonuna basınca formu gönderme işlemi bu !!
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('createRegister')}</Text>
      <Formik
        initialValues={{ email: '', password: '', acceptTerms: false }} // mail ve şifre default değerleri içinç
        validationSchema={RegisterYup}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
        }) => (
          <View style={styles.form}>
            <View style={styles.fieldContainer}>
              <Text style={styles.emailTitleLabel}>{t('email')}</Text>
              <TextInput
                style={styles.emailInput}
                placeholder={t('Email')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.passwordTitleLabel}>{t('password')}</Text>
              <TextInput
                style={styles.passwordInput}
                placeholder={t('password')}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry // şifre gizlemek için kullanılacak!
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.checkbox}> 
              <TouchableOpacity
                onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}
              >
                {values.acceptTerms ? (
                  <Icon name="check-square" size={20} color="#ff4081" />
                ) : (
                  <Icon name="square-o" size={20} color="#777" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>{t('acceptTerms')}</Text>
            </View>

            {touched.acceptTerms && errors.acceptTerms && (
              <Text style={styles.error}>{errors.acceptTerms}</Text>
            )}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={registerButtonTapped(handleSubmit)}
              disabled={isSubmitting}
            >
              <Text style={styles.RegisterButtonText}>{t('signUp')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn' as never)}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>
                {t('alreadyHaveAccount')} {t('signIn')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};
// #ff4081 = örnekdeki pembe renk
// #777 = örnekdeki gri renk
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
    paddingTop: 80,
  },
  form: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
  },
  emailTitleLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  passwordTitleLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#666',
  },
  registerButton: {
    backgroundColor: '#ff4081',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  RegisterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#ff4081',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default RegisterScreen;