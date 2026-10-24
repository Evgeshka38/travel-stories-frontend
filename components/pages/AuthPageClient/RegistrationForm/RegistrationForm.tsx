'use client';
import css from './RegistrationForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { register } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import axios from 'axios';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Занадто коротке імʼя')
    .max(32, 'Занадто довге імʼя')
    .required('Обов’язкове поле'),
  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Занадто довгий email')
    .required('Обов’язкове поле'),
  password: Yup.string()
    .min(8, 'Пароль має бути від 8 символів')
    .max(64, 'Занадто довгий пароль')
    .required('Обов’язкове поле'),
});
const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
};
export default function RegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (
    values: RegisterValues,
    actions: FormikHelpers<RegisterValues>,
  ) => {
    setIsLoading(true);

    try {
      await register(values);
      toast.success('Реєстрація успішна!');
      actions.resetForm();
      router.push('/');
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(
          typeof message === 'string'
            ? message
            : 'Не вдалося зареєструватися. Спробуйте ще раз.',
        );
      } else {
        toast.error('Сталася непередбачена помилка.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Реєстрація</h1>
        <p className={css.subtitle}>
          Раді вас бачити у спільноті мандрівників!
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
          validateOnMount={false}
        >
          <Form className={css.form}>
            <label className={css.label}>
              <span className={css.labelTitle}>Ім&#39;я та Прізвище*</span>
              <Field
                className={css.input}
                type="text"
                name="name"
                placeholder="Ваше ім&#39;я та прізвище"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <span className={css.labelTitle}>Пошта*</span>
              <Field
                className={css.input}
                type="email"
                name="email"
                placeholder="hello@podorozhnyky.ua"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <span className={css.labelTitle}>Пароль*</span>
              <Field
                className={css.input}
                type="password"
                name="password"
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </label>

            <button
              type="submit"
              className={css.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Реєстрація...' : 'Зареєструватись'}
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
