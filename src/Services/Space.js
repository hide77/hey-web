export const hasAccessToSpace = space => {
  return space.is_member || space.is_admin || space.is_owner;
};
export const isSpaceFree = space => {
  return (
    !space.levels || space.levels.length === 0 || space.levels[0].amount === 0
  );
};
