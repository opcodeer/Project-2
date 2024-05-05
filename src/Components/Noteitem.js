import React, { useContext, useState } from 'react';
import noteContext from "../Context/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const [showTag, setShowTag] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleTagToggle = () => {
        setShowTag(!showTag);
    }

    const handleDescriptionToggle = () => {
        setShowFullDescription(!showFullDescription);
    }

    return (
        <div className="col-md-3">
            <div className="card my-3 mx-3" style={{boxShadow:'0 0 15px white'}}>
                <div className="card-body">
                    <h6 className={`card-title ${showTag ? '' : 'd-none'}`} style={{fontWeight:'bolder'}}>{note.tag}</h6>
                    <div className='d-flex justify-content-end'>
                        <i className="far fa-trash-alt mx-1" onClick={() => deleteNote(note._id)}></i>
                        <i className="far fa-edit mx-1" onClick={() => updateNote(note)}></i>
                        <i className={`far ${showTag ? 'fa-eye-slash' : 'fa-eye'} mx-1`} onClick={() => handleTagToggle()}></i>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title my-1" style={{ width: '100%', wordWrap: 'break-word', fontWeight: 'bold' }}>{note.title}</h5>
                    </div>
                    <p className="card-text">
                        {note.description.length > 100 && !showFullDescription
                            ? `${note.description.slice(0, 100)}...`
                            : note.description}
                        {note.description.length > 100 &&
                            <div className="mt-2"> {/* Add margin-top to push the buttons to the next line */}
                                <span className="text-primary" type='button' onClick={handleDescriptionToggle}>
                                    {showFullDescription ? 'View less' : 'View more'}
                                </span>
                            </div>
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
