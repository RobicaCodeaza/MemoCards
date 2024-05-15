import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import FileInput from '@/ui/FileInput'

function UpdateUserDataForm() {
    return (
        <Form variation="regular">
            <FormRow label="Email address">
                <Input id="emailAddress" value={''} disabled />
            </FormRow>

            <FormRow label="Full name">
                <Input id="fullName" type="text" />
            </FormRow>

            <FormRow label="Avatar image">
                <FileInput id="avatar" />
            </FormRow>

            <FormRow>
                <Button type="reset" size="small" variation="subtleWhite">
                    Cancel
                </Button>
                <Button type="submit" size="small" variation="simplePrimary">
                    Update account
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdateUserDataForm
