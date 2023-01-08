import { SubmitHandler, useForm } from 'react-hook-form';

import InputError from '../components/Form/InputError';
import useToDo from '../context/ToDoContext/ToDoProvider';
import { IToDo } from '../models/ToDo';

interface IToDoForm {
  title: string;
  completed: boolean;
}

export default function ToDos() {
  const { toDos, updateToDo, addToDo } = useToDo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IToDoForm>();

  const onSubmit: SubmitHandler<IToDoForm> = (data) => {
    addToDo(data.title, data.completed);
  };

  const handleToDoCompleted = (toDo: IToDo) => {
    const tmp = toDo;
    tmp.completed = !tmp.completed;
    updateToDo(tmp);
  };

  return (
    <div className="flex flex-col flex-auto gap-12 my-8">
      <h1>ToDos</h1>
      <div className="flex-auto">
        <h2 className="mb-6">Add ToDo:</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-12">
          <span>Add your to-do's title and check if it's completed!</span>
          <div className="flex flex-row gap-4">
            <div className="form-input">
              <input
                placeholder="Enter to-do title"
                {...register('title', {
                  required: 'Title is required',
                })}
              />
              <InputError field={errors.title} />
            </div>
            <input type="checkbox" {...register('completed')} className="h-9 cursor-pointer" />
          </div>

          <button type="submit">Submit</button>
        </form>

        <h2 className="mb-6">My ToDos:</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h3>Title</h3>
            <h3>Completed</h3>
          </div>
          {toDos.map((toDo: IToDo, index: number) => {
            return (
              <div
                key={index}
                className="rounded-md bg-neutral-900 px-3 py-2 flex flex-row justify-between shadow hover:shadow-purple-600"
              >
                <span>{toDo.title}</span>
                <input
                  key={Math.random()}
                  type="checkbox"
                  defaultChecked={toDo.completed}
                  onChange={() => {
                    handleToDoCompleted(toDo);
                  }}
                  className="cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
