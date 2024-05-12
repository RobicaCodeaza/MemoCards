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
            className={`flex flex-col  flex-wrap gap-5  has-[button]:justify-end has-[button]:gap-4  phone:items-center phone:gap-4 tab-port:flex-row`}
        >
            {React.Children.map(children, (child) => {
                if (isReactElementWithId(child)) {
                    return (
                        <>
                            {label && (
                                <label
                                    className="ml-auto mr-auto text-[1.4rem] uppercase tracking-wide text-mako-grey-700"
                                    htmlFor={child.props.id}
                                >
                                    {label}
                                </label>
                            )}
                            {child}
                            {error && (
                                <span className="ml-auto text-danger-500">
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
