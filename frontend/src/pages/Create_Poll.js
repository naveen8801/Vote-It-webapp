import React, { useState } from 'react';
import { NewPoll , url } from '../api';
import  {Link} from 'react-router-dom'

function Create_Poll() {
  const [title, setTitle] = useState('');
  const [choices, setChoices] = useState(['']);
  const [error, seterrror] = useState(false);
  const [success , setsuccess] = useState({ });
  const addAnswer = () => {
    setChoices([...choices, '']);
  };

  const removeChoice = (index) => {
    const newChoices = choices.filter((choice, choiceIndex) => {
      return choiceIndex !== index;
    });

    setChoices(newChoices);
  };

  const onChoiceChange = (index, value) => {
    const newChoices = choices.map((choice, choiceIndex) => {
      if (choiceIndex === index) {
        return value;
      }

      return choice;
    });

    setChoices(newChoices);
  };

  const createPoll = async () => {
    const newpoll = {
      title,
      choices,
    };
    try {
      const newpoll_created = await NewPoll(newpoll);
      setTitle('');
      setChoices(['']);
      await setsuccess(newpoll_created.data);
      seterrror(false);
      
    } catch (error) {
      seterrror(true);
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto my-16 md:my-32 px-6 ">
      <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-white">
        {error ? (
          <header
            className="px-8 py-5 text-gray-800"
            style={{ backgroundColor: '#f05454', color: 'white' }}
          >
            *All fields are required and minimum two choices are required
          </header>
        ) : null}
        <header className="border-b border-gray-400 px-8 py-5 text-white-800">
          Create poll
        </header>

        {success._id ? (
          <div className="py-5 px-8">
            <div className="w-full mb-2 bg-green-100 text-green-500 border border-green-500 rounded py-3 px-2">
              Poll created successfully.{' '}
              <Link to={`/polls/${success._id}`}>
                {url}/polls/{success._id}
              </Link>
            </div>
          </div>
        ) : null}

        {!success._id ? (
          <div className="py-5 px-8">
            <div className="mb-6">
              <label htmlFor="title" className="text-sm mb-2 inline-block">
                Enter the title of the poll
              </label>
              <input
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                name="title"
                id="title"
                type="text"
                className="w-full py-2 border border-gray-400 rounded px-4"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm mb-2 inline-block">
                Enter all the possible answers for this poll
              </label>
              {choices.map((choice, index) => (
                <div key={index} className="w-full flex items-center mb-2">
                  <input
                    onChange={(event) =>
                      onChoiceChange(index, event.target.value)
                    }
                    key={index}
                    type="text"
                    value={choice}
                    className="w-full py-2 border border-gray-400 rounded px-4"
                  />
                  <button
                    onClick={() => removeChoice(index)}
                    className="py-2 ml-2 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addAnswer}
              className="bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Add answer
            </button>
            <div className="mt-12 mb-6 text-center">
              <button
                onClick={createPoll}
                className="bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Create Poll
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Create_Poll;
