"use client";

import { SignUpSchema } from "@repo/zod-schemas"
import Input from "../../../components/Input";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import z from "@repo/zod-schemas";

const page = () => {
  const [actionMsg, setActionMsg] = useState("nothing");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSignUpSubmit = async (userSignUpData: z.infer<typeof SignUpSchema>) => {
    const { name, email, phone, password } = userSignUpData;

    // const response = await axios.post('/api/user', {
    //   name,
    //   email,
    //   phone,
    //   password
    // });

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password
      })
    })

    if (response.ok) {
      // if (response.ok) {
      //   setActionMsg(response.ok)
      // }
      router.push('signin')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSignUpSubmit)}>
      <Input label="Name" id="name" register={register} error={errors.name?.message} placeholder="johndoe" />
      <Input label="Email" id="email" type="email" register={register} error={errors.email?.message} placeholder='example@gmail.com' />
      <Input label="Phone" id="phone" type="tel" register={register} error={errors.phone?.message} placeholder='1231231231' />
      <Input label="Password" id="password" type="password" register={register} error={errors.password?.message} placeholder='Enter your password' />
      <Input label="Confirm Password" id="confirmPassword" type="password" register={register} error={errors.confirmPassword?.message} placeholder='Re-Enter your password' />

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600">
        Sign Up
      </button>

      <p className="text-red-400">{actionMsg}</p>

      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>

      <p className='text-center text-sm text-gray-600 mt-2'>
        If you already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signin'>
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default page