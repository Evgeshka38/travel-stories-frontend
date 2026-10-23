'use client';
import css from './LoginForm.module.css';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginValues {
  email: string;
  password: string;
}
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Занадто довгий email')
    .required('Обов’язкове поле'),
  password: Yup.string()
    .min(8, 'Пароль має бути від 8 символів')
    .max(64, 'Занадто довгий пароль')
    .required('Обов’язкове поле'),
});
const initialValues: LoginValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>,
  ) => {};
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Вхід</h1>
        <p className={css.subtitle}>Вітаємо знову у спільноту мандрівників!</p>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            {/* Поле: Пошта */}
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

            {/* Поле: Пароль */}
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

            {/* Кнопка відправки */}
            <button type="submit" className={css.submitBtn}>
              Увійти
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
