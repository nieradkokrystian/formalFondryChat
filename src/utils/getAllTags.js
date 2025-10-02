export function getAllTags(data) {
  const result = data.reduce(
    (acc, item) => {
      if (item.cmCmdWS?.tag) acc.cmCmdWS.push(item.cmCmdWS.tag);
      if (item.cmMsgWS?.tag) acc.cmMsgWS.push(item.cmMsgWS.tag);
      return acc;
    },
    { cmCmdWS: [], cmMsgWS: [] }
  );

  return {
    cmCmdWS: [...new Set(result.cmCmdWS)],
    cmMsgWS: [...new Set(result.cmMsgWS)],
  };
}
