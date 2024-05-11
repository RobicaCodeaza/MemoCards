function DeckCard() {
    return (
        <div className="flex flex-col   rounded-lg border border-solid  border-picton-blue-200 bg-picton-blue-50  px-10 py-10 shadow-lg">
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <p
                        className=" rounded-xl border border-picton-blue-200 bg-picton-blue-400 p-2 text-center text-[1.6rem] font-medium uppercase leading-[1.25] tracking-tight text-picton-blue-50 "
                        id="chapter"
                    >
                        Sistemul Muscular
                    </p>
                    <p
                        className="leading[1.5] text-center text-[1.6rem] text-picton-blue-800"
                        id="subchapter "
                    >
                        Membre Inferioare
                    </p>
                    <p
                        className="rounded-xl border border-picton-blue-400  p-1 text-center text-[1.3rem] font-semibold uppercase tracking-wider text-picton-blue-700"
                        id="lesson "
                    >
                        Picior
                    </p>
                </div>
                <div>Menu</div>
            </div>

            <div className="mt-14 flex flex-col gap-4  px-8 text-[1.3rem] uppercase tracking-wider">
                <p className="text-center text-neon-carrot-700">
                    Perfection Score
                </p>
                <progress className="rounded-full bg-picton-blue-300 text-picton-blue-50"></progress>
            </div>
            <p className="mt-12 text-center text-[1.5rem] text-picton-blue-400 ">
                Last used: <strong>09/08/2001</strong>
            </p>
        </div>
    )
}

export default DeckCard
