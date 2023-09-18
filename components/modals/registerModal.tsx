"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"
import { useCallback, useState } from "react"

import Modal from "@/components/modals/modal"
import Heading from "@/components/heading"
import ActionInput from "@/components/action-input"
import toast from "react-hot-toast"
import ActionButton from "@/components/action-button"

import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setisLoading] = useState(false)

    const { 
        register, 
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
                toast.success("Registration Successful")
            })
            .catch((error) =>{
                toast.error("Something went wrong!")
                console.log(error)
            })
            .finally(() =>{
                setisLoading(false)
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal, registerModal])


    const body = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Register Here"
                subtitle="Prepare to be a part of the ToonMania Family"
            />
            <ActionInput
                id="email"
                label="Email Address"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <ActionInput
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <ActionInput
                id="password"
                label="Pasword"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            {/* <ActionInput
                id="passwordConfirm"
                label="Password Confirm"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            /> */}
        </div>
    )

    const footer = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <ActionButton
                disabled={isLoading}
                outline
                label="Sign Up with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <ActionButton
                disabled={isLoading}
                outline
                label="Sign Up with GitHub"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className="mt-4 text-neutral-500 text-center font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div 
                        className="hover:underline cursor-pointer text-neutral-800"
                        onClick={toggle}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={body}
            footer={footer}
        />
     );
}
 
export default RegisterModal;