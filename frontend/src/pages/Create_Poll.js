import React, { useState } from "react";
import { NewPoll } from "../api";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
} from "react-share";

import { ShareButtons, ShareCounts, generateShareIcon } from "react-share";

// const url = 'https://vote-me.netlify.app';

const url = "https://vote-it-now.netlify.app";

function Create_Poll() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [choices, setChoices] = useState([""]);
  const [error, seterrror] = useState(false);
  const [success, setsuccess] = useState({});
  const [loading, setloading] = useState(false);
  const addAnswer = () => {
    setChoices([...choices, ""]);
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
    setloading(true);
    const newpoll = {
      title,
      description,
      choices,
    };
    try {
      const newpoll_created = await NewPoll(newpoll);
      setTitle("");
      setChoices([""]);
      await setsuccess(newpoll_created.data);
      seterrror(false);
    } catch (error) {
      seterrror(true);
      console.log(error.message);
    }
    setloading(false);
  };

  const copyToClipboar = () => {
    navigator.clipboard.writeText(`${url}/polls/${success._id}`);
  };

  return (
    <div className="container mx-auto my-16 md:my-32 px-6 items-center">
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "4rem",
          }}
        >
          <CircularProgress
            style={{ textAlign: "center", display: "inline-block" }}
          />
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto rounded shadow-xl bg-white">
          {error ? (
            <header
              className="px-8 py-5 text-gray-800"
              style={{ backgroundColor: "#f05454", color: "white" }}
            >
              *All fields are required and minimum two choices are required
            </header>
          ) : null}
          <header className="border-b border-gray-400 px-8 py-5 text-white-800">
            <strong>Create poll</strong>
          </header>

          {success._id ? (
            <div className="py-9 px-8">
              <div
                style={{ wordWrap: "break-word" }}
                className="w-full mb-2 bg-green-100 text-green-500 border border-green-500 rounded py-3 px-2"
              >
                <strong>Poll created successfully - </strong>
                <Link to={`/polls/${success._id}`}>
                  {url}/polls/{success._id}
                </Link>
                <div style={{ display: "inline-block", float: "right" }}>
                  <FileCopyIcon onClick={copyToClipboar} />
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <EmailShareButton
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                  url={`${url}/polls/${success._id}`}
                >
                  <EmailIcon size={45} round />
                </EmailShareButton>
                <WhatsappShareButton
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                  url={`${url}/polls/${success._id}`}
                >
                  <WhatsappIcon size={45} round />
                </WhatsappShareButton>
                <TwitterShareButton
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                  url={`${url}/polls/${success._id}`}
                >
                  <TwitterIcon size={45} round />{" "}
                </TwitterShareButton>
                <RedditShareButton
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                  url={`${url}/polls/${success._id}`}
                >
                  <RedditIcon size={45} round />
                </RedditShareButton>
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
                <label htmlFor="desc" className="text-sm mb-2 inline-block">
                  Enter description of the poll.
                </label>
                <textarea
                  name="desc"
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={10}
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
                      class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addAnswer}
                class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Add Option
              </button>
              <div className="mt-12 mb-6 text-center">
                <button
                  onClick={createPoll}
                  class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  Create Poll
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Create_Poll;
