function RecapPlanCard() {
    return (
        <div
            className="shadow-custom-inset flex  h-[12.5rem] w-[12.5rem]  flex-shrink-0  flex-col justify-center gap-3 rounded-md  px-6 py-6 text-mako-grey-500"
            // style={{ background: 'linear-gradient(135deg,#fb6e77,#fea3a9)' }}
        >
            <p className="text-[1.3rem] font-semibold tracking-wide">
                Quiz Name
            </p>
            <p className="text-[1.3rem] font-medium tracking-wide">
                ⭐: <strong>75</strong>p
            </p>
            <p className="text-[1.3rem] font-medium tracking-wide">
                📆: in <strong>7</strong> days
            </p>
        </div>
    )
}

export default RecapPlanCard
