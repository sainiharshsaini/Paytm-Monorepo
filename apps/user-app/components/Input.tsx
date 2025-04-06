import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ // InputHTMLAttributes<HTMLInputElement>. This allows our custom component to inherit all the default attributes of an <input> element in HTML
    label: string;
    id: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, type = "text", register, error, ...rest}) => { //The {...rest} syntax (spread operator) is used to pass any additional props automatically to the <input> element without manually specifying each one
    return (
        <div className="mb-4">
            <label htmlFor={id}  className="block text-gray-700 font-medium">
                {label}
            </label>
            <input id={id} type={type} {...register(id)} {...rest}
            className={`w-full p-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Input