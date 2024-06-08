import Button from '@/ui/Button'

function QuestionBtn() {
    return (
        <div className="mt-auto flex justify-between">
            <Button variation="accentTertiary" size="medium">
                Reveal Answer
            </Button>
            <Button variation="accentSecondary" size="medium">
                Next Question
            </Button>
        </div>
    )
}

export default QuestionBtn
