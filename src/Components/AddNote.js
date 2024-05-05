import React, { useContext, useState } from 'react';
import noteContext from "../Context/noteContext";

const AddNote = () => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        if (note.title.trim().length >= 5 && note.title.trim().length <= 100 && 
            note.description.trim().length >= 5 && note.description.trim().length <= 2000 &&
            note.tag.trim().length <= 10) {
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
        } else {
            alert("Title should be between 5 and 100 characters, description should be between 5 and 2000 characters, and tag should be at most 10 characters.");
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setNote(prevNote => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const getCharacterCountRatio = (currentLength, maxLength) => {
        return `${currentLength}/${maxLength}`;
    };

    return (
        <div className="container my-2">
            <h2 className='text-light'>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label text-light">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="title" 
                      name="title" 
                      value={note.title} 
                      onChange={onChange} 
                      minLength={5} 
                      maxLength={100} 
                      required 
                    />
                    <span className='text-light'>{getCharacterCountRatio(note.title.length, 100)} Characters</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-light">Description</label>
                    <textarea 
                      className="form-control" 
                      id="description" 
                      name="description" 
                      value={note.description} 
                      onChange={onChange} 
                      minLength={5} 
                      maxLength={2000} 
                      required 
                    />
                    <span className='text-light'>{getCharacterCountRatio(note.description.length, 2000)} Characters</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label text-light">Tag</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="tag" 
                      name="tag" 
                      value={note.tag} 
                      onChange={onChange} 
                      maxLength={10} 
                    />
                    <span className='text-light'>{getCharacterCountRatio(note.tag.length, 10)} Characters</span>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
