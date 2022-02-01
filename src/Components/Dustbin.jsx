import { memo, useState } from 'react';
import { useDrop } from 'react-dnd';

const style = {
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'black',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    border: '1px solid'
};
export const Dustbin = memo(function Dustbin({ accept, lastDroppedItem, onDrop, }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const [state, setState] = useState({});

    const handleChange = (e) => {
        setState(e.target.value);
    };
 
    const isActive = isOver && canDrop;
    let borderColor = '#F5F5F5';
    if (isActive) {
        borderColor = 'blue';
    } 
   
    return (<div ref={drop} style={{ ...style, borderColor }}>
			{lastDroppedItem && (
                <input
                placeholder={lastDroppedItem.name}
                type={lastDroppedItem.type}
                name={lastDroppedItem.name}
                value={lastDroppedItem.state}
                onChange={handleChange}
            />
            )}
		</div>);
});
