'use client';
import css from './LoginForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '@/lib/api/clientApi';
import SessionDraft from '@/components/common/SessionDraft/SessionDraft';

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
const defaultValues: LoginValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [initialValues, setInitialValues] = useState(defaultValues);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedDraft = sessionStorage.getItem('login-draft');

    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);

        setInitialValues({
          ...defaultValues,
          email: draft.email ?? '',
          password: '',
        });
      } catch {
        sessionStorage.removeItem('login-draft');
      }
    }

    setIsReady(true);
  }, []);

  if (!isReady) return null;

  const handleSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>,
  ) => {
    setIsLoading(true);
    try {
      await login(values);
      sessionStorage.removeItem('login-draft');
      toast.success('Ви успішно увійшли!');
      router.push('/');
      router.refresh();
    } catch {
      toast.error('Не вдалося увійти. Перевірте email і пароль.');
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };
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
            <SessionDraft storageKey="login-draft" fields={['email']} />
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
              {isLoading ? 'Вхід...' : 'Увійти'}
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
