import { PropsWithChildren } from 'react'

function CustomizedLabel({ children }: PropsWithChildren) {
    return <div className="text-[1.4rem] text-mako-grey-400">{children}</div>
}

export default CustomizedLabel
