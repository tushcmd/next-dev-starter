//using yup
'use client';

import { ReactNode } from 'react';
import * as yup from 'yup';

const MAX_FILE_SIZE = 4
const getFileSizeInMB = (value: File) => value.size / 1024 ** 2

const messages = Object.freeze({
  required: 'Required!',
  invalidDate: 'Invalid date!',
  invalidEmail: 'Invalid email format!',
  fileSize: "The file is too large. Maximum size for file is 4 MB."
});

const useFieldValidation = () => {
  const yupField = Object.freeze({
    string: {
      required: yup.string().nullable().required(messages.required),
      optional: yup.string().nullable(),
    },
    date: {
      required: yup.date().required(messages.required).typeError(messages.invalidDate),
      optional: yup.date().nullable().typeError(messages.invalidDate),
    },
    email: {
      required: yup.string().email(messages.invalidEmail).nullable().required(messages.required),
      optional: yup.string().email(messages.invalidEmail).nullable(),
    },
    checkbox: {
      required: yup.bool().oneOf([true], messages.required),
      optional: yup.bool().nullable(),
    },
    files: {
			required: yup
				.mixed()
				.required(messages.required)
				.test("fileSize", messages.fileSize, (value: any) => {
					const fileSizeMB = getFileSizeInMB(value)
					return fileSizeMB <= MAX_FILE_SIZE;
				}),
			optional: yup.mixed().test("fileSize", messages.fileSize, (value: any) => {
				if (!value) return true;
				const fileSizeMB = getFileSizeInMB(value)
				return fileSizeMB <= MAX_FILE_SIZE;
			}).nullable()
		},
    select: {
      required: (options: { value: string; label: string | ReactNode }[]) =>
        yup
          .string()
          .oneOf(options.map((op) => op.value))
          .required(messages.required)
          .nullable(),
      optional: yup.mixed(),
    },
  });

  return yupField;
};

export default useFieldValidation;




//using zod
{/*
"use client";
import { ReactNode } from "react";
import * as z from "zod";

const MAX_FILE_SIZE = 4;
const getFileSizeInMB = (value: File) => value.size / 1024 ** 2;

const messages = Object.freeze({
  required: "Required!",
  invalidDate: "Invalid date!",
  invalidEmail: "Invalid email format!",
  fileSize: "The file is too large. Maximum size for file is 4 MB.",
});

const useFieldValidation = () => {
  const zodField = Object.freeze({
    string: {
      required: z
        .string()
        .nullable()
        .refine((val) => val !== null && val.length >= 1, messages.required),
      optional: z.string().nullable(),
    },
    date: {
      required: z
        .date()
        .refine((value) => value instanceof Date, messages.invalidDate),
      optional: z.date().nullable(),
    },
    email: {
      required: z
        .string()
        .email(messages.invalidEmail)
        .nullable()
        .refine((val) => val !== null && val.length >= 1, messages.required),
      optional: z.string().email(messages.invalidEmail).nullable(),
    },
    checkbox: {
      required: z
        .boolean()
        .refine((value) => value === true, messages.required),
      optional: z.boolean().nullable(),
    },
    files: {
      required: z
        .instanceof(File)
        .refine(
          (file) => getFileSizeInMB(file) <= MAX_FILE_SIZE,
          messages.fileSize,
        ),
      optional: z
        .instanceof(File)
        .nullable()
        .refine(
          (file) => !file || getFileSizeInMB(file) <= MAX_FILE_SIZE,
          messages.fileSize,
        ),
    },
    select: {
      required: (options: { value: string; label: string | ReactNode }[]) =>
        z
          .string()
          .refine(
            (value) => options.some((op) => op.value === value),
            messages.required,
          )
          .nullable(),
      optional: z.any(),
    },
  });

  return zodField;
};

export default useFieldValidation;


*/}