export const AddArticle = () => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault(event);
        console.log(event.target.title.value);
        if (event.target.title.value === '' || event.target.body.value === '') {
          alert('please fill in all the fields');
        }
      }}
    >
      <label htmlFor='title'>Title</label>
      <input type='text' name='title' id='title' defaultValue='Team' />
      <label htmlFor='body'>Body</label>
      <input
        type='text'
        name='body'
        id='body'
        defaultValue='Teams are the best'
      />
      <label htmlFor='topic'>Topic</label>
      <select name='topic' id='topic'>
        <option value='Coding'>Coding</option>
        <option value='Football'>Football</option>
        <option value='Cooking'>Cooking</option>
      </select>
      <input type='submit' value='Create Article' />
    </form>
  );
};
