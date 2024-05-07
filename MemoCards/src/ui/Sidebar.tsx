import Button from './Button'

function Sidebar() {
    return (
        <div className="row-span-full flex flex-col items-center gap-[3.2rem] border-r border-mako-grey-100 bg-picton-blue-50 px-[2.4rem] py-[3.2rem]">
            <Button variation="simplePrimary" size="medium" as="button">
                MENU
            </Button>
            Sidebar
        </div>
    )
}

export default Sidebar
