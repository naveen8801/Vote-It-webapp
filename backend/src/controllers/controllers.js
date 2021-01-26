import mongoose from 'mongoose';
import { v4 } from 'uuid';

import { validateAll } from 'indicative/validator.js';
import pollsDoc from '../models/polls.js';
import ipDoc from '../models/ip_velidator.js';
import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectID;

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

      const newip = new ipDoc({
        poll_id: NewPoll._id,
        ip_adress: req.body.ip,
      });
      await newip.save();
      res.status(201).json(NewPoll);
    } catch (error) {
      console.log('DATABASE ERROR ---  ', error);
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    return res.status(422).json(error);
    console.log('VALIDATION ERROR ----  ', error);
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
      try {
        const ipValidate = await ipDoc.findOne({
          ip_adress: { $all: [req.connection.remoteAddress] },
        });
        if (ipValidate) {
          return res.send('ALREADY VOTED !!');
        } else {
          const ip_adress_previous = await ipDoc.findOne({
            poll_id: pollid,
          });
          const updated_ip_list = [
            ...ip_adress_previous.ip_adress,
            req.connection.remoteAddress,
          ];
          const ip_adress_new = {
            _id: ip_adress_previous._id,
            poll_id: ip_adress_previous.poll_id,
            ip_adress: updated_ip_list,
          };
          const updatedIp = await ipDoc.findByIdAndUpdate(
            ip_adress_previous._id,
            { ...ip_adress_new },
            { new: true }
          );
        }
      } catch (error) {
        console.log('IP ADRESS DOC ERROR -- ', error);
      }
      const updatePost = await pollsDoc.findByIdAndUpdate(pollid, {
        ...updatedPoll,
      });
      res.status(200).json(updatePost);
    } catch (error) {
      console.log(error);
    }
  }
};
//   try {
//     const checkoptionId = await pollsDoc.findOne({
//       'choices._id': optionid,
//     });
//     if (!mongoose.Types.ObjectId.isValid(pollid) || !checkoptionId)
//       return res.status(404).send('No post with that id');
//     else{

//     }    x
//     const updatePost = await pollsDoc.findByIdAndUpdate(pollid, {
//       ...updatedPoll,
//       _id: pollid,
//     });
//     return res.send(updatePost);
//   } catch (error) {
//     console.log(error);
//     res.send(404);
//   }
// };

export const getPoll = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const poll = await pollsDoc.findById(id);
    res.json(poll);
  } catch (error) {
    console.log(error);
  }
};
