const Monitoring = () => import('@/views/monitoring');
const Screen = () => import('@/views/monitoring/screen');

const meta = { auth: true, title: 'task' };
export default [
  {
    path: 'monitoring',
    name: 'monitoring',
    meta,
    component: Monitoring,
    children: [
      {
        path: 'screen',
        name: 'monitoring_screen',
        component: Screen,
      },
      {
        path: 'power',
        name: 'monitoring_power',
        component: Screen,
      },
      {
        path: 'device',
        name: 'monitoring_device',
        component: Screen,
      },
    ],
  },
];
