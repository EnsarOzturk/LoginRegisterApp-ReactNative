import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      next: 'Next',
      signIn: 'Sign In',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      dontHaveAccount: "Don't have an account",
      alreadyHaveAccount: 'Already have an account',
      createRegister: 'Create Register',
      signUp: 'Sign up',
      acceptTerms: 'I accept the terms and privacy policy',
      loginSuccess: 'Login Successfully',
      registerSuccessful: 'Successful, log in.',
      invalidEmail: 'Invalid email',
      emailRequired: 'Email required',
      passwordRequired: 'Password required',
      passwordTooShort: 'Too Short',
      rememberMe: 'Remember me',
      acceptTermsRequired: 'You must accept the terms and privacy policy',
      invalidEmailPassword: 'Invalid email or password',
      registerFailed: 'Register failed. ',
      error: 'Error occurred.',
    },
  },
  tr: {
    translation: {
      welcome: 'Hoşgeldiniz',
      next: 'İleri',
      signIn: 'Giriş Yap',
      register: 'Kayıt Ol',
      email: 'Email',
      password: 'Şifre',
      dontHaveAccount: 'Hesabınız yok mu',
      alreadyHaveAccount: 'Zaten hesabınız var mı',
      createRegister: 'Kayıt Oluştur',
      signUp: 'Kayıt Ol',
      acceptTerms: 'Şartları ve gizlilik politikasını kabul ediyorum',
      loginSuccess: 'Giriş Başarıyla Yapıldı',
      registerSuccessful: 'Başarılı, Giriş yapın.',
      invalidEmail: 'Geçersiz email',
      emailRequired: 'Email gerekli',
      passwordRequired: 'Şifre gerekli',
      passwordTooShort: 'Şifre Çok kısa',
      rememberMe: 'Beni hatırla',
      acceptTermsRequired: 'Şartları ve gizlilik politikasını kabul etmelisiniz',
      invalidEmailPassword: 'Geçersiz email veya şifre',
      registerFailed: 'Kayıt başarısız. ',
      error: 'Hata oluştu.',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // bu başlangıç dili.
    fallbackLng: 'en', // hata anında dil ingizlice kalsın diye?
    interpolation: {
      escapeValue: false, // html kodlarının hataları için çalışsın diye.....
    },
  });

export default i18n;