'use client';
import css from './RegistrationForm.module.css';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const handleSubmit = (
    values: RegisterValues,
    actions: FormikHelpers<RegisterValues>,
  ) => {};
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
        >
          <Form className={css.form}>
            {/* Поле: Ім’я та Прізвище */}
            <label className={css.label}>
              <span className={css.labelTitle}>Ім’я та Прізвище*</span>
              <Field
                className={css.input}
                type="text"
                name="name"
                placeholder="Ваше ім’я та прізвище"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </label>

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
              Зареєструватись
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
