const PersonForm = ({name, num, onSub, hNameChange, hNumChange}) => 
  <form onSubmit={onSub}>
    <div>name: <input value={name} onChange={hNameChange} /></div>
    <div>number: <input value={num} onChange={hNumChange} /></div>
    <div><button type="submit">add</button></div>
  </form>

export default PersonForm