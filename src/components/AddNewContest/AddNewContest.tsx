import { useState } from "react";
import { addNewContest } from "../../api-client";

const AddNewContest = ({ onSuccess }) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const contestName = form.contestName;
    const categoryName = form.categoryName;
    const description = form.description;

    const contest = await addNewContest({
      contestName: contestName.value,
      categoryName: categoryName.value,
      description: description.value,
    });

    if (contest?.id) {
      form.reset();
      onSuccess(contest)
    }
  };

  return (
    <div className="add-new-contest">
      {!showForm && (
        <div className="link" onClick={() => setShowForm(true)}>
          Add New Contest
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Contest Name"
            name="contestName"
          />
          <input
            type="text"
            placeholder="Contest Category"
            name="categoryName"
          />
          <textarea
            placeholder="Contest Description"
            name="description"
            rows={5}
          />
          <button type="submit">Sumbit</button>
        </form>
      )}
    </div>
  );
};

export default AddNewContest;
