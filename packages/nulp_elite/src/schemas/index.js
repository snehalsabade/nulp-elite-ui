import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email format")
    .when("contactMethod", {
      is: (val) => val === "email",
      then: Yup.string().required("Please enter your email"),
      otherwise: Yup.string().notRequired(),
    }),
  birthYear: Yup.number()
    .min(1925)
    .max(4)
    .required("Please select your year of birth"),
  password: Yup.string()
    .min(8, "Your password must contain a minimum of 8 characters")
    .required("Password is required")
    .matches(/[0-9]/, "It must include numbers")
    .matches(/[A-Z]/, "It must include capital letter")
    .matches(/[0-9]/, "It must include small letter")
    .matches(/[!@#$%^&*(,.{}/?<>)]/),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Confirm Password be must match with new password"
    )
    .required("Confirm Password is required"),
});
