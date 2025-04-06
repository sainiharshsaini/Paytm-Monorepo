import { z } from "zod";

export default z;

// Signup Validation Schema
export const SignUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Invalid phone number").max(15, "Invalid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

// Signin Validation Schema
export const SignInSchema = z.object({
    email: z.string().email("Invalid email format").optional(),
    number: z.string().min(10, "Number must be 10 digits").max(10, "Number must be 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});