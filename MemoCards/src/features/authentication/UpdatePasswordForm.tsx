import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'

function UpdatePasswordForm() {
    return (
        <Form variation="regular">
            <FormRow label="Password (min 8 characters)">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
            </FormRow>

            <FormRow label="Confirm password">
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                />
            </FormRow>
            <FormRow>
                <Button type="reset" variation="simpleSecondary" size="small">
                    Cancel
                </Button>
                <Button type="reset" variation="simplePrimary" size="small">
                    Update password
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdatePasswordForm
