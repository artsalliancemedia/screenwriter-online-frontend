export default function formatUserName(name) {
  if (!name) {
    return null;
  }
  let userName = '';
  const text = name.split('@', 2)[0];
  const names = text.split('.', 2);
  if (names.length === 1) {
    userName = (names[0].split('')[0] + names[0].split('')[1]).toUpperCase();
  } else {
    userName = (names[0].split('')[0] + names[1].split('')[0]).toUpperCase();
  }
  return userName;
}
