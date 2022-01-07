export default function CardMatch() {
    return (
        <div className="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14">
            <div className="snap-center shrink-0">
                <div className="shrink-0 w-4 sm:w-48"></div>
            </div>
            <div className="snap-center shrink-0">
                <img className="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80"/>
            </div>
            <div className="snap-center shrink-0">
                <img className="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80"/>
            </div>
        </div>

    )
}