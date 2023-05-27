const filterArrayShort = (arr) => {
  if (arr !== null && arr.length > 0) {
    return arr.filter((item) => {
      return item.duration <= 40;
    });
  }
};

export { filterArrayShort };