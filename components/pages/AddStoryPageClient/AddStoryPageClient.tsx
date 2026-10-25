'use client';
import AddStoryForm from '@/components/common/AddStoryForm/AddStoryForm';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import css from './AddStoryPageClient.module.css';

export default function AddStoryPageClient() {
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>AddStoryPageClient</h1>
      <AddStoryForm />
    </div>
  );
}
