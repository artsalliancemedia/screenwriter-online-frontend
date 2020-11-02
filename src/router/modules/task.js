const Task = () => import('@/views/task');

const meta = { auth: true, title: 'task' };
export default [
  {
    path: 'task',
    name: 'task',
    meta,
    component: Task,
  },
];
