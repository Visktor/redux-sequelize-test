import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type Data = yup.InferType<typeof loginSchema>;

function validateLoginInputs(fields: { email: string; password: string }):
  | {
      success: true;
      data: Data;
    }
  | { success: false; errors: Record<keyof Data, string> } {
  try {
    const data = loginSchema.validateSync(
      {
        email: fields.email,
        password: fields.password,
      },
      {
        abortEarly: false,
      },
    );
    return { success: true, data };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.reduce(
        (acc, curr) => {
          if (curr.path) acc[curr.path as keyof typeof fields] = curr.message;

          return acc;
        },
        {} as Record<keyof Data, string>,
      );

      return { success: false, errors };
    } else {
      throw new Error("An error occurred while validating login data.");
    }
  }
}

export { validateLoginInputs, loginSchema };
