export const createAvatar = (name: string) => {
  if (name.split(" ").length === 1) {
    const avatar = name[0].toUpperCase();
    return avatar;
  } else {
    const newName = name.split(" ");
    const avatar = `${newName[0][0].toUpperCase()}${name[1][0].toUpperCase()}`;
    return avatar;
  }
};
