'use client';

import css from './LoginForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '@/lib/api/clientApi';
import SessionDraft from '@/components/common/SessionDraft/SessionDraft';
import { useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/clientApi';

interface LoginValues {
  email: string;
  password: string;
}

interface LoginDraft {
  email?: unknown;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Занадто довгий email')
    .required('Обов’язкове поле'),
  password: Yup.string()
    .min(8, 'Пароль має бути від 8 символів')
    .max(128, 'Занадто довгий пароль')
    .required('Обов’язкове поле'),
});

const defaultValues: LoginValues = {
  email: '',
  password: '',
};

const draftFields = ['email'];

function getInitialValues(): LoginValues {
  const savedDraft = sessionStorage.getItem('login-draft');

  if (!savedDraft) {
    return { ...defaultValues };
  }

  try {
    const draft: unknown = JSON.parse(savedDraft);

    if (typeof draft === 'object' && draft !== null) {
      const email = (draft as LoginDraft).email;

      return {
        ...defaultValues,
        email: typeof email === 'string' ? email : '',
      };
    }
  } catch {
    sessionStorage.removeItem('login-draft');
  }

  return { ...defaultValues };
}

export default function LoginFormContent() {
  const router = useRouter();
  const [initialValues] = useState<LoginValues>(getInitialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>,
  ) => {
    setIsLoading(true);

    try {
      await login(values);

      await queryClient.query({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false,
      });
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
          <Form className={css.form} noValidate>
            <SessionDraft storageKey="login-draft" fields={draftFields} />

            <label className={css.label}>
              <span className={css.labelTitle}>Пошта*</span>
              <Field
                className={css.input}
                type="text"
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
              <div className={css.passwordWrapper}>
                <Field
                  className={css.input}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="********"
                />

                <button
                  type="button"
                  className={css.passwordToggle}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? 'Приховати пароль' : 'Показати пароль'
                  }
                >
                  <svg className={css.icon}>
                    <use
                      href={`/sprite.svg#${
                        showPassword ? 'icon-eyeCross' : 'icon-eye'
                      }`}
                    />
                  </svg>
                </button>
              </div>
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
