import mongoose from 'mongoose';
import { validateAll } from 'indicative/validator.js';
import pollsDoc from '../models/polls.js';
import Pusher from 'pusher';
import dotenv from 'dotenv';

dotenv.config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRETKEY,
  cluster: process.env.PUSHER_CLUSTER,
});
console.log({
  appId: process.env.PUSHER_APIID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUHSER_SECRETKEY,
  cluster: process.env.PUSHER_CLUSTER,
});

export const createPoll = async (req, res) => {
  const poll = {
    title: req.body.title,
    choices: req.body.choices.map((choice) => ({
      name: choice,
      count: 0,
    })),
  };
  try {
    await validateAll(req.body, {
      title: 'required',
      choices: 'required|array|min:2',
      'choices.*': 'required|string',
    });

    try {
      const NewPoll = new pollsDoc(poll);
      await NewPoll.save();
      res.status(201).json(NewPoll);
    } catch (error) {
      console.log('DATABASE ERROR ---  ', error);
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    console.log('VALIDATION ERROR ----  ', error);
    return res.status(422).json(error);
  }
};

export const voteHere = async (req, res) => {
  const { pollid, optionid } = req.params;
  const updatedPoll = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(pollid) ||
    !mongoose.Types.ObjectId.isValid(optionid)
  ) {
    res.status(404).json('No such poll or choice');
  } else {
    try {
      pollsDoc.findByIdAndUpdate(pollid, updatedPoll, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated Poll : ', docs);
        }
      });
      pusher.trigger('polling', 'poll_created', updatedPoll);
      res.status(200).json('OK');
    } catch (error) {
      console.log(error);
    }
  }
};

export const getPoll = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await pollsDoc.findById(id);
    res.json(poll);
  } catch (error) {
    console.log(error);
  }
};
