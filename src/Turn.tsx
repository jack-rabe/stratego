export default function Turn({ turn }: { turn: boolean }) {
    return (
        <div className="flex items-center justify-center">
            <div
                className={`badge mt-4 p-6 w-40 ${
                    turn ? 'badge-primary' : 'badge-secondary'
                }`}
            >
                {turn ? 'Your turn' : 'Enemy Turn'}
            </div>
        </div>
    );
}
