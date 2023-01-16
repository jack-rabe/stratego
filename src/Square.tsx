export default function Square(props: { position: number }) {
    return (
        <div
            className={
                'border-l border-t border-black bg-slate-700 text-center hover:bg-slate-500 h-16 w-16 ' +
                getBorderClasses(props.position)
            }
        >
            {props.position}
        </div>
    );
}

// only add right right border to the far right elements and bottom borders to the bottom elements
function getBorderClasses(position: number) {
    let classes: string[] = [];

    let posStr: 'bottomRight' | 'bottom' | 'right' | 'middle' = 'middle';
    if (position < 90 && position % 10 != 9) posStr = 'middle';
    else if (position == 99) posStr = 'bottomRight';
    else if (position >= 90) posStr = 'bottom';
    else posStr = 'right';

    switch (posStr) {
        case 'middle':
            break;
        case 'right':
            classes.push('border-r');
            break;
        case 'bottom':
            classes.push('border-b');
            break;
        case 'bottomRight':
            classes.push('border-b');
            classes.push('border-r');
            break;
    }
    return classes.join(' ');
}
