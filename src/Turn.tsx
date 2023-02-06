export default function Turn(props) {
    return (
        <div className="flex items-center justify-center">
            <div
                className={`badge mt-4 p-6 w-40 ${
                    props.turn ? 'badge-primary' : 'badge-secondary'
                }`}
            >
                {props.turn ? 'Your turn' : 'Enemy Turn'}
            </div>
        </div>
    );
}
