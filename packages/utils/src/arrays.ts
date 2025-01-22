export const arraySortRandom = <T>(inputArray: T[]): T[] => {
  if (Array.isArray(inputArray)) {
    try {
      return [...inputArray].sort(() => Math.random() - 0.5);
    } catch (err) {
      return inputArray;
    }
  } else {
    return inputArray;
  }
};

export const groupingArrayOfObjectByKey = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  const grouped: Record<string, T[]> = {};

  for (const item of array) {
    const firstLetter = String(item[key]).charAt(0).toLowerCase();

    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }

    grouped[firstLetter].push(item);
  }

  return grouped;
};

export const groupingArrayOfMetas = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  const grouped: Record<string, T[]> = {};
  const numberRegex = /^\d+$/;

  for (const item of array) {
    const firstLetter = String(item[key]).charAt(0).toLowerCase();
    const groupName = numberRegex.test(firstLetter) ? '0' : firstLetter;

    if (!grouped[groupName]) {
      grouped[groupName] = [];
    }

    grouped[groupName].push(item);
  }

  return grouped;
};

export const reduceArrayOfDataToIds = (dataArr: { _id: any }[]): any[] => {
  return Array.isArray(dataArr) ? dataArr.map(data => data._id) : [];
};

export const reduceWidgetsToGroups = <T>(widgets: T[]): Record<string, T[]> => {
  return widgets.reduce((widgetInPositions, widget) => {
    const position = (widget as any).data.position;
    widgetInPositions[position] = [
      ...(widgetInPositions[position] || []),
      widget,
    ];
    return widgetInPositions;
  }, {} as Record<string, T[]>);
};

export const sortArrayByPropertyOfObject = <T>(array: T[], key: keyof T, order: 'asc' | 'desc'): T[] => {
  const instanceArray = [...array];

  return instanceArray.sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const uniqArrayBy = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
};
