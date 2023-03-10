import { useEffect, useState } from 'react';
import { tw } from 'twind';
import { map } from 'lodash-es';
import Link from 'next/link';
import loadable from '@loadable/component';
import todosService from '../../services/todos';

const LayoutLoadable = loadable(() => import('../../components/Layout'));

const HomePage = () => {
  const [todosArr, setTodosArr] = useState<Array<DataTodos>>([]);

  useEffect(() => {
    // this useeffect will running as async wrapped with async
    (async function () {
      const res = await todosService.getAllTodos();
      setTodosArr(res);
    })();
  }, []);

  const arr = ['b', 1, 2, 3, 'x'];
  console.log(map('map Arr', arr));
  console.log('client side fetching', todosArr);

  return (
    <LayoutLoadable title="Home | Next.js + TypeScript Example">
      <h1 className={tw('text-2xl text-green-500')}>Hello Next.js 👋</h1>
      {todosArr
        ? todosArr.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          ))
        : null}
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </LayoutLoadable>
  );
};

export default HomePage;
