export default function FriendlyTroop(props: {
    value: number;
    representation: string;
    isSelected: boolean;
}) {
    return (
        <div
            className={`h-3/4 w-3/4 bg-primary m-auto flex justify-center items-center text-sm ${
                props.isSelected ? 'bg-primary-focus' : ''
            }`}
        >
            {props.representation + "\n"} 
            {props.value}
        </div>
    );
}
