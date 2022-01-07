export default function Content({ children }) {
    return (
        <div className="mx-28 mt-8">
            <h2 className="font-semibold text-2xl text-white truncate pr-20 px-6 ">My Sport</h2>
            <h2 className="font-semibold text-xs text-zinc-400 truncate pr-20 px-6 ">All available contract</h2>
            {children}
        </div>
    )
}