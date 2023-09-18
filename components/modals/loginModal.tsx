"use client"

import { signIn } from "next-auth/react"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import { AiFillGithub } from "react-icons/ai"
import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"

import useRegisterModal from "@/hooks/useRegisterModal"

import Modal from "@/components/modals/modal"
import Heading from "@/components/heading"
import ActionInput from "@/components/action-input"
import ActionButton from "@/components/action-button"
import useLoginModal from "@/hooks/useLoginModal"
import { useRouter } from "next/navigation"

const LoginModal = () => {
    const router = useRouter()
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
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setisLoading(false);
            if (callback?.ok) {
                toast.success("Logged in")
                router.refresh()
                loginModal.onClose();
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal, registerModal])

    const body = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Login Here"
                subtitle="Login to your account"
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
                id="password"
                label="Pasword"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footer = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <ActionButton
                disabled={isLoading}
                outline
                label="Sign In with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <ActionButton
                disabled={isLoading}
                outline
                label="Sign In with GitHub"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className="mt-4 text-neutral-500 text-center font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        Don't have an account?
                    </div>
                    <div 
                        className="hover:underline cursor-pointer text-neutral-800"
                        onClick={toggle}
                    >
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Log In"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={body}
            footer={footer}
        />
     );
}
 
export default LoginModal;