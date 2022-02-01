import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons'

const style = {
    color: '#FFFFFF',
    backgroundColor: '#28282B',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    cursor: 'move',
    float: 'left',
    textAlign: 'left',
};
export const ToolboxItems = memo(function ToolboxItems({ name, type, value }) {
    const [{ opacity }, drag] = useDrag(() => ({
        type,
        item: { name, type, value },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [name, type, value]);
    return (<div ref={drag} role="Box" style={{ ...style, opacity }} className='element-placeholder'>
			<FontAwesomeIcon icon={faGripLines} /> {name}
		</div>);
});