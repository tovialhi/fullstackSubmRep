import personsService from '../services/personsService'




const Persons = ({persons, handleDelete}) => {

    return (
        <div>
            {persons.map((person, i) => 
                <p key={i}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></p>
            )}
        </div>
    )
}

export default Persons