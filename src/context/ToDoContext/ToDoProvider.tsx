import { createContext, useContext, useEffect, useState } from 'react';

import { IToDo } from '../../models/ToDo';

interface ITodoProvider {
  toDos: IToDo[];
  updateToDo: (todo: IToDo) => void;
  addToDo: (title: string, completed: boolean) => void;
}

const ToDoContext = createContext({});

export function ToDoProvider({ children }: any) {
  const [toDos, setToDos] = useState<IToDo[]>([]);

  useEffect(() => {
    fetchToDos().then((data) => {
      setToDos(data);
    });
  }, []);

  const fetchToDos = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        return res.json();
      })
      .then((data: IToDo[]) => {
        return data
          .slice(0, 10)
          .reverse()
          .map(function (toDo) {
            delete toDo.userId;
            return toDo;
          });
      });
  };

  const updateToDo = (toDo: IToDo) => {
    const tmp = toDos;
    const i = tmp.findIndex((t) => t.id === toDo.id);

    if (i !== -1) {
      tmp[i] = toDo;
    }
    setToDos(tmp);
  };

  const addToDo = (title: string, completed: boolean) => {
    const tmp = toDos;
    const toDo: IToDo = {
      id: Math.max(...toDos.map((tD) => tD.id)) + 1,
      title: title,
      completed: completed,
    };

    tmp.unshift(toDo);
    setToDos(tmp);
  };

  return <ToDoContext.Provider value={{ toDos, updateToDo, addToDo }}>{children}</ToDoContext.Provider>;
}

export default function useToDo() {
  return useContext(ToDoContext) as ITodoProvider;
}
