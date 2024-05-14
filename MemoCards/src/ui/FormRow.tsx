import React, { ReactNode, type ReactElement } from 'react'

type FormRowProps = {
    children: ReactElement[] | ReactElement
    label?: string
    error?: string
}
function FormRow({ children, label, error }: FormRowProps) {
    function isReactElementWithId(
        node: ReactElement
    ): node is ReactElement<{ id: string }> {
        return (
            typeof node === 'object' &&
            node !== null &&
            'props' in node &&
            'id' in node.props
        )
    }

    return (
        <div
            className={`flex flex-col items-center justify-center  gap-5   border-b border-mako-grey-100 py-4 has-[button]:flex   has-[button]:flex-row  has-[button]:justify-end has-[button]:gap-4 has-[button]:border-none  phone:grid phone:grid-cols-[25rem_1fr_minmax(max-content,1fr)] phone:gap-10`}
            style={{}}
        >
            {React.Children.map(children, (child) => {
                if (isReactElementWithId(child)) {
                    return (
                        <>
                            {label && (
                                <label
                                    className=" text-[1.4rem]  uppercase tracking-wide text-mako-grey-700"
                                    htmlFor={child.props.id}
                                >
                                    {label}
                                </label>
                            )}
                            {child}
                            {error && (
                                <span className="flex  text-center text-danger-500">
                                    {error as ReactNode}
                                </span>
                            )}
                        </>
                    )
                } else return <>{child}</>
            })}
        </div>
    )
}

export default FormRow
