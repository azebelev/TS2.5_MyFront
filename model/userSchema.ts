import { Schema, model } from 'mongoose';
import { Task } from '../interfaces/types';

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  items: [{
    text: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  }]

});

userSchema.methods.addNewTask = async function (text: string) {
  this.items.push({ text });
  await this.save();

  return this.items[this.items.length - 1]._id;
};

userSchema.methods.deleteTaskById = async function (task_idForDelete: string) {

  this.items = this.items.filter((task: Task) =>
    task._id?.toString() !== task_idForDelete);
  await this.save();
};

userSchema.methods.updateTask = async function (task: Task) {

  this.items = this.items.map((item: Task) => {
    if (item._id?.toString() === task.id) {
      item = { text: task.text, checked: task.checked, _id: item._id }
    }

    return item
  })
  await this.save()

}

export default model('User', userSchema);