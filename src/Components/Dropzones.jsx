import { useState, useCallback, memo } from 'react';
import { Dustbin } from './Dustbin';
import { ToolboxItems } from './ToolboxItems';
import { FieldTypes} from '../FieldTypes';
import update from 'immutability-helper';

export const Dropzones = memo(function Dropzones() {
    const [dustbins, setDustbins] = useState([
        { accepts: [FieldTypes.TEXT, FieldTypes.EMAIL, FieldTypes.SUBMIT, FieldTypes.EDITABLETXT],lastDroppedItem: null },
        { accepts: [FieldTypes.TEXT, FieldTypes.EMAIL, FieldTypes.SUBMIT, FieldTypes.EDITABLETXT], lastDroppedItem: null },
        { accepts: [FieldTypes.TEXT, FieldTypes.EMAIL, FieldTypes.SUBMIT, FieldTypes.EDITABLETXT], lastDroppedItem: null},
        { accepts: [FieldTypes.TEXT, FieldTypes.EMAIL, FieldTypes.SUBMIT, FieldTypes.EDITABLETXT], lastDroppedItem: null },
        { accepts: [FieldTypes.TEXT, FieldTypes.EMAIL, FieldTypes.SUBMIT, FieldTypes.EDITABLETXT], lastDroppedItem: null},
        { accepts: [FieldTypes.TEXT, FieldTypes.EMAIL, FieldTypes.SUBMIT, FieldTypes.EDITABLETXT], lastDroppedItem: null }
    ]);
    const [fields] = useState([
        { id: 1, name: 'First Name', type: 'text', value: 'firstName' },
        { id: 2, name: 'Last Name', type: 'text', value: 'lastName' },
        { id: 3, name: 'Email Address', type: 'email', value: 'email' },
        { id: 4, name: 'Phone Number', type: 'text', value: 'phone' },
        { id: 5, name: 'Signup', type: 'editableTxt', value: 'signup' },
        { id: 6, name: 'Submit', type: 'submit', value: 'submit' },
    ]);

    const [droppedBoxNames, setDroppedBoxNames] = useState([]);

    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }

    const handleDrop = useCallback((index, item) => {
        setDroppedBoxNames(update(droppedBoxNames, item ? { $push: [item] } : { $push: [] }));
        setDustbins(update(dustbins, {
            [index]: {
                lastDroppedItem: {
                    $set: item,
                },
            },
        }));
    }, [droppedBoxNames, dustbins]);
    
    return (<>
			<div className='element-tray'>
                <h2>Available Fields</h2>
				{fields.map(({ name, type, value }, index) => (<ToolboxItems name={name} type={type} value={value} isDropped={isDropped(name)} key={index}/>))}
			</div>
            <div className='form-canvas'>
                <form>
				{dustbins.map(({ accepts, lastDroppedItem }, index) => (<Dustbin accept={accepts} lastDroppedItem={lastDroppedItem} onDrop={(item) => handleDrop(index, item)} key={index}/>))}
                </form>
			</div>
            </>
		);
});