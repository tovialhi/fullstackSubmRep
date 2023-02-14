import PropTypes from 'prop-types'

const CreateNewForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title:<input value={title}
            onChange={handleTitleChange}/>
        </div>
        <div>
            author:<input value={author}
            onChange={handleAuthorChange}/>
        </div>
        <div>
            url:<input value={url}
            onChange={handleUrlChange}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateNewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default CreateNewForm