const DATA = {
  name: 'ROOT',
  children: [
    {
      name: 'A',
      size: 10
    },
    {
      name: 'B',
      children: [
        {
          name: '1',
          size: 4
        },
        {
          name: '2',
          children: [
            {
              name: 'V',
              size: 2
            },
            {
              name: 'W',
              size: 3
            },
            {
              name: 'X',
              size: 4
            },
            {
              name: 'Y',
              size: 6
            },
            {
              name: 'Z',
              size: 8
            },
          ]
        },
        {
          name: '3',
          size: 6
        },
      ]
    },
    {
      name: 'C',
      size: 20
    },
    {
      name: 'D',
      size: 25
    },
    {
      name: 'E',
      size: 40
    },
    {
      name: 'F',
      size: 10
    },
  ]
};
export default DATA;
