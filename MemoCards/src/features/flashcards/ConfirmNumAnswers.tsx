import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Heading from '@/ui/Heading'
import Input from '@/ui/Input'
import FormTriggerFlashcards from './FormTriggerFlashcards'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

type ConfirmAnswersProps = {
    onCloseModal?: () => void
}

type FormFieldsType = { numAnswers: number }

function ConfirmAnswers({ onCloseModal }: ConfirmAnswersProps) {
    const { handleSubmit, register, formState } = useForm<FormFieldsType>()
    const { errors } = formState
    const [numAnswers, setNumAnswers] = useState<number>(1)

    const onSubmit: SubmitHandler<FormFieldsType> = (data) => {
        setNumAnswers(data.numAnswers)
        onCloseModal?.()
    }
    function handleClick() {
        onCloseModal?.()
    }

    return (
        <div className="flex max-w-[75rem] flex-col gap-6">
            <p className=" text-mako-grey-500 ">
                How many answers do you expect to have your question?
            </p>
        </div>
    )
}

export default ConfirmAnswers
