const Filter = ({filter, hFilterChange}) => 
  <form>
    <div>filter shown with <input value={filter} onChange={hFilterChange}></input></div>
  </form>

export default Filter