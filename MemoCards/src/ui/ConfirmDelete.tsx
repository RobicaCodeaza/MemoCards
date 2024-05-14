import Heading from './Heading'
import Button from './Button'

type ConfirmDeleteProps = {
    resourceName: string
    onConfirm: () => void
    disabled: boolean
    onCloseModal: () => void
}

function ConfirmDelete({
    resourceName,
    onConfirm,
    disabled,
    onCloseModal,
}: ConfirmDeleteProps) {
    return (
        <div className="flex w-[30rem] flex-col gap-5 phone:w-[40rem]">
            <Heading as="h3">Delete {resourceName}</Heading>
            <p className="mb-5 text-mako-grey-500">
                Are you sure you want to delete this {resourceName} permanently?
                This action cannot be undone.
            </p>

            <div className="flex justify-end gap-5">
                <Button
                    variation="simplePrimary"
                    disabled={disabled}
                    onClick={onCloseModal}
                    size="small"
                >
                    Cancel
                </Button>
                <Button
                    variation="danger"
                    size="small"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ConfirmDelete
