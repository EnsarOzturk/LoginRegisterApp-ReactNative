import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next'; // Dil desteğimiz için
import { useNavigation } from '@react-navigation/native'; 
import { Formik, FormikHelpers } from 'formik'; // Form daki yönetimler için
import * as Yup from 'yup'; // şife uzunluğu vs kontolleri için 
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

// Ekran form alanlarının tipleri........
interface SignInValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInScreen = () => {
  const { t, i18n } = useTranslation(); // trasntale 
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // şifre gizleme ogösterme olayımız!!

  const SignInYup = Yup.object().shape({
    email: Yup.string().email(t('invalidEmail')).required(t('emailRequired')), // yup ile epostakontoü yapıldı
    password: Yup.string().min(6, t('passwordTooShort')).required(t('passwordRequired')),// şifre
    rememberMe: Yup.boolean(), // checkbox
  });

  const handleLogin = async (
    values: SignInValues, // bunlarformdan gelen değerler
    { setSubmitting, setFieldError }: FormikHelpers<SignInValues> // setSubmit formik fonks.= form gmnderildinin kontolü.
  ) => {                                                            //setFieldError= hata form hatası
    try {

      // girilen şifre ve emaili urlye göndermeceee!
      const response = await axios.post('https://reqres.in/api/login', {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) { // api bşarılı olursa token döner(responsun içinde)
        dispatch(login(response.data.token));
        // login fons ile Redux'a gönder = authSlice a 
        navigation.navigate('Success' as never); // giriş başarılı olunca succes git!!
      }
    } catch (error) {
      setFieldError('general', t('invalidEmailPassword'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signIn')}</Text>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={SignInYup}
        onSubmit={handleLogin}
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
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder={t('password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)} 
                >
                  <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#777" />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.rememberContainer}>
              <TouchableOpacity
                onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                style={styles.checkbox}
              >
                {values.rememberMe ? ( //onay kutusu renk ikoc vs.
                  <Icon name="check-square" size={20} color="#ff4081" />
                ) : (
                  <Icon name="square-o" size={20} color="#777" />
                )}
              </TouchableOpacity>
              <Text style={styles.rememberText}>{t('rememberMe')}</Text>
            </View>

            <TouchableOpacity
              style={styles.SignInButton}
              onPress={() => handleSubmit()} 
              disabled={isSubmitting}
            >
              <Text style={styles.SignInButtonText}>{t('signIn')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register' as never)}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>
                {t('dontHaveAccount')} {t('register')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

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
  emailTitleLabel: { 
    fontSize: 16,
    marginBottom: 5,
  },
  passwordTitleLabel: { 
    fontSize: 16,
    marginBottom: 5,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  eyeButton: {
    padding: 10,
  },
  form: {
    width: '100%', //tamamen geniş olma.
  },
  fieldContainer: { 
    marginBottom: 15,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingRight: 10,
  },
  SignInButton: {
    backgroundColor: '#ff4081',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  SignInButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rememberText: {
    fontSize: 14,
    color: '#333',
  },
  checkbox: {
    marginRight: 10,
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: { 
    color: '#ff4081',
    textAlign: 'center',
  },
});

export default SignInScreen;