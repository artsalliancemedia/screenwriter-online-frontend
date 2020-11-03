const Monitoring = () => import('@/views/monitoring');
const Screen = () => import('@/views/monitoring/screen');

const meta = { auth: true, title: 'task' };
export default [
  {
    path: 'schedule',
    name: 'schedule',
    meta,
    component: Monitoring,
    children: [
      {
        path: 'index',
        name: 'schedule',
        component: Screen,
      },
      {
        path: 'show',
        name: 'show',
        component: Screen,
      },
    ],
  },
];
