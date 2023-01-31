import personsService from '../services/personsService'




const Persons = ({persons, updateAfterDelete}) => {

    const handleDelete = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {

            personsService.getAll().then(responsePersons => {
                if (!responsePersons.some(per => per.id === person.id)) {
                    updateAfterDelete(`Person ${person.name} has already been removed from server`, {color: 'red'})
                    return
                }
                personsService.deletePerson(person.id)
                updateAfterDelete(`Person ${person.name} was deleted`, {color: 'green'})
            })

        }
    }

    return (
        <div>
            {persons.map((person, i) => 
                <p key={i}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></p>
            )}
        </div>
    )
}

export default Persons