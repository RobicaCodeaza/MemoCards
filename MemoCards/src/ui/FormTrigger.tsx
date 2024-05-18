import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import {
    type FieldError,
    type SubmitErrorHandler,
    useForm,
    type SubmitHandler,
} from 'react-hook-form'
import { Tables } from '@/types/database.types'

import { IoCloseOutline } from 'react-icons/io5'

import FormRow from './FormRow.js'
import Form from './Form.js'
import toast from 'react-hot-toast'
import { PropsWithChildren, useRef } from 'react'
import ButtonIcon from './ButtonIcon.js'
import Input from './Input.js'

function FormTrigger({ children }: PropsWithChildren) {
    const { register, handleSubmit, formState } = useForm<Tables<'Card'>>()
    const close = useRef(null)

    const { errors } = formState
    const onSubmit: SubmitHandler<Tables<'Card'>> = (data) => {
        console.log(data)
    }
    const onError: SubmitErrorHandler<FieldError> = (errors) => {
        toast.error(
            'Eroare la completarea formularului.Verifica campurile introduse.'
        )
    }

    return (
        <Drawer>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="bg-white  mx-auto flex flex-col  items-center justify-items-center px-10 py-5 2xl:px-32 ">
                <DrawerClose ref={close} className="absolute  right-6 top-6">
                    <ButtonIcon color={'#626262'}>
                        <IoCloseOutline></IoCloseOutline>
                    </ButtonIcon>
                </DrawerClose>

                <DrawerHeader>
                    <DrawerTitle className="mb-5 text-center text-[24px] leading-none sm:text-[32px] md:text-[4.4rem] xl:mb-2 xl:leading-normal">
                        Afla mai multe despre oferta noastra
                    </DrawerTitle>
                    <DrawerDescription className="text-greyDark text-center text-[14px]  sm:text-[16px] md:text-[18px] ">
                        Fie ca doresti sa vorbim despre serviciile oferite sau
                        pentru alte sugestii, dorim sa-ti auzim opinia.
                    </DrawerDescription>
                </DrawerHeader>

                <Form onSubmit={handleSubmit(onSubmit, onError)}>
                    {/* <DrawerFooter> */}
                    <FormRow
                        label="Nume si prenume"
                        error={errors?.question?.message}
                    >
                        <Input
                            className="border-accent2 text-primrayDark border-greyLight bg-primaryLight text-primaryDark accent-colorAccent2 focus:ring-colorAccent2 border-2 border-solid px-4  py-2  text-[16px] focus:outline-none focus:ring focus:ring-offset-1"
                            type="text"
                            id="question"
                            placeholder="ex: Popescu Gabriel"
                            {...register('question', {
                                required: 'This field is required',
                            })}
                        />
                    </FormRow>
                    <FormRow label="Email" error={errors?.answers?.message}>
                        <Input
                            className="border-accent2 border-greyLight bg-primaryLight accent-colorAccent2 focus:ring-colorAccent2 border-2 border-solid px-4  py-2 text-[16px] focus:outline-none focus:ring  focus:ring-offset-2"
                            placeholder="ex: youremail@yahoo.com"
                            type="email"
                            id="answers"
                            {...register('answers', {
                                required: 'This field is required',
                            })}
                        />
                    </FormRow>
                    <FormRow label="Telefon" error={errors?.phone?.message}>
                        <Input
                            className="border-accent2 border-greyLight bg-primaryLight accent-colorAccent2 focus:ring-colorAccent2 border-2 border-solid px-4 py-2 text-[16px] focus:outline-none focus:ring focus:ring-offset-2"
                            placeholder="ex: 0760...."
                            type="tel"
                            id="phone"
                            {...register('phone', {})}
                        />
                    </FormRow>

                    <FormRow label="Subiect" error={errors?.subiect?.message}>
                        <Input
                            className="border-accent2 border-greyLight bg-primaryLight accent-colorAccent2 focus:ring-colorAccent2 border-2 border-solid px-4 py-2 text-[18px] focus:outline-none focus:ring focus:ring-offset-2 "
                            placeholder="ex: Administrare completa"
                            type="text"
                            id="subiect"
                            {...register('subiect', {
                                required: 'This field is required',
                            })}
                        />
                    </FormRow>

                    <FormRow label="Mesaj" error={errors?.mesaj?.message}>
                        <textarea
                            className="border-accent2 border-greyLight bg-primaryLight accent-colorAccent2  focus:ring-colorAccent2 border-2 border-solid px-4 py-2 text-[16px] focus:outline-none focus:ring focus:ring-offset-2"
                            id="mesaj"
                            placeholder="Mesajul tau"
                            {...register('mesaj', {
                                required: 'This field is required',
                            })}
                        />
                    </FormRow>
                    <div className="flex justify-between gap-6">
                        <Button
                            type="reset"
                            $variation="secondary"
                            $size="medium"
                        >
                            Cancel
                        </Button>
                        <Button
                            // onClick={(e) => e.preventDefault()}
                            $variation="primary"
                            $size="medium"
                        >
                            Submit
                        </Button>
                    </div>
                    {/* </DrawerFooter> */}
                </Form>
            </DrawerContent>
        </Drawer>
    )
}

export default FormTrigger
