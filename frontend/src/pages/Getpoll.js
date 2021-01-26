import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CastVote, GetPoll } from '../api';
import Button from '../components/Button/Button';
function Getpoll(props) {
  const pollID = props.props.match.params.poll;

  const [poll, setpoll] = useState(null);
  const [voted, setVoted] = useState(false);

  const fetchPoll = async () => {
    const poll = await GetPoll(pollID);
    setpoll(poll.data);
  };

  useEffect(() => {
    fetchPoll();
  }, [voted]);

  const getTotalVotes = () => {
    let totalVotes = 0;

    poll.choices.forEach((choice) => {
      totalVotes += choice.count;
    });

    return totalVotes;
  };

  const getChoicePercentage = (selectedChoice) => {
    const totalVotes = getTotalVotes();

    if (totalVotes === 0) {
      return 0;
    }

    return Math.round((selectedChoice.count / totalVotes) * 100);
  };

  const vote = async (choice) => {
    const currentchoiceList = poll.choices;
    const choice_be_updated = currentchoiceList.find((x)=>x._id===choice);
    choice_be_updated.count +=1;
    const updated_poll ={
        ...poll , choice_be_updated
    }
    const poll_updated = await CastVote(pollID,choice,updated_poll);
    setVoted(true);
  };

  return (
    <div className="container mx-auto mt-16 px-5">
      <h1 className="my-5 text-3xl text-center">
        Welcome to VoteMe
      </h1>

      {poll ? (
        <div className="w-full max-w-3xl mx-auto bg-white shadow">
          <header className="px-5 py-4 flex justify-between items-center">
            {poll.title}

            {voted && <span>{getTotalVotes()} votes</span>}

            <Button onClick={() => setVoted(true)}>View results</Button>
          </header>

          {poll.choices.map((choice) => {
            return (
              <div
                className="px-5 py-4 border-t border-gray-400 flex justify-between items-center"
                key={choice._id}
              >
                {choice.name}

                {voted ? (
                  <span className="text-blue-500">
                    {' '}
                    {getChoicePercentage(choice)}%{' '}
                  </span>
                ) : (
                  <Button onClick={() => vote(choice._id)}>Vote</Button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Getpoll;
